// ─── Panel Resize Handles + Template Integration ───
// Panels default to CSS values (380px left, 420px right) — no localStorage persistence.
// Resize handles only activate when the user drags them.
(function(){
    var container = document.querySelector('.app-container');
    if(!container) return;

    // Panel resize — starts unset, CSS defaults take over
    var leftHandle = document.getElementById('resize-handle-left');
    var rightHandle = document.getElementById('resize-handle-right');
    var leftWidth = null;  // null = use CSS default
    var rightWidth = null;
    var minWidth = 280, maxWidth = 700;

    function updateColumns() {
        if (leftWidth !== null) container.style.setProperty('--panel-left-width', leftWidth + 'px');
        else container.style.removeProperty('--panel-left-width');
        if (rightWidth !== null) container.style.setProperty('--panel-right-width', rightWidth + 'px');
        else container.style.removeProperty('--panel-right-width');
    }

    function makeResizable(handle, side, getWidth, setWidth, getMin, getMax) {
        var startX, startWidth;
        handle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            // On first drag, snap to current CSS-computed width
            var rect = handle.parentElement.querySelector(side === 'left' ? '.sidebar' : '.sidebar-right').getBoundingClientRect();
            startWidth = rect.width;
            setWidth(startWidth);
            updateColumns();

            startX = e.clientX;
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
    // Do NOT call updateColumns() here — let CSS defaults win

    // ─── Populate template dropdown in project modal ───
    var templateSelect = document.getElementById('project-template-select');
    function populateTemplateDropdown() {
        if(!templateSelect || typeof visualTemplates === 'undefined') return;
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

    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){
            setTimeout(populateTemplateDropdown, 300);
        });
    } else {
        setTimeout(populateTemplateDropdown, 300);
    }

    var projectModal = document.getElementById('project-modal');
    if(projectModal) {
        var mo = new MutationObserver(function() {
            if(projectModal.classList.contains('visible')) {
                populateTemplateDropdown();
            }
        });
        mo.observe(projectModal, { attributes: true, attributeFilter: ['class'] });
    }

    window.getProjectTemplateId = function() {
        return templateSelect ? templateSelect.value : '';
    };

    // ─── loadBackgroundImage polyfill ───
    window._templateBgLoaded = {};
    window.loadBackgroundImage = function(url) {
        if (!url || window._templateBgLoaded[url]) return;
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            window._templateBgLoaded[url] = img;
            if (typeof updateCanvas === 'function') updateCanvas();
        };
        img.onerror = function() {
            console.warn('Template bg image failed to load: ' + url);
        };
        img.src = url;
    };
})();
