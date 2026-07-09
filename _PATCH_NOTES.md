# To complete the template image overlay feature:

## Step 1: Edit templates.js

In each template entry, add `_overlayId: '<id>'` inside `settings.background`. Example for the first template (glassmorphism):

```js
background: {
    type: 'gradient',
    gradient: { ... },
    noise: true,
    noiseIntensity: 5,
    _overlayId: 'glassmorphism'   // <-- ADD THIS LINE
},
```

Do this for all 11 templates using their IDs: glassmorphism, minimalist, dark_futuristic, 3d_playful, dark_luxury, ethereal_bokeh, aurora_gradient, neumorphism, clay_3d, duotone, immersive_scene

## Step 2: Edit applyTemplateToScreenshot in templates.js

After the line `screenshot.background = JSON.parse(JSON.stringify(s.background));` add:

```js
if (s.background._overlayId && typeof getTemplateBgUrl === 'function') {
    screenshot.background._overlayUrl = getTemplateBgUrl(s.background._overlayId);
}
```

## Step 3: Edit template-ui.js initTemplateSystem()

Add this before the updateCanvas wrapping:

```js
if (typeof drawBackgroundToContext === 'function') {
    var origBg = drawBackgroundToContext;
    drawBackgroundToContext = function(ctx, dims, bg) {
        origBg(ctx, dims, bg);
        if (bg._overlayUrl) {
            var img = new Image();
            img.src = bg._overlayUrl;
            ctx.globalAlpha = 0.55;
            ctx.drawImage(img, 0, 0, dims.width, dims.height);
            ctx.globalAlpha = 1;
        }
    };
}
```
