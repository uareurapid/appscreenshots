// IndexedDB Initialization Fix
// Ensures the database is created on first run (fresh server start)
// Wraps the existing DB initialization to handle missing DB gracefully

(function() {
    'use strict';

    // Wait for app.js to define these, then patch
    var patchInterval = setInterval(function() {
        // Check if app.js DB vars are available
        if (typeof db === 'undefined' && typeof window.DB_NAME === 'undefined') {
            // app.js might not have loaded yet
            return;
        }

        clearInterval(patchInterval);
        patchDatabaseInit();
    }, 100);

    // Fallback: if app.js vars never appear, set up our own DB
    setTimeout(function() {
        if (!window._dbPatched) {
            clearInterval(patchInterval);
            createStandaloneDatabase();
        }
    }, 2000);
})();

function patchDatabaseInit() {
    if (window._dbPatched) return;
    window._dbPatched = true;

    // Ensure the global db variable is accessible
    // If the existing open request failed silently, retry
    if (typeof db !== 'undefined' && db === null) {
        console.log('[DB] Database not open, attempting to reconnect...');
        retryDatabaseOpen();
    }

    // Override any existing loadState to handle missing project
    var origLoadState = window.loadState;
    if (typeof origLoadState === 'function') {
        window.loadState = async function() {
            try {
                await origLoadState();
                // Check if we have at least one project
                if (typeof projects !== 'undefined' && (!projects || projects.length === 0)) {
                    console.log('[DB] No projects found, creating default...');
                    createDefaultProject();
                }
            } catch (e) {
                console.warn('[DB] loadState failed, creating fresh state:', e.message);
                createDefaultProject();
            }
        };
    }

    // Override any switchProject to handle missing DB
    var origSwitchProject = window.switchProject;
    if (typeof origSwitchProject === 'function') {
        window.switchProject = async function(projectId) {
            if (!db) {
                console.log('[DB] DB not ready, reconnecting...');
                await ensureDatabase();
            }
            return origSwitchProject(projectId);
        };
    }
}

function retryDatabaseOpen() {
    var DB_NAME = window.DB_NAME || 'AppStoreScreenshots';
    var DB_VERSION = window.DB_VERSION || 1;

    var request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function(event) {
        var database = event.target.result;
        console.log('[DB] Creating/upgrading database stores (v' + DB_VERSION + ')...');
        // Schema MUST match app.js exactly: `projects` (keyPath 'id') and
        // `meta` (keyPath 'key'). Creating other stores here breaks app.js.
        if (!database.objectStoreNames.contains('projects')) {
            database.createObjectStore('projects', { keyPath: 'id' });
            console.log('[DB] Created store: projects');
        }
        if (!database.objectStoreNames.contains('meta')) {
            database.createObjectStore('meta', { keyPath: 'key' });
            console.log('[DB] Created store: meta');
        }
    };

    request.onsuccess = function(event) {
        window.db = event.target.result;
        console.log('[DB] Database opened successfully v' + DB_VERSION);

        window.db.onerror = function(e) {
            console.error('[DB] Database error:', e.target.error);
        };

        // Check for default project
        checkAndCreateDefaultProject();
    };

    request.onerror = function(event) {
        console.error('[DB] Failed to open database:', event.target.error);
    };

    request.onblocked = function() {
        console.warn('[DB] Database open blocked — close other tabs and reload');
    };
}

async function ensureDatabase() {
    return new Promise(function(resolve) {
        if (typeof db !== 'undefined' && db) {
            resolve(db);
            return;
        }

        var DB_NAME = window.DB_NAME || 'AppStoreScreenshots';
        var DB_VERSION = window.DB_VERSION || 1;

        var request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function(event) {
            var database = event.target.result;
            // Match app.js schema: projects (id) + meta (key)
            if (!database.objectStoreNames.contains('projects')) {
                database.createObjectStore('projects', { keyPath: 'id' });
            }
            if (!database.objectStoreNames.contains('meta')) {
                database.createObjectStore('meta', { keyPath: 'key' });
            }
        };

        request.onsuccess = function(event) {
            window.db = event.target.result;
            resolve(window.db);
        };

        request.onerror = function(event) {
            console.error('[DB] ensureDatabase failed:', event.target.error);
            resolve(null);
        };
    });
}

function checkAndCreateDefaultProject() {
    if (!db) return;

    try {
        var tx = db.transaction(['projects'], 'readonly');
        var store = tx.objectStore('projects');
        var countRequest = store.count();

        countRequest.onsuccess = function() {
            if (countRequest.result === 0) {
                console.log('[DB] Empty database — creating default project...');
                createDefaultProject();
            }
        };

        countRequest.onerror = function() {
            console.warn('[DB] Could not count projects, creating default...');
            createDefaultProject();
        };
    } catch (e) {
        console.warn('[DB] Transaction error:', e.message);
        createDefaultProject();
    }
}

function createDefaultProject() {
    // Create in-memory default project
    if (typeof projects === 'undefined') {
        window.projects = [];
    }

    if (window.projects && window.projects.length === 0) {
        var defaultProject = {
            id: 'project_' + Date.now(),
            name: 'My App Screenshots',
            screenshotCount: 0,
            created: new Date().toISOString()
        };
        window.projects.push(defaultProject);

        // Set as current project
        if (typeof currentProjectId === 'undefined' || !currentProjectId) {
            window.currentProjectId = defaultProject.id;
        }

        // Save to IndexedDB if available
        if (db) {
            try {
                var tx = db.transaction(['projects'], 'readwrite');
                var store = tx.objectStore('projects');
                store.put(defaultProject);
                tx.oncomplete = function() {
                    console.log('[DB] Default project saved');
                };
                tx.onerror = function(e) {
                    console.warn('[DB] Failed to save default project:', e.target.error);
                };
            } catch (e) {
                console.warn('[DB] Could not write default project:', e.message);
            }
        }

        // Save to localStorage as fallback
        saveProjectsToLocalStorage();
    }

    // Reset state to defaults
    if (typeof resetStateToDefaults === 'function') {
        resetStateToDefaults();
    }

    // Update UI
    if (typeof updateCanvas === 'function') {
        setTimeout(function() { updateCanvas(); }, 100);
    }
    if (typeof updateScreenshotList === 'function') {
        setTimeout(function() { updateScreenshotList(); }, 100);
    }
    if (typeof updateProjectSelector === 'function') {
        setTimeout(function() { updateProjectSelector(); }, 100);
    }
}

function saveProjectsToLocalStorage() {
    try {
        if (window.projects) {
            localStorage.setItem('appstore_screenshots_projects', JSON.stringify(window.projects));
        }
        if (typeof currentProjectId !== 'undefined' && currentProjectId) {
            localStorage.setItem('appstore_screenshots_current_project', currentProjectId);
        }
    } catch (e) {
        console.warn('[DB] localStorage fallback failed:', e.message);
    }
}

function loadProjectsFromLocalStorage() {
    try {
        var saved = localStorage.getItem('appstore_screenshots_projects');
        if (saved) {
            window.projects = JSON.parse(saved);
        }
        var current = localStorage.getItem('appstore_screenshots_current_project');
        if (current) {
            window.currentProjectId = current;
        }
    } catch (e) {
        console.warn('[DB] localStorage load failed:', e.message);
    }
}

// Standalone DB creation (runs if app.js never initializes)
function createStandaloneDatabase() {
    console.log('[DB] Creating standalone database (app.js DB not found)...');

    // Load from localStorage first
    loadProjectsFromLocalStorage();

    var DB_NAME = 'AppStoreScreenshots';
    var DB_VERSION = 1;

    var request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function(event) {
        var database = event.target.result;
        // Match app.js schema: projects (id) + meta (key)
        if (!database.objectStoreNames.contains('projects')) {
            database.createObjectStore('projects', { keyPath: 'id' });
        }
        if (!database.objectStoreNames.contains('meta')) {
            database.createObjectStore('meta', { keyPath: 'key' });
        }
    };

    request.onsuccess = function(event) {
        window.db = event.target.result;
        console.log('[DB] Standalone database ready');

        // Ensure we have at least one project
        if (!window.projects || window.projects.length === 0) {
            createDefaultProject();
        }

        // Set currentProjectId if not set
        if (!window.currentProjectId && window.projects && window.projects.length > 0) {
            window.currentProjectId = window.projects[0].id;
        }

        // Trigger UI update if functions exist
        if (typeof updateProjectSelector === 'function') {
            setTimeout(function() { updateProjectSelector(); }, 200);
        }
        if (typeof initTemplateSystem === 'function') {
            setTimeout(function() { initTemplateSystem(); }, 300);
        }
    };

    request.onerror = function(event) {
        console.error('[DB] Standalone database creation failed:', event.target.error);
        // Fall back to in-memory only
        if (!window.projects || window.projects.length === 0) {
            createDefaultProject();
        }
    };
}

// Export for manual initialization
window.ensureDatabase = ensureDatabase;
window.createDefaultProject = createDefaultProject;
window.retryDatabaseOpen = retryDatabaseOpen;
