// Template Background Images
// All backgrounds are generated locally via template-bg-generator.js.
// Zero remote URLs — nothing can ever 404.

// Cache of loaded Image objects (generated from canvas data URLs)
const _templateBgImages = {};

function loadTemplateBgImage(templateId) {
    return new Promise(function(resolve) {
        if (_templateBgImages[templateId]) {
            resolve(_templateBgImages[templateId]);
            return;
        }
        if (typeof getTemplateBgUrl !== 'function') {
            resolve(null);
            return;
        }
        var url = getTemplateBgUrl(templateId);
        var img = new Image();
        img.onload = function() {
            _templateBgImages[templateId] = img;
            resolve(img);
        };
        img.onerror = function() {
            console.warn('Failed to generate template image: ' + templateId);
            resolve(null);
        };
        img.src = url;
    });
}

function getTemplateBgImage(templateId) {
    return _templateBgImages[templateId] || null;
}

function getTemplateImageUrl(templateId) {
    if (typeof getTemplateBgUrl === 'function') return getTemplateBgUrl(templateId);
    return null;
}

// Preload all template images on startup (all generated locally, instant)
function preloadAllTemplateImages() {
    var ids = [
        'glassmorphism', 'minimalist', 'dark_futuristic', '3d_playful',
        'dark_luxury', 'ethereal_bokeh', 'aurora_gradient', 'neumorphism',
        'clay_3d', 'duotone', 'immersive_scene'
    ];
    ids.forEach(function(id) {
        loadTemplateBgImage(id);
    });
}
