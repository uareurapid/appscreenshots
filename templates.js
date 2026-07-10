// Visual Style Templates — based on App Store & Play Store Design Trends 2025
// Image-based templates use real photography from Unsplash (free commercial use)

const visualTemplates = [
    // ─── 0. None ───
    {
        id: 'none', name: 'No Template', category: 'reset', tags: [],
        description: 'Clear all template styling', isNone: true,
        previewGradient: 'linear-gradient(135deg, #1c1d21 0%, #5eecc0 50%, #3da88a 100%)',
        previewAccent: '#5eecc0',
        settings: {
            background: { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#5eecc0', position: 0 }, { color: '#3da88a', position: 100 }] }, solid: '#1c1d21', image: null, imageFit: 'cover', imageBlur: 0, overlayColor: '#000000', overlayOpacity: 0, noise: false, noiseIntensity: 10 },
            text: { headlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", headlineSize: 100, headlineWeight: '600', headlineColor: '#ffffff', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", subheadlineSize: 50, subheadlineWeight: '400', subheadlineColor: '#ffffff', subheadlineOpacity: 70, position: 'top', offsetY: 12, lineHeight: 110 },
            screenshot: { shadow: { enabled: true, color: '#000000', blur: 40, opacity: 30, x: 0, y: 20 } }
        }
    },
    // ─── 1. Glassmorphism ───
    { id: 'glassmorphism', name: 'Prismatic Glassmorphism', category: 'premium', tags: ['fintech','productivity','health','premium'], description: 'Frosted glass panels with prismatic light', previewGradient: 'linear-gradient(135deg, #1a0533 0%, #3b1f6e 40%, #0abdc6 100%)', previewAccent: '#0abdc6',
        settings: { background: { type: 'image', _overlayId: 'glassmorphism', imageFit: 'cover', imageBlur: 0, overlayColor: '#0d0221', overlayOpacity: 8, noise: true, noiseIntensity: 5 }, text: { headlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", headlineSize: 90, headlineWeight: '700', headlineColor: '#ffffff', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", subheadlineSize: 44, subheadlineWeight: '400', subheadlineColor: '#c4b5fd', subheadlineOpacity: 85, position: 'top', offsetY: 10, lineHeight: 110 }, screenshot: { shadow: { enabled: true, color: '#4c1d95', blur: 60, opacity: 50, x: 0, y: 30 } } } },
    // ─── 2. Minimalist ───
    { id: 'minimalist', name: 'Satin Minimalist', category: 'minimal', tags: ['tools','utilities','developer','apple-style'], description: 'Warm off-white with geometric accent', previewGradient: 'linear-gradient(135deg, #f0ebe3 0%, #e8e5df 50%, #dcd8d0 100%)', previewAccent: '#1d1d1f',
        settings: { background: { type: 'image', _overlayId: 'minimalist', imageFit: 'cover', imageBlur: 0, overlayColor: '#f5f0eb', overlayOpacity: 5, noise: true, noiseIntensity: 3 }, text: { headlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", headlineSize: 80, headlineWeight: '700', headlineColor: '#1d1d1f', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", subheadlineSize: 40, subheadlineWeight: '400', subheadlineColor: '#6e6e73', subheadlineOpacity: 80, position: 'bottom', offsetY: 10, lineHeight: 120 }, screenshot: { shadow: { enabled: true, color: '#000000', blur: 20, opacity: 15, x: 0, y: 8 } } } },
    // ─── 3. Cyber-Gloss ───
    { id: 'dark_futuristic', name: 'Cyber-Gloss', category: 'dark', tags: ['gaming','crypto','tech','cyberpunk'], description: 'Neon cyan on black with glowing tech grid', previewGradient: 'linear-gradient(180deg, #050505 0%, #0a0a0f 40%, #001a2c 100%)', previewAccent: '#00e5ff',
        settings: { background: { type: 'image', _overlayId: 'dark_futuristic', imageFit: 'cover', imageBlur: 0, overlayColor: '#020202', overlayOpacity: 5, noise: true, noiseIntensity: 7 }, text: { headlineFont: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif", headlineSize: 85, headlineWeight: '800', headlineColor: '#00e5ff', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif", subheadlineSize: 42, subheadlineWeight: '400', subheadlineColor: '#82b1ff', subheadlineOpacity: 80, position: 'top', offsetY: 8, lineHeight: 110 }, screenshot: { shadow: { enabled: true, color: '#00e5ff', blur: 40, opacity: 35, x: 0, y: 0 }, frame: { enabled: true, color: '#1a1a2e', width: 8, opacity: 100 } } } },
    // ─── 4. 3D Playful ───
    { id: '3d_playful', name: 'Vinyl Toy 3D', category: 'playful', tags: ['kids','casual','social','games'], description: 'Colorful floating bubbles, fun and tactile', previewGradient: 'linear-gradient(135deg, #e0f0ff 0%, #c9e4ff 30%, #f0e6ff 70%, #ffe0f0 100%)', previewAccent: '#7c3aed',
        settings: { background: { type: 'image', _overlayId: '3d_playful', imageFit: 'cover', imageBlur: 0, overlayColor: '#e8f4fd', overlayOpacity: 3, noise: false, noiseIntensity: 0 }, text: { headlineFont: "'SF Pro Rounded', 'Nunito', -apple-system, sans-serif", headlineSize: 75, headlineWeight: '700', headlineColor: '#4c1d95', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "'SF Pro Rounded', 'Nunito', -apple-system, sans-serif", subheadlineSize: 38, subheadlineWeight: '500', subheadlineColor: '#7c3aed', subheadlineOpacity: 85, position: 'bottom', offsetY: 8, lineHeight: 115 }, screenshot: { shadow: { enabled: true, color: '#c4b5fd', blur: 50, opacity: 40, x: 0, y: 25 }, cornerRadius: 30 } } },
    // ─── 5. Dark Luxury ───
    { id: 'dark_luxury', name: 'Black Tie Luxury', category: 'dark', tags: ['luxury','fashion','fintech','exclusive'], description: 'Piano black with gold geometric accents', previewGradient: 'linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)', previewAccent: '#c9a227',
        settings: { background: { type: 'image', _overlayId: 'dark_luxury', imageFit: 'cover', imageBlur: 0, overlayColor: '#000000', overlayOpacity: 15, noise: true, noiseIntensity: 3 }, text: { headlineFont: "'Playfair Display', 'Georgia', 'Times New Roman', serif", headlineSize: 75, headlineWeight: '700', headlineColor: '#f5e6c8', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", subheadlineSize: 36, subheadlineWeight: '300', subheadlineColor: '#c9a227', subheadlineOpacity: 90, position: 'bottom', offsetY: 8, lineHeight: 130 }, screenshot: { shadow: { enabled: true, color: '#000000', blur: 30, opacity: 70, x: 0, y: 15 }, frame: { enabled: true, color: '#1a1a1a', width: 10, opacity: 100 } } } },
    // ─── 6. Ethereal Bokeh ───
    { id: 'ethereal_bokeh', name: 'Ethereal Dreamscape', category: 'premium', tags: ['meditation','sleep','art','creative','spiritual'], description: 'Floating light orbs and star sparkles', previewGradient: 'linear-gradient(150deg, #1a0533 0%, #312e81 30%, #831843 70%, #fdf2f8 100%)', previewAccent: '#f9a8d4',
        settings: { background: { type: 'image', _overlayId: 'ethereal_bokeh', imageFit: 'cover', imageBlur: 0, overlayColor: '#0f0720', overlayOpacity: 10, noise: true, noiseIntensity: 4 }, text: { headlineFont: "'Georgia', 'Palatino', 'Times New Roman', serif", headlineSize: 78, headlineWeight: '600', headlineColor: '#fdf2f8', headlineItalic: true, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", subheadlineSize: 38, subheadlineWeight: '300', subheadlineColor: '#f9a8d4', subheadlineOpacity: 75, position: 'top', offsetY: 8, lineHeight: 125 }, screenshot: { shadow: { enabled: true, color: '#f9a8d4', blur: 80, opacity: 35, x: 0, y: 20 } } } },
    // ─── 7. Aurora Mesh ───
    { id: 'aurora_gradient', name: 'Aurora Mesh', category: 'modern', tags: ['modern','universal','trendy','spotify-style'], description: 'Flowing wave bands like northern lights', previewGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #0e7490 50%, #15803d 75%, #a16207 100%)', previewAccent: '#67e8f9',
        settings: { background: { type: 'image', _overlayId: 'aurora_gradient', imageFit: 'cover', imageBlur: 0, overlayColor: '#1e1b4b', overlayOpacity: 12, noise: true, noiseIntensity: 3 }, text: { headlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", headlineSize: 85, headlineWeight: '700', headlineColor: '#ffffff', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", subheadlineSize: 40, subheadlineWeight: '400', subheadlineColor: '#a5f3fc', subheadlineOpacity: 80, position: 'bottom', offsetY: 10, lineHeight: 110 }, screenshot: { shadow: { enabled: true, color: '#312e81', blur: 55, opacity: 45, x: 0, y: 25 } } } },
    // ─── 8. Neumorphism ───
    { id: 'neumorphism', name: 'Soft UI Neumorphism', category: 'minimal', tags: ['productivity','utilities','dashboard','calm'], description: 'Embossed shapes with soft depth', previewGradient: 'linear-gradient(135deg, #e0e5ec 0%, #eceef3 50%, #d5dae3 100%)', previewAccent: '#6366f1',
        settings: { background: { type: 'image', _overlayId: 'neumorphism', imageFit: 'cover', imageBlur: 0, overlayColor: '#e3e7ed', overlayOpacity: 8, noise: false, noiseIntensity: 0 }, text: { headlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", headlineSize: 72, headlineWeight: '600', headlineColor: '#374151', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", subheadlineSize: 36, subheadlineWeight: '400', subheadlineColor: '#6b7280', subheadlineOpacity: 80, position: 'top', offsetY: 12, lineHeight: 115 }, screenshot: { shadow: { enabled: true, color: '#a1aab4', blur: 25, opacity: 40, x: 8, y: 12 }, frame: { enabled: true, color: '#e0e5ec', width: 16, opacity: 100 } } } },
    // ─── 9. Clay 3D ───
    { id: 'clay_3d', name: 'Matte Clay 3D', category: 'modern', tags: ['design','saas','portfolio','sophisticated'], description: 'Warm taupe with painterly texture', previewGradient: 'linear-gradient(145deg, #d4c5b9 0%, #c9b8a7 40%, #bfa890 100%)', previewAccent: '#78716c',
        settings: { background: { type: 'image', _overlayId: 'clay_3d', imageFit: 'cover', imageBlur: 0, overlayColor: '#cfbeb1', overlayOpacity: 10, noise: true, noiseIntensity: 4 }, text: { headlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", headlineSize: 76, headlineWeight: '600', headlineColor: '#44403c', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", subheadlineSize: 38, subheadlineWeight: '400', subheadlineColor: '#78716c', subheadlineOpacity: 80, position: 'bottom', offsetY: 10, lineHeight: 115 }, screenshot: { shadow: { enabled: true, color: '#a8a29e', blur: 50, opacity: 30, x: 0, y: 25 } } } },
    // ─── 10. Duotone ───
    { id: 'duotone', name: 'Split Tone Duotone', category: 'bold', tags: ['fashion','music','social','brand'], description: 'Bold gradient with geometric patterns', previewGradient: 'linear-gradient(180deg, #7c2d12 0%, #c2410c 45%, #ea580c 55%, #f59e0b 100%)', previewAccent: '#fbbf24',
        settings: { background: { type: 'image', _overlayId: 'duotone', imageFit: 'cover', imageBlur: 0, overlayColor: '#7c2d12', overlayOpacity: 12, noise: true, noiseIntensity: 5 }, text: { headlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", headlineSize: 95, headlineWeight: '800', headlineColor: '#ffffff', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", subheadlineSize: 42, subheadlineWeight: '500', subheadlineColor: '#fde68a', subheadlineOpacity: 90, position: 'top', offsetY: 8, lineHeight: 110 }, screenshot: { shadow: { enabled: true, color: '#7c2d12', blur: 60, opacity: 50, x: 0, y: 30 } } } },
    // ─── 11. Immersive Scene ───
    { id: 'immersive_scene', name: 'Immersive Scene', category: 'cinematic', tags: ['storytelling','marketing','concept','immersive'], description: 'Cinematic depth with haze and particles', previewGradient: 'linear-gradient(135deg, #0c1117 0%, #1a2332 30%, #0d2137 60%, #0a1628 100%)', previewAccent: '#60a5fa',
        settings: { background: { type: 'image', _overlayId: 'immersive_scene', imageFit: 'cover', imageBlur: 0, overlayColor: '#070b10', overlayOpacity: 15, noise: true, noiseIntensity: 5 }, text: { headlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", headlineSize: 82, headlineWeight: '700', headlineColor: '#e0f2fe', headlineItalic: false, headlineUnderline: false, headlineStrikethrough: false, subheadlineFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display'", subheadlineSize: 40, subheadlineWeight: '400', subheadlineColor: '#93c5fd', subheadlineOpacity: 80, position: 'bottom', offsetY: 8, lineHeight: 115 }, screenshot: { shadow: { enabled: true, color: '#1e3a5f', blur: 70, opacity: 55, x: 0, y: 35 } } } }
];

function getTemplateById(id) { return visualTemplates.find(t => t.id === id) || null; }

function applyTemplateToScreenshot(screenshot, templateId) {
    const template = getTemplateById(templateId);
    if (!template) return false;
    const s = template.settings;
    if (template.isNone) {
        screenshot.templateId = null;
        screenshot.background = JSON.parse(JSON.stringify(s.background));
        screenshot.screenshot.shadow = JSON.parse(JSON.stringify(s.screenshot.shadow));
        screenshot.screenshot.shadow.enabled = true;
        screenshot.screenshot.frame = screenshot.screenshot.frame || {};
        screenshot.screenshot.frame.enabled = false;
        screenshot.screenshot.cornerRadius = 24;
        applyTextStyle(screenshot, s);
        return true;
    }
    screenshot.background = Object.assign(
        JSON.parse(JSON.stringify(screenshot.background || {})),
        JSON.parse(JSON.stringify(s.background))
    );
    // Ensure type-specific sub-objects always exist (e.g. gradient stays defined
    // even when applying an image-type template), so syncUIWithState never crashes.
    if (!screenshot.background.gradient) {
        screenshot.background.gradient = JSON.parse(JSON.stringify((typeof state !== 'undefined' && state.defaults && state.defaults.background && state.defaults.background.gradient) || { angle: 135, stops: [{ color: '#5eecc0', position: 0 }, { color: '#3da88a', position: 100 }] }));
    }
    if (screenshot.background.solid === undefined) {
        screenshot.background.solid = (typeof state !== 'undefined' && state.defaults && state.defaults.background && state.defaults.background.solid) || '#1a1a2e';
    }
    // For image-type templates, trigger background image load
    if (s.background.type === 'image' && s.background.image && typeof loadBackgroundImage === 'function') {
        screenshot.background._pendingImageUrl = s.background.image;
        loadBackgroundImage(s.background.image);
    }
    // For overlay-based templates, use canvas-generated overlay
    if (s.background._overlayId && typeof getTemplateBgUrl === 'function') {
        var overlayUrl = getTemplateBgUrl(s.background._overlayId);
        screenshot.background._overlayUrl = overlayUrl;
        // Also create and set an Image object so drawBackground() finds it.
        // Without this, bg.type === 'image' but bg.image stays null → nothing draws.
        var overlayImg = new Image();
        overlayImg.onload = function() {
            screenshot.background.image = overlayImg;
            if (typeof updateCanvas === 'function') updateCanvas();
        };
        overlayImg.src = overlayUrl;
    }
    if (s.screenshot) {
        if (s.screenshot.shadow) { screenshot.screenshot.shadow = JSON.parse(JSON.stringify(s.screenshot.shadow)); screenshot.screenshot.shadow.enabled = true; }
        if (s.screenshot.frame) { screenshot.screenshot.frame = JSON.parse(JSON.stringify(s.screenshot.frame)); screenshot.screenshot.frame.enabled = true; }
        else { screenshot.screenshot.frame = screenshot.screenshot.frame || {}; screenshot.screenshot.frame.enabled = false; }
        if (s.screenshot.cornerRadius !== undefined) { screenshot.screenshot.cornerRadius = s.screenshot.cornerRadius; }
    }
    applyTextStyle(screenshot, s);
    screenshot.templateId = templateId;
    return true;
}

function applyTextStyle(screenshot, settings) {
    if (!settings.text) return;
    const preserved = { headlines: screenshot.text.headlines, subheadlines: screenshot.text.subheadlines, headlineEnabled: screenshot.text.headlineEnabled, subheadlineEnabled: screenshot.text.subheadlineEnabled, headlineLanguages: screenshot.text.headlineLanguages, subheadlineLanguages: screenshot.text.subheadlineLanguages, currentHeadlineLang: screenshot.text.currentHeadlineLang, currentSubheadlineLang: screenshot.text.currentSubheadlineLang, perLanguageLayout: screenshot.text.perLanguageLayout, languageSettings: screenshot.text.languageSettings, currentLayoutLang: screenshot.text.currentLayoutLang };
    ['headlineFont','headlineSize','headlineWeight','headlineColor','headlineItalic','headlineUnderline','headlineStrikethrough','subheadlineFont','subheadlineSize','subheadlineWeight','subheadlineColor','subheadlineOpacity','position','offsetY','lineHeight'].forEach(k => { if (settings.text[k] !== undefined) screenshot.text[k] = settings.text[k]; });
    Object.keys(preserved).forEach(k => { if (preserved[k] !== undefined) screenshot.text[k] = preserved[k]; });
}

function createTemplatePreviewCanvas(template, w, h) {
    var canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
    var ctx = canvas.getContext('2d');
    var s = template.settings;
    if (template.isNone) {
        var g = ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,'#5eecc0'); g.addColorStop(1,'#3da88a');
        ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
        ctx.fillStyle='#fff'; ctx.globalAlpha=0.3;
        ctx.fillRect(w/2-1,8,2,h-16); ctx.fillRect(8,h/2-1,w-16,2); ctx.globalAlpha=1;
        return canvas;
    }
    if (s.background.type==='gradient') {
        var ang = (s.background.gradient.angle||135)*Math.PI/180, cx=w/2, cy=h/2, len=Math.max(w,h);
        var g = ctx.createLinearGradient(cx-Math.cos(ang)*len, cy-Math.sin(ang)*len, cx+Math.cos(ang)*len, cy+Math.sin(ang)*len);
        s.background.gradient.stops.forEach(function(st){ g.addColorStop(st.position/100, st.color); });
        ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
    } else if (s.background.type==='image') {
        // Draw a dark placeholder with a subtle camera icon hint
        ctx.fillStyle='#1a1a2e'; ctx.fillRect(0,0,w,h);
        ctx.fillStyle='#3b3b5c'; ctx.fillRect(0,0,w,h);
        var g2 = ctx.createLinearGradient(0,0,w,h);
        g2.addColorStop(0,'#2d2d4e'); g2.addColorStop(0.5,'#1a1a3e'); g2.addColorStop(1,'#0d0d2e');
        ctx.fillStyle=g2; ctx.fillRect(0,0,w,h);
    } else { ctx.fillStyle=s.background.solid||'#333'; ctx.fillRect(0,0,w,h); }
    var pw=w*0.28, ph=h*0.55, px=(w-pw)/2, py=(h-ph)/2, r=pw*0.15;
    ctx.fillStyle=s.text.headlineColor||'#fff'; ctx.globalAlpha=0.12; ctx.beginPath(); drr(ctx,px,py,pw,ph,r); ctx.fill(); ctx.globalAlpha=1;
    ctx.fillStyle=s.text.headlineColor||'#fff'; ctx.globalAlpha=0.25; ctx.beginPath(); var si=pw*0.12; drr(ctx,px+si,py+ph*0.06,pw-si*2,ph*0.88,r*0.6); ctx.fill(); ctx.globalAlpha=1;
    ctx.fillStyle=template.previewAccent||s.text.headlineColor||'#fff'; ctx.globalAlpha=0.6;
    ctx.fillRect((w-w*0.35)/2, py+ph+h*0.06, w*0.35, h*0.04); ctx.globalAlpha=1;
    return canvas;
}
function drr(ctx,x,y,w,h,r){ ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r); ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r); ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r); ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); }
