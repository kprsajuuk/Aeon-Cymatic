import { Button, Card, Upload, InputNumber, Select, Slider, Table, Row, Col, Divider } from "antd";
import { UploadOutlined, PauseCircleOutlined, PlayCircleOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from "react";
import style from "./Visualize.module.scss";
import AudioControl from "./AudioControl";
import CanvasSpectrum from "./CanvasSpectrum";
import AudioCanvas from "./AudioCanvas";

function Component(){
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [graphType, setGraphType] = useState("spectrum");
    const [paused, setPaused] = useState(true);
    const [loop, setLoop] = useState(false);
    const [effect, setEffect] = useState(true);
    const [volumn, setVolumn] = useState(100);
    const [progress, setProgress] = useState({current: 0, duration: 0});


    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    useEffect(() => {
        if (!audioUrl) return;
        const audio = new Audio(audioUrl);
        audio.volume = volumn/100;
        audioRef.current = audio;

        const updateProgress = () => {
            setProgress({current: audio.currentTime, duration: audio.duration});
        };
        audio.addEventListener("timeupdate", updateProgress);

        return () => {
            audio.pause();
        };
    }, [audioUrl]);

    const onAudioFile = (url) => {
        setPaused(true);
        setAudioUrl(url);
    }

    const changeVolumn = (v) => {
        setVolumn(v)
        if (!audioRef.current) return
        audioRef.current.volume = v/100
    }

    const onSwitchPlay = () => {
        if (!audioRef.current) return;
        if (!paused) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPaused(!paused);
    };

    return (
        <div className={style.main}>
            <div className={style.container} style={{width: '100%', height: '100%'}}>
                <div className={style.control}>
                    <AudioControl onSwitchPlay={onSwitchPlay} paused={paused} onAudioFile={onAudioFile} 
                        current={progress.current} duration={progress.duration} volume={volumn} onVolumnChange={changeVolumn}
                        onLoopChange={setLoop} onVisualChange={setEffect} loop={loop} visual={effect}
                        graphType={graphType} onGraphTypeChange={v=>setGraphType(v)}/>
                </div>
                <div className={style.canvas} style={{display: effect?"block":"none"}}>
                    <AudioCanvas audio={audioRef.current} graphType={graphType}/>
                </div>
            </div>
            
        </div>
    )
}

export default Component;
