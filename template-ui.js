// Template UI: renders grid, handles selection, draws overlays

var currentTemplateId = null;

function applyTemplateToAll(templateId) {
    var t = getTemplateById(templateId);
    if (!t) return;
    var s = t.settings;
    state.defaults.background = JSON.parse(JSON.stringify(s.background));

    // For image-type templates, set the image URL and trigger loading
    if (s.background.type === 'image' && s.background.image) {
        state.defaults.background.image = s.background.image;
        state.defaults.background._pendingImageUrl = s.background.image;
        // Call app.js background image loader if available
        if (typeof loadBackgroundImage === 'function') {
            loadBackgroundImage(s.background.image);
        }
    }

    // For overlay-based templates, use canvas-generated overlay
    if (s.background._overlayId && typeof getTemplateBgUrl === 'function') {
        state.defaults.background._overlayUrl = getTemplateBgUrl(s.background._overlayId);
    }

    // Apply text defaults
    if (s.text) {
        var preserved = ['headlines','subheadlines','headlineEnabled','subheadlineEnabled',
            'headlineLanguages','subheadlineLanguages','currentHeadlineLang','currentSubheadlineLang',
            'perLanguageLayout','languageSettings','currentLayoutLang'];
        var keep = {};
        preserved.forEach(function(k) { if (state.defaults.text[k] !== undefined) keep[k] = state.defaults.text[k]; });
        ['headlineFont','headlineSize','headlineWeight','headlineColor','headlineItalic','headlineUnderline',
         'headlineStrikethrough','subheadlineFont','subheadlineSize','subheadlineWeight','subheadlineColor',
         'subheadlineOpacity','position','offsetY','lineHeight'].forEach(function(k) {
            if (s.text[k] !== undefined) state.defaults.text[k] = s.text[k];
        });
        preserved.forEach(function(k) { if (keep[k] !== undefined) state.defaults.text[k] = keep[k]; });
    }

    // Apply screenshot defaults
    if (s.screenshot) {
        state.defaults.screenshot = JSON.parse(JSON.stringify(s.screenshot));
    }

    // Apply template to all existing screenshots
    state.screenshots.forEach(function(ss) {
        applyTemplateToScreenshot(ss, templateId);
    });

    currentTemplateId = templateId;
    if (typeof updateCanvas === 'function') updateCanvas();
    if (typeof syncUIWithState === 'function') syncUIWithState();
}

// ─── Template Grid UI ───
function renderTemplateGrid() {
    var container = document.getElementById('template-grid');
    if (!container) return;
    container.innerHTML = '';

    // Add "None" option first
    var noneCard = createTemplateCard(visualTemplates[0]);
    container.appendChild(noneCard);

    // Add all non-none templates
    visualTemplates.forEach(function(t, i) {
        if (i === 0) return; // skip none
        var card = createTemplateCard(t);
        container.appendChild(card);
    });
}

function createTemplateCard(template) {
    var card = document.createElement('div');
    card.className = 'template-card';
    if (template.isNone) card.className += ' template-card-none';
    if (currentTemplateId === template.id || (!currentTemplateId && template.isNone)) {
        card.classList.add('selected');
    }

    // Preview canvas
    var preview = document.createElement('div');
    preview.className = 'template-card-preview';
    var previewCanvas = createTemplatePreviewCanvas(template, 260, 120);
    preview.appendChild(previewCanvas);
    card.appendChild(preview);

    // For image-based templates, try loading the real image as preview
    if (template.settings.background.type === 'image') {
        var previewImg = new Image();
        previewImg.crossOrigin = 'anonymous';
        // Resolve source: explicit URL, else fall back to generated background
        var imgSrc = template.settings.background.image || (typeof getTemplateBgUrl === 'function' ? getTemplateBgUrl(template.id) : null);
        previewImg.onload = function() {
            var ctx = previewCanvas.getContext('2d');
            ctx.drawImage(previewImg, 0, 0, previewCanvas.width, previewCanvas.height);
            // Re-draw the phone frame overlay
            ctx.fillStyle = template.previewAccent || '#fff';
            ctx.globalAlpha = 0.15;
            var pw = previewCanvas.width * 0.28, ph = previewCanvas.height * 0.55;
            var px = (previewCanvas.width - pw) / 2, py = (previewCanvas.height - ph) / 2;
            var r = pw * 0.15;
            ctx.beginPath();
            ctx.moveTo(px+r, py); ctx.lineTo(px+pw-r, py); ctx.arcTo(px+pw, py, px+pw, py+r, r);
            ctx.lineTo(px+pw, py+ph-r); ctx.arcTo(px+pw, py+ph, px+pw-r, py+ph, r);
            ctx.lineTo(px+r, py+ph); ctx.arcTo(px, py+ph, px, py+ph-r, r);
            ctx.lineTo(px, py+r); ctx.arcTo(px, py, px+r, py, r);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1;
        };
        // If remote image fails, fall back to generated background (never 404s)
        previewImg.onerror = function() {
            if (typeof getTemplateBgUrl === 'function') {
                var fb = new Image();
                fb.onload = previewImg.onload;
                fb.src = getTemplateBgUrl(template.id);
            }
        };
        if (imgSrc) previewImg.src = imgSrc;
    }

    // Selected indicator
    var indicator = document.createElement('div');
    indicator.className = 'template-card-selected-indicator';
    indicator.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
    card.appendChild(indicator);

    // Info section
    var info = document.createElement('div');
    info.className = 'template-card-info';

    var name = document.createElement('div');
    name.className = 'template-card-name';
    name.textContent = template.name;
    info.appendChild(name);

    var desc = document.createElement('div');
    desc.className = 'template-card-desc';
    desc.textContent = template.description;
    info.appendChild(desc);

    // Tags
    var tagsDiv = document.createElement('div');
    tagsDiv.className = 'template-card-tags';
    template.tags.forEach(function(tag) {
        var tagEl = document.createElement('span');
        tagEl.className = 'template-card-tag';
        tagEl.textContent = tag;
        tagsDiv.appendChild(tagEl);
    });
    info.appendChild(tagsDiv);

    card.appendChild(info);

    // Click handler — apply to currently selected screenshot only
    card.addEventListener('click', function() {
        if (state.screenshots.length > 0 && typeof applyTemplateToScreenshot === 'function') {
            var ss = state.screenshots[state.selectedIndex];
            if (ss) applyTemplateToScreenshot(ss, template.id);
            currentTemplateId = template.id;
        }
        if (typeof updateCanvas === 'function') updateCanvas();
        if (typeof syncUIWithState === 'function') syncUIWithState();
        document.querySelectorAll('.template-card').forEach(function(c) { c.classList.remove('selected'); });
        card.classList.add('selected');
    });

    return card;
}

// ─── Overlay Rendering Hook ───
var _templateOverlays = {};

function _loadOverlayImage(url, cb) {
    if (_templateOverlays[url]) { cb(_templateOverlays[url]); return; }
    var img = new Image();
    img.onload = function() { _templateOverlays[url] = img; cb(img); };
    img.onerror = function() { cb(null); };
    img.src = url;
}

function initTemplateSystem() {
    // Render the template grid
    renderTemplateGrid();

    // Preload all template overlay images
    visualTemplates.forEach(function(t) {
        if (t.settings && t.settings.background && t.settings.background._overlayId
            && typeof getTemplateBgUrl === 'function') {
            _loadOverlayImage(getTemplateBgUrl(t.settings.background._overlayId), function() {});
        }
    });

    // Preload photo backgrounds for image templates via the app's loader
    if (typeof loadBackgroundImage === 'function') {
        visualTemplates.forEach(function(t) {
            if (t.settings && t.settings.background && t.settings.background.type === 'image'
                && t.settings.background.image) {
                loadBackgroundImage(t.settings.background.image);
            }
        });
    }

    // Wrap drawBackgroundToContext to render overlays
    if (typeof drawBackgroundToContext === 'function') {
        var orig = drawBackgroundToContext;
        drawBackgroundToContext = function(ctx, dims, bg) {
            orig(ctx, dims, bg);

            // Draw overlay on top of gradient backgrounds
            if (bg._overlayUrl) {
                var key = bg._overlayUrl;
                if (_templateOverlays[key]) {
                    ctx.globalAlpha = 0.55;
                    ctx.drawImage(_templateOverlays[key], 0, 0, dims.width, dims.height);
                    ctx.globalAlpha = 1;
                } else {
                    _loadOverlayImage(key, function(img) {
                        if (img && typeof updateCanvas === 'function') updateCanvas();
                    });
                }
            }
        };
    }
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTemplateSystem);
} else {
    initTemplateSystem();
}
