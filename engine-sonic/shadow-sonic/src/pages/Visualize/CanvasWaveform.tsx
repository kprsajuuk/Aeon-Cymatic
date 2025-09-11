import { Button, Progress, Popover, Slider, Space, Switch, Menu } from "antd";
import { CaretRightOutlined, PauseOutlined, NotificationOutlined, SettingOutlined, StepForwardOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from "react";

function Component(props){
    const { audio } = props;

    const parentRef = useRef<HTMLDivElement>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        console.log(audio)
        if (!audio) return;

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;

        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;

        const draw = () => {
            analyser.getByteTimeDomainData(dataArray);

            ctx.lineWidth = 2;
            ctx.strokeStyle = "#52c41a";
            ctx.beginPath();

            const sliceWidth = (canvas.width * 1.0) / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        };

        draw();

        return () => {
            //if (animationRef.current) cancelAnimationFrame(animationRef.current);
            //audioContext.close();
        };
    }, [audio]);

    return (
        <div ref={parentRef} style={{width: '100%', height: '100%', boxSizing: "border-box" }}>
            <canvas ref={canvasRef} height={300} width={2400} style={{ width: "100%", height: '100%' }}/>
        </div>
    )
}

export default Component;
