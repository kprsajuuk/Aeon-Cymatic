const windowRatio = window.devicePixelRatio || 1;

function DrawSpectrum(analyser, dataArray, ctx, canvas, bufferLength){
    analyser.getByteFrequencyData(dataArray);
    const barWidth = (canvas.width / bufferLength) * 2 * windowRatio;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 2 * windowRatio;
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#faad14");
        gradient.addColorStop(1, "#613400");
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }

}

function DrawWaveform(analyser, dataArray, ctx, canvas, bufferLength){
    analyser.getByteTimeDomainData(dataArray);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#faad14";
    ctx.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / (2 * windowRatio);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
}

function DrawCircularSpectrum(analyser, dataArray, ctx, canvas, bufferLength, type) {
    analyser.getByteFrequencyData(dataArray);
    const inner = type === 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / (windowRatio * 2);
    const centerY = canvas.height / (windowRatio * 2);
    const radius = inner ? 260 : 120; // 内圈半径
    const bars = bufferLength;

    const sectors = 4;
    const barsPerSector = Math.floor(bars / sectors);

    const sectorAngle = (Math.PI / 2) * 1.03;

    for (let s = 0; s < sectors; s++) {
        const startAngle = (s * Math.PI) / 2 - (0.03) / 2; //多出来的0.03度，因为上面会多绘制1.03度

        for (let i = 0; i < barsPerSector; i++) {
            let barHeight = dataArray[i] * 0.7;

            // 中心对称：偶数扇区正向，奇数扇区反向
            const progress = (s % 2 === 0) ? (i / barsPerSector) : (1 - i / barsPerSector);

            // 当前角度
            const angle = startAngle + progress * sectorAngle;

            // === 当前扇区的线条 ===
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;

            let line = inner ? radius - barHeight : radius + barHeight;
            const x2 = centerX + Math.cos(angle) * line;
            const y2 = centerY + Math.sin(angle) * line;

            // 渐变
            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, "#faad14");
            gradient.addColorStop(1, "#613400");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = inner ? 3 : 5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#faad14";
    ctx.lineWidth = 2;

    ctx.stroke();
}

function DrawParticles(analyser, dataArray, ctx, canvas, bufferLength, particles, mouse, particleType) { 
    analyser.getByteFrequencyData(dataArray);
    let direction = particleType === 1 ? 1 : -1;
    let total = 0;
    for (let j = 0; j < bufferLength; j++) total += dataArray[j];
    const avg = total / bufferLength / 255;

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const audioValue = dataArray[i % bufferLength] / 255;

        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;

        const speedFactor = 1 + audioValue * 5;
        p.x += p.vx * speedFactor;
        p.y += p.vy * speedFactor;

        // === 粒子大小随音乐变化 ===
        p.size = 2 + audioValue * Math.random() * 25;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const alpha = 0.3 + avg * 5;
        let colorCenter = `rgba(250, 173, 20, ${alpha})`; // 默认橙黄
        let colorEdge = `rgba(97, 52, 0, 0)`;             // 默认暗棕

        // === 鼠标交互 ===
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const radius = 150; // 鼠标作用半径
            if (dist < radius) {
                const t = 1 - dist / radius; 
                const force = t * 1.2; // 越近吸力越大
                p.vx += dx / dist * force * direction;
                p.vy += dy / dist * force * direction;

                // 粒子靠近时放大
                p.size += 10 * (1 - dist / radius);
                //const whiteness = Math.floor(255 * t); 
                // 颜色往白色过渡
                colorCenter = `rgba(255, 255, 255, ${alpha})`;
                colorEdge = `rgba(97, 52, 0, 0)`;
            }
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, colorCenter);
        gradient.addColorStop(1, colorEdge);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 初始化粒子数组
function createParticles(count, canvas) {
    const particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: 2
        });
    }
    return particles;
}


export {
    DrawSpectrum,
    DrawWaveform,
    DrawCircularSpectrum,
    DrawParticles,
    createParticles
}