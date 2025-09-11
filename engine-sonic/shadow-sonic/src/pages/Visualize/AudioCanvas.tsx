import { Button, Progress, Popover, Slider, Space, Switch, Menu } from "antd";
import { CaretRightOutlined, PauseOutlined, NotificationOutlined, SettingOutlined, StepForwardOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from "react";
import { DrawSpectrum, DrawWaveform } from './CanvasFunction'

function Component(props){
    const { audio, graphType } = props;

    const parentRef = useRef<HTMLDivElement>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);

    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

    const drawCanvas = (analyser) => {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (graphType === "spectrum") {
                DrawSpectrum(analyser, dataArray, ctx, canvas, bufferLength);
            } else if (graphType === "waveform") {
                DrawWaveform(analyser, dataArray, ctx, canvas, bufferLength);
            }
        };

        draw();
    }

    useEffect(() => {
        if (!audio) return;

        let audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;
    
        let analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        let source = audioContext.createMediaElementSource(audio);
        sourceRef.current = source
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        drawCanvas(analyser);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            //audioContext.close();
        };
    }, [audio]);

    useEffect(() => {
        let analyser = analyserRef.current;
        if (analyser) {
            drawCanvas(analyser);
        }
    }, [graphType])

    return (
        <div ref={parentRef} style={{width: '100%', height: '100%', boxSizing: "border-box" }}>
            <canvas ref={canvasRef} height={300} width={2400} style={{ width: "100%", height: '100%' }}/>
        </div>
    )
}

export default Component;
