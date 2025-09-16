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
    const radius = inner ? 220 : 150; // 内圈半径
    const bars = bufferLength;

    for (let i = 0; i < bars; i++) {
        let barHeight = dataArray[i] * 0.7; // 缩放一下高度
        const angle = (i / bars) * Math.PI * 2 + 2.5; // 当前角度

        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;

        let line = inner ? radius - barHeight : radius + barHeight;
        const x2 = centerX + Math.cos(angle) * (line);
        const y2 = centerY + Math.sin(angle) * (line);

        // 渐变颜色
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
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#faad14";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function DrawParticles(analyser, dataArray, ctx, canvas, bufferLength, particles) {
    analyser.getByteFrequencyData(dataArray);

    // 根据音频更新粒子
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const audioValue = dataArray[i % bufferLength] / 255; // 归一化到 0-1

        // 根据音频值调整粒子速度和大小
        p.vx += (Math.random() - 0.5) * 0.5;
        p.vy += (Math.random() - 0.5) * 0.5;
        p.x += p.vx * (1 + audioValue * 5);
        p.y += p.vy * (1 + audioValue * 5);
        p.size = 2 + audioValue * 8;

        // 边界检测
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // 绘制粒子
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, "#faad14");
        gradient.addColorStop(1, "#613400");

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