// Template Background Images
// High-quality real photography preloaded for all template backgrounds.
// Uses Unsplash images (free for commercial use).

const TEMPLATE_IMAGE_URLS = {
    glassmorphism: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1290&h=2796&fit=crop&q=80',
    minimalist:     'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1290&h=2796&fit=crop&q=80',
    dark_futuristic:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1290&h=2796&fit=crop&q=80',
    '3d_playful':   'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1290&h=2796&fit=crop&q=80',
    dark_luxury:    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1290&h=2796&fit=crop&q=80',
    ethereal_bokeh: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1290&h=2796&fit=crop&q=80',
    aurora_gradient:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1290&h=2796&fit=crop&q=80',
    neumorphism:    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1290&h=2796&fit=crop&q=80',
    clay_3d:        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1290&h=2796&fit=crop&q=80',
    duotone:        'https://images.unsplash.com/photo-1541701494587-c4f0ac16e0aa?w=1290&h=2796&fit=crop&q=80',
    immersive_scene:'https://images.unsplash.com/photo-1493246507139-91e8fad2d2dc?w=1290&h=2796&fit=crop&q=80'
};

// Cache of loaded Image objects
const _templateBgImages = {};

function loadTemplateBgImage(templateId) {
    return new Promise(function(resolve) {
        if (_templateBgImages[templateId]) {
            resolve(_templateBgImages[templateId]);
            return;
        }
        var url = TEMPLATE_IMAGE_URLS[templateId];
        if (!url) { resolve(null); return; }
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            _templateBgImages[templateId] = img;
            resolve(img);
        };
        img.onerror = function() {
            console.warn('Failed to load template image: ' + templateId);
            resolve(null);
        };
        img.src = url;
    });
}

function getTemplateBgImage(templateId) {
    return _templateBgImages[templateId] || null;
}

function getTemplateImageUrl(templateId) {
    return TEMPLATE_IMAGE_URLS[templateId] || null;
}

// Preload all template images on startup
function preloadAllTemplateImages() {
    Object.keys(TEMPLATE_IMAGE_URLS).forEach(function(id) {
        loadTemplateBgImage(id);
    });
}
