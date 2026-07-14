// ─── Panel Resize Handles + Template Integration ───
(function(){
    var container = document.querySelector('.app-container');
    if(!container) return;

    // Panel resize
    var leftHandle = document.getElementById('resize-handle-left');
    var rightHandle = document.getElementById('resize-handle-right');
    var leftWidth = parseInt(localStorage.getItem('panelLeftWidth')) || 320;
    var rightWidth = parseInt(localStorage.getItem('panelRightWidth')) || 340;
    var minWidth = 180, maxWidth = 700;

    function updateColumns() {
        container.style.setProperty('--panel-left-width', leftWidth + 'px');
        container.style.setProperty('--panel-right-width', rightWidth + 'px');
    }

    function saveWidths() {
        localStorage.setItem('panelLeftWidth', leftWidth);
        localStorage.setItem('panelRightWidth', rightWidth);
    }

    function makeResizable(handle, side, getWidth, setWidth, getMin, getMax) {
        var startX, startWidth;
        handle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            startX = e.clientX;
            startWidth = getWidth();
            handle.classList.add('active');
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            function onMove(ev) {
                var dx = ev.clientX - startX;
                if(side === 'right') dx = -dx;
                var newW = Math.max(getMin(), Math.min(getMax(), startWidth + dx));
                setWidth(newW); updateColumns();
            }
            function onUp() {
                handle.classList.remove('active');
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                saveWidths();
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
            }
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });
    }

    if(leftHandle){
        makeResizable(leftHandle, 'left',
            function(){ return leftWidth; }, function(v){ leftWidth = v; },
            function(){ return minWidth; }, function(){ return maxWidth; });
    }
    if(rightHandle){
        makeResizable(rightHandle, 'right',
            function(){ return rightWidth; }, function(v){ rightWidth = v; },
            function(){ return minWidth; }, function(){ return maxWidth; });
    }
    updateColumns();

    // ─── Populate template dropdown in project modal ───
    var templateSelect = document.getElementById('project-template-select');
    function populateTemplateDropdown() {
        if(!templateSelect || typeof visualTemplates === 'undefined') return;
        // Only populate if empty (avoid duplicating)
        if(templateSelect.options.length > 1) return;
        templateSelect.innerHTML = '<option value="">None (start blank)</option>';
        visualTemplates.forEach(function(t) {
            if(t.isNone) return;
            var opt = document.createElement('option');
            opt.value = t.id;
            opt.textContent = t.name;
            templateSelect.appendChild(opt);
        });
    }

    // Populate on DOM ready
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){
            setTimeout(populateTemplateDropdown, 300);
        });
    } else {
        setTimeout(populateTemplateDropdown, 300);
    }

    // Refresh when project modal opens
    var projectModal = document.getElementById('project-modal');
    if(projectModal) {
        var mo = new MutationObserver(function() {
            if(projectModal.classList.contains('visible')) {
                populateTemplateDropdown();
            }
        });
        mo.observe(projectModal, { attributes: true, attributeFilter: ['class'] });
    }

    // Expose selected template ID for project creation
    window.getProjectTemplateId = function() {
        return templateSelect ? templateSelect.value : '';
    };

    // ─── loadBackgroundImage polyfill ───
    // Ensures image-type template backgrounds are loaded into the rendering pipeline
    window._templateBgLoaded = {};
    window.loadBackgroundImage = function(url) {
        if (!url || window._templateBgLoaded[url]) return;
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            window._templateBgLoaded[url] = img;
            // Trigger canvas redraw if updateCanvas exists
            if (typeof updateCanvas === 'function') updateCanvas();
        };
        img.onerror = function() {
            console.warn('Template bg image failed to load: ' + url);
        };
        img.src = url;
    };
})();
