import { Button, Progress, Popover, Slider, Space, Switch, Menu } from "antd";
import { CaretRightOutlined, PauseOutlined, NotificationOutlined, SettingOutlined, StepForwardOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from "react";

function Component(props){
    const { audio } = props;

    const parentRef = useRef<HTMLDivElement>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        if (!audio) return;

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;

        const draw = () => {
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i];
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, "#faad14");
                gradient.addColorStop(1, "#613400");
                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            audioContext.close();
        };
    }, [audio]);

    return (
        <div ref={parentRef} style={{width: '100%', height: '100%', boxSizing: "border-box" }}>
            <canvas ref={canvasRef} height={300} width={2400} style={{ width: "100%", height: '100%' }}/>
        </div>
    )
}

export default Component;
