import { Button, Progress, Popover, Slider, Radio, Row, Col } from "antd";
import { CaretRightOutlined, PauseOutlined, EllipsisOutlined, SettingOutlined, StepForwardOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from "react";
import { DrawSpectrum, DrawWaveform, DrawCircularSpectrum, DrawParticles, createParticles } from './CanvasFunction'

function Component(props){
    const { audio, graphType } = props;
    const [spectrumSize, setSpectrumSize] = useState(256);
    const [waveformSize, setWaveformSize] = useState(2048);
    const [circularSize, setCircularSize] = useState(256);
    const [particleSize, setParticleSize] = useState(256);

    const [circularType, setCircularType] = useState(2);

    const parentRef = useRef<HTMLDivElement>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);

    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

    const resizeCanvas = () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const rect = parentRef.current!.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        // 用容器的实际像素作为 canvas 内部尺寸
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        // 确保绘图 API 按 CSS px 来计算
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const drawCanvas = () => {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;
        const particles = createParticles(100, canvas);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (graphType === "spectrum") {
                DrawSpectrum(analyserRef.current, dataArray, ctx, canvas, bufferLength);
            } else if (graphType === "waveform") {
                DrawWaveform(analyserRef.current, dataArray, ctx, canvas, bufferLength);
            } else if (graphType === "circular") {
                DrawCircularSpectrum(analyserRef.current, dataArray, ctx, canvas, bufferLength, circularType);
            } else if (graphType === "particle") {
                DrawParticles(analyserRef.current, dataArray, ctx, canvas, bufferLength, particles);
            }
        };

        draw();
    }

    const setSize = () => {
        let analyser = analyserRef.current;
        if (analyser) {
            if (graphType === "spectrum") {
                analyserRef.current.fftSize = spectrumSize;
            } else if (graphType === "waveform") {
                analyserRef.current.fftSize = waveformSize;
            } else if (graphType === "circular") {
                analyserRef.current.fftSize = circularSize;
            } else if (graphType === "particle") {
                analyserRef.current.fftSize = particleSize;
            }
        }
    }

    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
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

        setSize();
        drawCanvas();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            //audioContext.close();
        };
    }, [audio]);

    useEffect(() => {
        setSize();
        if (analyserRef.current) {
            drawCanvas();
        }
    }, [graphType, waveformSize, spectrumSize, circularSize, particleSize, circularType])

    const settingPanel = (
        <Row style={{width: 200}} gutter={[0, 10]}>
            <Col span={10}>Spectrum</Col>
            <Col span={14}>
                <Radio.Group value={spectrumSize} onChange={e=>setSpectrumSize(e.target.value)} block size="small" optionType="button" buttonStyle="solid"
                    options={[{label: '256', value: 256},{label: '1024', value: 1024}]}/>
            </Col>
            <Col span={10}>Waveform</Col>
            <Col span={14}>
                <Radio.Group value={waveformSize} onChange={e=>setWaveformSize(e.target.value)} block size="small" optionType="button" buttonStyle="solid"
                    options={[{label: '1024', value: 1024},{label: '2048', value: 2048}]}/>
            </Col>
            <Col span={10}>Circular</Col>
            <Col span={14}>
                <Radio.Group value={circularType} onChange={e=>setCircularType(e.target.value)} block size="small" optionType="button" buttonStyle="solid"
                    options={[{label: 'inner', value: 1},{label: 'outer', value: 2}]}/>
            </Col>
        </Row>
    )

    return (
        <div ref={parentRef} style={{width: '100%', height: '100%', boxSizing: "border-box", position: 'relative' }}>
            <div style={{position: "absolute", top: 0, right: 12}}>
                <Popover content={settingPanel} placement="leftTop">
                    <Button type="primary" ghost style={{ flexShrink: 0, marginLeft: 12}} icon={<EllipsisOutlined />}/> 
                </Popover>
            </div>
            <canvas ref={canvasRef} height={300} width={2400} style={{ width: "100%", height: '100%' }}/>
        </div>
    )
}

export default Component;
