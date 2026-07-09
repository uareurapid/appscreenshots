// Template Background Image Generator
// Creates professional-quality background scenery for each template style.
// Stored as data URL strings (serialization-safe) and drawn as overlays
// on top of gradient backgrounds at render time.

function generateTemplateBackground(templateId, width, height) {
    const W = width || 1290;
    const H = height || 2796;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    switch (templateId) {

        // ═══ Glassmorphism: frosted glass panels with prismatic light ═══
        case 'glassmorphism': {
            // Deep gradient base
            const baseGrad = ctx.createLinearGradient(0, 0, W * 0.7, H);
            baseGrad.addColorStop(0, '#0d0221');
            baseGrad.addColorStop(0.4, '#1a0533');
            baseGrad.addColorStop(0.7, '#2d1b69');
            baseGrad.addColorStop(1, '#0a2a3a');
            ctx.fillStyle = baseGrad;
            ctx.fillRect(0, 0, W, H);

            // Glass panel 1 - large, angled
            ctx.save();
            ctx.globalAlpha = 0.12;
            ctx.translate(W * 0.55, H * 0.35);
            ctx.rotate(-0.15);
            const gp1 = ctx.createLinearGradient(-100, -100, 400, 800);
            gp1.addColorStop(0, 'rgba(255,255,255,0)');
            gp1.addColorStop(0.3, 'rgba(255,255,255,0.5)');
            gp1.addColorStop(0.5, 'rgba(10,189,198,0.3)');
            gp1.addColorStop(0.7, 'rgba(113,28,145,0.2)');
            gp1.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = gp1;
            ctx.fillRect(-200, -200, 700, 900);
            ctx.restore();

            // Glass panel 2
            ctx.save();
            ctx.globalAlpha = 0.08;
            ctx.translate(W * 0.15, H * 0.15);
            ctx.rotate(0.22);
            const gp2 = ctx.createLinearGradient(-50, -50, 300, 700);
            gp2.addColorStop(0, 'rgba(255,255,255,0)');
            gp2.addColorStop(0.4, 'rgba(10,189,198,0.4)');
            gp2.addColorStop(0.7, 'rgba(13,2,33,0.1)');
            gp2.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = gp2;
            ctx.fillRect(-100, -100, 500, 1000);
            ctx.restore();

            // Caustic light patterns
            for (let i = 0; i < 8; i++) {
                ctx.save();
                ctx.globalAlpha = 0.05 + Math.random() * 0.06;
                const cx = W * 0.3 + Math.random() * W * 0.5;
                const cy = H * 0.2 + Math.random() * H * 0.6;
                const r = 40 + Math.random() * 150;
                const cau = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                cau.addColorStop(0, '#0abdc6');
                cau.addColorStop(0.4, '#711c91');
                cau.addColorStop(1, 'transparent');
                ctx.fillStyle = cau;
                ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
                ctx.restore();
            }

            // Prismatic edge highlights
            ctx.save();
            ctx.globalAlpha = 0.07;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(W * 0.1, H * 0.3);
            ctx.bezierCurveTo(W * 0.4, H * 0.25, W * 0.6, H * 0.35, W * 0.9, H * 0.28);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(W * 0.05, H * 0.5);
            ctx.bezierCurveTo(W * 0.35, H * 0.45, W * 0.65, H * 0.55, W * 0.95, H * 0.48);
            ctx.stroke();
            ctx.restore();

            // Particle dispersion
            for (let i = 0; i < 40; i++) {
                ctx.save();
                ctx.globalAlpha = 0.1 + Math.random() * 0.3;
                const px = Math.random() * W;
                const py = Math.random() * H;
                const pr = 1 + Math.random() * 3;
                ctx.fillStyle = Math.random() < 0.5 ? '#0abdc6' : '#c4b5fd';
                ctx.beginPath();
                ctx.arc(px, py, pr, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            break;
        }

        // ═══ Minimalist: soft satin with subtle geometric accent ═══
        case 'minimalist': {
            // Warm satin gradient
            const bg = ctx.createLinearGradient(0, 0, 0, H);
            bg.addColorStop(0, '#f8f4ef');
            bg.addColorStop(0.5, '#f0ebe3');
            bg.addColorStop(1, '#e8e2da');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Subtle radial center glow
            ctx.save();
            ctx.globalAlpha = 0.3;
            const glow = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.5, W * 0.7);
            glow.addColorStop(0, '#ffffff');
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();

            // Single geometric accent circle
            ctx.save();
            ctx.globalAlpha = 0.25;
            ctx.beginPath();
            ctx.arc(W * 0.78, H * 0.18, 180, 0, Math.PI * 2);
            const circGrad = ctx.createRadialGradient(W * 0.78, H * 0.18, 0, W * 0.78, H * 0.18, 180);
            circGrad.addColorStop(0, '#d4c5b0');
            circGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = circGrad;
            ctx.fill();
            ctx.restore();

            // Thin horizontal accent line
            ctx.save();
            ctx.globalAlpha = 0.2;
            ctx.strokeStyle = '#1d1d1f';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(W * 0.15, H * 0.62);
            ctx.lineTo(W * 0.5, H * 0.62);
            ctx.stroke();
            ctx.restore();

            // Micro texture grain
            ctx.save();
            ctx.globalAlpha = 0.08;
            for (let i = 0; i < 200; i++) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
            }
            ctx.restore();
            break;
        }

        // ═══ Cyber-Gloss: neon grid + glowing nodes ═══
        case 'dark_futuristic': {
            // Deepest black base
            ctx.fillStyle = '#020202';
            ctx.fillRect(0, 0, W, H);

            // Hex/grid pattern
            ctx.save();
            ctx.globalAlpha = 0.06;
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 1;
            const gs = 35;
            for (let x = 0; x < W; x += gs) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, H);
                ctx.stroke();
            }
            for (let y = 0; y < H; y += gs) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(W, y);
                ctx.stroke();
            }
            ctx.restore();

            // Glowing node intersections
            for (let x = gs * 3; x < W - gs * 3; x += gs * 5) {
                for (let y = gs * 3; y < H - gs * 3; y += gs * 5) {
                    if (Math.random() < 0.6) {
                        ctx.save();
                        ctx.globalAlpha = 0.15 + Math.random() * 0.2;
                        const ng = ctx.createRadialGradient(x, y, 0, x, y, 20);
                        ng.addColorStop(0, '#00e5ff');
                        ng.addColorStop(0.4, '#00e5ff');
                        ng.addColorStop(1, 'transparent');
                        ctx.fillStyle = ng;
                        ctx.fillRect(x - 25, y - 25, 50, 50);
                        ctx.restore();
                    }
                }
            }

            // Neon strips
            ctx.save();
            ctx.globalAlpha = 0.15;
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 4;
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.moveTo(W * 0.05, H * 0.25);
            ctx.lineTo(W * 0.3, H * 0.25);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(W * 0.7, H * 0.75);
            ctx.lineTo(W * 0.95, H * 0.75);
            ctx.stroke();
            ctx.restore();

            // Diagonal tech lines
            ctx.save();
            ctx.globalAlpha = 0.04;
            ctx.strokeStyle = '#82b1ff';
            ctx.lineWidth = 2;
            for (let i = -H; i < W + H; i += 100) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i - H, H);
                ctx.stroke();
            }
            ctx.restore();

            // Cyber fog at bottom
            ctx.save();
            ctx.globalAlpha = 0.08;
            const fog = ctx.createLinearGradient(0, H * 0.7, 0, H);
            fog.addColorStop(0, 'transparent');
            fog.addColorStop(1, '#00101a');
            ctx.fillStyle = fog;
            ctx.fillRect(0, H * 0.7, W, H * 0.3);
            ctx.restore();
            break;
        }

        // ═══ 3D Playful: colorful floating bubble shapes ═══
        case '3d_playful': {
            // Bright gradient base
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, '#e0f0ff');
            bg.addColorStop(0.4, '#dbeafe');
            bg.addColorStop(0.7, '#ede9fe');
            bg.addColorStop(1, '#fce7f3');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            const bubbleColors = [
                { color: '#93c5fd', x: 0.2, y: 0.25, r: 120 },
                { color: '#c4b5fd', x: 0.75, y: 0.2, r: 95 },
                { color: '#f9a8d4', x: 0.15, y: 0.65, r: 140 },
                { color: '#a5f3fc', x: 0.8, y: 0.6, r: 110 },
                { color: '#fde68a', x: 0.5, y: 0.15, r: 80 },
                { color: '#d8b4fe', x: 0.4, y: 0.75, r: 100 },
                { color: '#93c5fd', x: 0.85, y: 0.85, r: 70 },
                { color: '#f9a8d4', x: 0.55, y: 0.45, r: 90 },
            ];

            bubbleColors.forEach(b => {
                ctx.save();
                ctx.globalAlpha = 0.35;
                const g = ctx.createRadialGradient(b.x * W, b.y * H, 0, b.x * W, b.y * H, b.r);
                g.addColorStop(0, b.color);
                g.addColorStop(0.5, b.color);
                g.addColorStop(1, 'transparent');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(b.x * W, b.y * H, b.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            // Small floating dots
            for (let i = 0; i < 25; i++) {
                ctx.save();
                ctx.globalAlpha = 0.2 + Math.random() * 0.3;
                ctx.fillStyle = bubbleColors[Math.floor(Math.random() * bubbleColors.length)].color;
                ctx.beginPath();
                ctx.arc(Math.random() * W, Math.random() * H, 3 + Math.random() * 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            break;
        }

        // ═══ Dark Luxury: gold geometric + dramatic sweep ═══
        case 'dark_luxury': {
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, W, H);

            // Subtle gradient depth
            ctx.save();
            ctx.globalAlpha = 0.15;
            const depth = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.5, W * 0.8);
            depth.addColorStop(0, '#1a1a1a');
            depth.addColorStop(1, 'transparent');
            ctx.fillStyle = depth;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();

            // Dramatic light sweep
            ctx.save();
            ctx.globalAlpha = 0.04;
            const sweep = ctx.createLinearGradient(W * 0.2, H * 0.1, W * 0.8, H * 0.4);
            sweep.addColorStop(0, 'transparent');
            sweep.addColorStop(0.45, '#ffffff');
            sweep.addColorStop(0.5, '#ffffff');
            sweep.addColorStop(0.55, '#ffffff');
            sweep.addColorStop(1, 'transparent');
            ctx.fillStyle = sweep;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();

            // Gold geometric lines
            ctx.save();
            ctx.globalAlpha = 0.1;
            ctx.strokeStyle = '#c9a227';
            ctx.lineWidth = 1.5;
            // Vertical lines
            for (let x = W * 0.2; x < W * 0.85; x += W * 0.12) {
                ctx.beginPath();
                ctx.moveTo(x, H * 0.1);
                ctx.lineTo(x, H * 0.9);
                ctx.stroke();
            }
            // Horizontal lines
            for (let y = H * 0.15; y < H * 0.9; y += H * 0.2) {
                ctx.beginPath();
                ctx.moveTo(W * 0.1, y);
                ctx.lineTo(W * 0.9, y);
                ctx.stroke();
            }
            ctx.restore();

            // Gold accent glow
            ctx.save();
            ctx.globalAlpha = 0.12;
            const gGrad = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.5, H * 0.5, W * 0.8);
            gGrad.addColorStop(0, '#c9a227');
            gGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = gGrad;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();

            // Small gold dots at intersections
            ctx.save();
            ctx.fillStyle = '#c9a227';
            for (let x = W * 0.2; x < W * 0.9; x += W * 0.12) {
                for (let y = H * 0.15; y < H * 0.9; y += H * 0.2) {
                    ctx.globalAlpha = 0.2;
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.restore();
            break;
        }

        // ═══ Ethereal Bokeh: dreamy light orbs + stars ═══
        case 'ethereal_bokeh': {
            // Deep moody gradient
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, '#0f0720');
            bg.addColorStop(0.4, '#1e1b4b');
            bg.addColorStop(0.7, '#4a1942');
            bg.addColorStop(1, '#701a4e');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Large bokeh orbs
            const bokehColors = ['#f9a8d4', '#c4b5fd', '#a78bfa', '#fda4af', '#e9d5ff'];
            for (let i = 0; i < 20; i++) {
                ctx.save();
                const cx = Math.random() * W;
                const cy = Math.random() * H;
                const r = 30 + Math.random() * 120;
                ctx.globalAlpha = 0.08 + Math.random() * 0.12;
                const bg = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r);
                const c = bokehColors[Math.floor(Math.random() * bokehColors.length)];
                bg.addColorStop(0, c);
                bg.addColorStop(0.5, c);
                bg.addColorStop(1, 'transparent');
                ctx.fillStyle = bg;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // Star sparkles
            for (let i = 0; i < 15; i++) {
                ctx.save();
                const sx = Math.random() * W;
                const sy = Math.random() * H;
                ctx.globalAlpha = 0.3 + Math.random() * 0.5;
                ctx.fillStyle = Math.random() < 0.5 ? '#ffffff' : '#f9a8d4';
                ctx.beginPath();
                // 4-point star
                const ss = 6 + Math.random() * 12;
                ctx.moveTo(sx, sy - ss);
                ctx.quadraticCurveTo(sx + ss * 0.3, sy - ss * 0.3, sx + ss * 0.3, sy);
                ctx.quadraticCurveTo(sx + ss * 0.3, sy + ss * 0.3, sx, sy + ss);
                ctx.quadraticCurveTo(sx - ss * 0.3, sy + ss * 0.3, sx - ss * 0.3, sy);
                ctx.quadraticCurveTo(sx - ss * 0.3, sy - ss * 0.3, sx, sy - ss);
                ctx.fill();
                ctx.restore();
            }

            // Tiny dust motes
            for (let i = 0; i < 60; i++) {
                ctx.save();
                ctx.globalAlpha = 0.1 + Math.random() * 0.4;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(Math.random() * W, Math.random() * H, 0.5 + Math.random() * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            break;
        }

        // ═══ Aurora Mesh: flowing wave gradient bands ═══
        case 'aurora_gradient': {
            // Base rich gradient
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, '#1e1b4b');
            bg.addColorStop(0.3, '#312e81');
            bg.addColorStop(0.5, '#0e7490');
            bg.addColorStop(0.7, '#065f46');
            bg.addColorStop(1, '#451a03');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Flowing wave bands
            const bands = [
                { y: 0.18, color: '#67e8f9', alpha: 0.25, amp: 100, wl: 0.003 },
                { y: 0.32, color: '#a5f3fc', alpha: 0.2, amp: 80, wl: 0.0035 },
                { y: 0.48, color: '#6ee7b7', alpha: 0.2, amp: 70, wl: 0.004 },
                { y: 0.62, color: '#a3e635', alpha: 0.18, amp: 60, wl: 0.0038 },
                { y: 0.76, color: '#fbbf24', alpha: 0.16, amp: 50, wl: 0.0042 },
            ];

            bands.forEach(b => {
                ctx.save();
                ctx.globalAlpha = b.alpha;
                ctx.strokeStyle = b.color;
                ctx.lineWidth = 160;
                ctx.lineCap = 'round';
                ctx.beginPath();
                for (let x = -50; x <= W + 50; x += 8) {
                    const y = b.y * H + Math.sin(x * b.wl) * b.amp + Math.sin(x * b.wl * 2.7 + 1) * b.amp * 0.35;
                    if (x === -50) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
                ctx.restore();
            });

            // Soft particle cloud
            for (let i = 0; i < 30; i++) {
                ctx.save();
                ctx.globalAlpha = 0.04 + Math.random() * 0.06;
                const cx = Math.random() * W;
                const cy = Math.random() * H;
                const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200 + Math.random() * 200);
                rg.addColorStop(0, Math.random() < 0.5 ? '#67e8f9' : '#a3e635');
                rg.addColorStop(1, 'transparent');
                ctx.fillStyle = rg;
                ctx.fillRect(cx - 250, cy - 250, 500, 500);
                ctx.restore();
            }
            break;
        }

        // ═══ Neumorphism: embossed shapes + soft depth ═══
        case 'neumorphism': {
            // Soft grey-blue base
            ctx.fillStyle = '#e0e5ec';
            ctx.fillRect(0, 0, W, H);

            // Concentric embossed circles
            const shapes = [
                { x: 0.5, y: 0.45, r: 350, alpha: 0.3 },
                { x: 0.5, y: 0.45, r: 280, alpha: 0.2 },
                { x: 0.5, y: 0.45, r: 210, alpha: 0.15 },
            ];

            shapes.forEach(s => {
                ctx.save();
                // Outer shadow (dark blur)
                ctx.globalAlpha = s.alpha * 0.4;
                ctx.fillStyle = '#a1aab4';
                ctx.beginPath();
                ctx.arc(s.x * W + 6, s.y * H + 8, s.r, 0, Math.PI * 2);
                ctx.fill();
                // Inner highlight (light blur)
                ctx.globalAlpha = s.alpha * 0.6;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(s.x * W - 4, s.y * H - 6, s.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            // Central embossed shape
            ctx.save();
            ctx.globalAlpha = 0.35;
            const centerGrad = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, 400);
            centerGrad.addColorStop(0, '#eceef3');
            centerGrad.addColorStop(1, '#d5dae3');
            ctx.fillStyle = centerGrad;
            ctx.beginPath();
            ctx.arc(W * 0.5, H * 0.45, 400, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Subtle grid lines
            ctx.save();
            ctx.globalAlpha = 0.06;
            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 1;
            for (let x = 0; x < W; x += 80) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            for (let y = 0; y < H; y += 80) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }
            ctx.restore();
            break;
        }

        // ═══ Clay 3D: painterly texture + soft sculpted light ═══
        case 'clay_3d': {
            // Warm taupe base
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, '#d8c9bc');
            bg.addColorStop(0.5, '#cfbeb1');
            bg.addColorStop(1, '#bfa890');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Painterly texture grain
            const imageData = ctx.getImageData(0, 0, W, H);
            const d = imageData.data;
            for (let i = 0; i < d.length; i += 4) {
                const n = (Math.random() - 0.5) * 14;
                d[i] = Math.max(0, Math.min(255, d[i] + n));
                d[i+1] = Math.max(0, Math.min(255, d[i+1] + n * 0.85));
                d[i+2] = Math.max(0, Math.min(255, d[i+2] + n * 0.65));
            }
            ctx.putImageData(imageData, 0, 0);

            // Soft sculpted light areas
            const highlights = [
                { x: 0.2, y: 0.25, r: 600, a: 0.15 },
                { x: 0.75, y: 0.6, r: 500, a: 0.1 },
                { x: 0.5, y: 0.7, r: 400, a: 0.08 },
            ];

            highlights.forEach(h => {
                ctx.save();
                ctx.globalAlpha = h.a;
                const hg = ctx.createRadialGradient(h.x * W, h.y * H, 0, h.x * W, h.y * H, h.r);
                hg.addColorStop(0, '#ffffff');
                hg.addColorStop(1, 'transparent');
                ctx.fillStyle = hg;
                ctx.beginPath();
                ctx.arc(h.x * W, h.y * H, h.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            break;
        }

        // ═══ Duotone: bold split with geometric shapes ═══
        case 'duotone': {
            // Bold vertical split gradient
            const bg = ctx.createLinearGradient(0, 0, 0, H);
            bg.addColorStop(0, '#7c2d12');
            bg.addColorStop(0.35, '#9a3412');
            bg.addColorStop(0.5, '#b45309');
            bg.addColorStop(0.65, '#d97706');
            bg.addColorStop(1, '#f59e0b');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Dot pattern on right side
            ctx.save();
            ctx.fillStyle = '#ffffff';
            for (let x = W * 0.6; x < W; x += 16) {
                for (let y = 0; y < H; y += 16) {
                    ctx.globalAlpha = 0.05;
                    ctx.beginPath();
                    ctx.arc(x + (y % 32 === 0 ? 8 : 0), y, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.restore();

            // Bold sweeping curve
            ctx.save();
            ctx.globalAlpha = 0.1;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 100;
            ctx.beginPath();
            ctx.moveTo(-50, H * 0.8);
            ctx.quadraticCurveTo(W * 0.4, H * 0.25, W + 50, H * 0.55);
            ctx.stroke();
            ctx.restore();

            // Secondary thin accent curve
            ctx.save();
            ctx.globalAlpha = 0.15;
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(W * 0.1, H * 0.7);
            ctx.quadraticCurveTo(W * 0.35, H * 0.35, W * 0.65, H * 0.55);
            ctx.stroke();
            ctx.restore();

            // Geometric accent triangles
            ctx.save();
            ctx.globalAlpha = 0.08;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(W * 0.85, H * 0.15);
            ctx.lineTo(W * 0.95, H * 0.35);
            ctx.lineTo(W * 0.88, H * 0.4);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            break;
        }

        // ═══ Immersive Scene: cinematic depth + atmosphere ═══
        case 'immersive_scene': {
            // Deep cinematic gradient
            const bg = ctx.createLinearGradient(0, 0, 0, H);
            bg.addColorStop(0, '#070b10');
            bg.addColorStop(0.4, '#0f1823');
            bg.addColorStop(0.7, '#0d1b2e');
            bg.addColorStop(1, '#071018');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Atmospheric haze bands
            for (let i = 0; i < 6; i++) {
                ctx.save();
                ctx.globalAlpha = 0.04 + i * 0.015;
                const y = H * 0.2 + i * 150;
                const hg = ctx.createLinearGradient(0, y - 200, 0, y + 200);
                hg.addColorStop(0, 'transparent');
                hg.addColorStop(0.5, '#3b82f6');
                hg.addColorStop(1, 'transparent');
                ctx.fillStyle = hg;
                ctx.fillRect(0, y - 200, W, 400);
                ctx.restore();
            }

            // Dramatic light beam from top
            ctx.save();
            ctx.globalAlpha = 0.06;
            const beam = ctx.createLinearGradient(W * 0.35, 0, W * 0.65, H);
            beam.addColorStop(0, 'rgba(96,165,250,0.3)');
            beam.addColorStop(0.3, '#60a5fa');
            beam.addColorStop(0.6, '#60a5fa');
            beam.addColorStop(1, 'transparent');
            ctx.fillStyle = beam;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();

            // Particle field
            for (let i = 0; i < 100; i++) {
                ctx.save();
                const px = Math.random() * W;
                const py = Math.random() * H;
                const pr = 0.5 + Math.random() * 3;
                ctx.globalAlpha = 0.06 + Math.random() * 0.25;
                ctx.fillStyle = '#93c5fd';
                ctx.beginPath();
                ctx.arc(px, py, pr, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // Subtle horizon line
            ctx.save();
            ctx.globalAlpha = 0.08;
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, H * 0.55);
            ctx.lineTo(W, H * 0.55);
            ctx.stroke();
            ctx.restore();
            break;
        }
    }

    return canvas.toDataURL('image/png');
}

// ─── Cache ───
const _bgCache = {};
const BG_RENDER_SIZE = { w: 800, h: 1600 }; // Preview size for speed

function getTemplateBgUrl(templateId) {
    if (!_bgCache[templateId]) {
        _bgCache[templateId] = generateTemplateBackground(templateId, BG_RENDER_SIZE.w, BG_RENDER_SIZE.h);
    }
    return _bgCache[templateId];
}
