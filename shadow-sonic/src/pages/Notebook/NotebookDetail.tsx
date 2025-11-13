import { Button, Row, Col, Select, Form, message, Spin, Switch, Divider, Affix } from "antd";
import * as Tone from "tone";
import { useState, useEffect, useRef } from "react";
import style from "./Notebook.module.scss";
import { PlayCircleOutlined, PauseCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { NoteForm } from "./NoteForm";
import { putEditNote, putEditNoteScore, getNoteById } from "@/axios/api/Entity/note";
import { piano, guitar, violin } from "./SynthFunction";
import { generateMidiFromNoteBook } from "./generateMidi";

import NumberSlider from "@/pages/GeneralComponent/NumberSlider";

const keyConfig = [
    {name: 'C', type: 1}, {name: 'C#', type: 2}, {name: 'D', type: 1}, {name: 'D#', type: 2},
    {name: 'E', type: 1}, {name: 'F', type: 1}, {name: 'F#', type: 2}, {name: 'G', type: 1},
    {name: 'G#', type: 2}, {name: 'A', type: 1}, {name: 'A#', type: 2}, {name: 'B', type: 1},
];
const scaleNum = 5;
const generateKeyList = () => {
    let list = [];
    for (let i=1; i<scaleNum+1; i++) {
        keyConfig.forEach(item => list.push({ key: item.name + i, type: item.type}))
    }
    return list.reverse();
}

const keyList = generateKeyList();
const cellWidth = 60; 
const cellHeight = 26;

function Component(props){
    const [messageApi, messageContextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [showBasicForm, setShowBasicForm] = useState(false);
    const [form] = Form.useForm();

    const [bar, setBar] = useState({value:4, min: 1, max: 8});
    const [speed, setSpeed] = useState({value:2, min: 1, max: 16});
    const [stepOption, setStepOption] = useState(4);
    const [nodes, setNodes] = useState([]);
    const [instrument, setInstrument] = useState("piano");

    const [dragState, setDragState] = useState(null); 
    const [playStatus, setPlayStatus] = useState({play: false, pos: 0}); 
    const timerRef = useRef(null);
    const fixBtnContainerRef = useRef(null);
    const synth = () => {
        if (instrument === "piano") return piano
        else if (instrument === "guitar") return guitar
        else if (instrument === "violin") return violin
    }

    const { data, onDataUpdate } = props;

    const downloadMidi = () => {
        console.log(nodes);
        generateMidiFromNoteBook(nodes, 120)
        //exportMidi(pattern, bpm.value, bar.value, stepsEachBar.value);
    }

    const onAddNode = (pitch, keyIndex, step) => {
        const newNode = { key: pitch + step, pitch, start: step, duration: 1, noteNumber: keyList.length - keyIndex + 36 };
        if (nodes.find(item => item.key === newNode.key)) return;
        setNodes([...nodes, newNode]);
    };

    const handleMouseDown = (e, i, type) => {
        e.stopPropagation();
        const node = nodes[i];
        setDragState({ 
            index: i, type, startX: e.clientX, startY: e.clientY,
            origStart: node.start, origDuration: node.duration,
            origPitch: node.pitch, origRow: keyToRow(node.pitch),
        });
    };

    const handleMouseMove = (e) => {
        if (!dragState) return;
        const deltaX = e.clientX - dragState.startX;
        const deltaStep = Math.round(deltaX / cellWidth);
        const deltaY = e.clientY - dragState.startY;
        const deltaRow = Math.round(deltaY / cellHeight);
        setNodes((prev) => {
            const updated = [...prev];
            const node = { ...updated[dragState.index] };
            if (dragState.type === "left") {
                node.start = Math.max(0, dragState.origStart + deltaStep);
                node.duration = Math.max(1, dragState.origDuration - deltaStep);
            } else if (dragState.type === "right") {
                node.duration = Math.max(1, dragState.origDuration + deltaStep);
            } else if (dragState.type === "move") {
                node.start = Math.max(0, dragState.origStart + deltaStep);
                let newRow = dragState.origRow + deltaRow;
                newRow = Math.min(Math.max(newRow, 0), keyList.length - 1);
                node.pitch = keyList[newRow].key;
            }
            node.key = node.pitch + node.start
            updated[dragState.index] = node;
            return updated;
        });
    };

    

    const handleMouseUp = () => {
        setDragState(null);
    };

    const fetchDetail = () => {
        setLoading(true)
        getNoteById(data.id).then((res:any) => {
            if (res.data.success) {
                let str = res.data.data?.score;
                let scoreData = JSON.parse(str);
                if (scoreData) {
                    scoreData.bar && setBar({...speed, value: scoreData.bar.value})
                    scoreData.speed && setSpeed({...speed, value: scoreData.speed.value})
                    scoreData.instrument && setInstrument(scoreData.instrument)
                    setStepOption(scoreData.stepOption)
                    setNodes(scoreData.score)
                }
            }
        }).finally(()=>setLoading(false))
    }

    useEffect(() => {
        if (dragState) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
        
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragState]);

    useEffect(() => {
        if (data && data.id) {
            fetchDetail();
            form.setFieldsValue({...data, tags: data.tags ? data.tags.split(",") : []});
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    useEffect(() => {
        if (playStatus.play) {
            onPlay();
        } else {
            onStop();
        }
    }, [playStatus.play]);
    
    const stepList = () => {
        let list = [];
        for (let i=0; i< bar.value * stepOption; i++) {
            list.push(i);
        }
        return list;
    }

    const keyToRow = (pitch) => {
        return keyList.findIndex((k) => k.key === pitch);
    };

    const onNoteFormFinish = (values) => {
        setLoading(true)
        values.tags = values.tags.join(",")
        putEditNote(data.id, values).then((res:any) => {
            if (res.data.success) {
                messageApi.info("update success");
                props.onDataUpdate(data.id, values);
            }
        }).finally(()=>setLoading(false))
    }

    const onBlockDelete = (index) => {
        nodes.splice(index, 1);
        setNodes([...nodes]);
    }

    const saveScore = () => {
        setLoading(true)
        let scoreData = { bar, speed, instrument, stepOption, score: nodes }
        putEditNoteScore(data.id, JSON.stringify(scoreData)).then((res:any) => {
            if (res.data.success) {
                messageApi.info("save success");
            }
        }).finally(()=>setLoading(false))
    }

    const onKeyPlay = (key) => {
        const now = Tone.now();
        synth().triggerAttackRelease(key, "8n", now);
    }

    const onClickPlay = () => {
        setPlayStatus({...playStatus, play: !playStatus.play})
    }

    const onPlay = async () => {
        await Tone.start(); // 确保用户交互解锁音频上下文
        const transport = Tone.getTransport();
        transport.cancel();
        transport.stop();
        transport.position = 0;
        
        if (!nodes || nodes.length === 0) return;

        let list = nodes.sort((a, b) => a.start - b.start);
        let timeKey = {};
        list.forEach(item => {
            if (!timeKey[item.start]) {
                timeKey[item.start] = [{ pitch: item.pitch, duration: item.duration }];
            } else {
                timeKey[item.start].push({ pitch: item.pitch, duration: item.duration });
            }
        });
        let gridDuration = 1 / speed.value
        for (let key in timeKey) {
            const relativeStart = Number(key);
            const startTime = relativeStart * gridDuration;
            const notes = timeKey[key];
            const pitches = notes.map(n => n.pitch);
            const minDuration = Math.min(...notes.map(n => n.duration)) * gridDuration;

            transport.scheduleOnce((time) => {
                synth().triggerAttackRelease(pitches, minDuration, time);
            }, startTime);
        }
        timerRef.current = setInterval(() => {
            setPlayStatus(prev => {
                if (prev.pos >= bar.value*stepOption * cellWidth) {
                    onStop();
                    return {play: false, pos: 0}
                } else {
                    return {play: prev.play, pos: prev.pos + speed.value * cellWidth / 10}
                }
            })
        }, 100)
        transport.start();
    };

    const onStop = () => {
        if (timerRef.current) clearInterval(timerRef.current)
        setPlayStatus({play: false, pos: 0})
        const transport = Tone.getTransport();
        transport.cancel();
        transport.stop();
        transport.position = 0;
    };
    
    const stepOptions = [
        { label: "Triple", value: 6},
        { label: "Quarter", value: 4},
    ]
    const instrumentOptions = [
        { label: "Piano", value: "piano"},
        { label: "Guitar", value: "guitar"},
        { label: "Violin", value: "violin"},
    ]

    return (
        <div className={style.noteDetail}>
            <Spin spinning={loading}>
            {messageContextHolder}
            <div className={style.infoPanel}>
                <div style={{display: showBasicForm ? "block":'none'}}>
                    <NoteForm name="editNote" form={form} onFinish={onNoteFormFinish}/>
                </div>
                <div style={{position: 'absolute', top: 16, right: 16}}>
                    Basic Info
                    <Switch style={{marginLeft: 12}} checked={showBasicForm} onChange={v=>setShowBasicForm(v)}/>
                </div>
            </div>
            <div className={style.config} style={{marginBottom: 0}}>
                <Row gutter={[20,20]} >
                    <Col span={12}>
                        <div className={style.subTitle}>Bar</div>
                        <NumberSlider value={bar.value} min={bar.min} max={bar.max} onChange={v=>setBar({...bar, value:v})}/>
                    </Col>
                    <Col span={12}>
                        <div style={{textAlign: 'right'}}>
                            <Button onClick={downloadMidi} style={{marginRight: 12}} icon={<DownloadOutlined />}>Download MIDI</Button>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={style.subTitle}>Speed</div>
                        <NumberSlider value={speed.value} min={speed.min} max={speed.max} onChange={v=>setSpeed({...speed, value:v})}/>
                    </Col>
                    <Col span={12}></Col>
                    <Col span={6}>
                        <div className={style.subTitle}>Mode</div>
                        <Select options={stepOptions} value={stepOption} onChange={v=>setStepOption(v)} style={{width: 120, marginTop: 12}}/>
                    </Col>
                    <Col span={6}>
                        <div className={style.subTitle}>Instrument</div>
                        <Select options={instrumentOptions} value={instrument} onChange={v=>setInstrument(v)} style={{width: 120, marginTop: 12}}/>
                    </Col>
                    <Col span={12}>
                        <div className={style.subTitle} style={{textAlign: 'right', height: 24}}></div>
                        <div style={{textAlign: 'right', marginTop: 12}}>
                            <Button icon={playStatus.play ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={onClickPlay} style={{marginRight: 12}}>{playStatus.play ? "Stop" : "Play"}</Button>
                            <Button type="primary" onClick={saveScore} style={{marginRight: 12}}>Save</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            
            <div className={style.notebookContainer}>
                <div style={{width: '100%', height: 0, textAlign: 'right'}} ref={fixBtnContainerRef}>
                    <Affix offsetTop={10} target={()=>props.scrollContainer.current}>
                    <Button type="primary" style={{right: -40}} icon={playStatus.play ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={onClickPlay}/>
                    </Affix>
                </div>
                <div className={style.notebook}>
                    <div className={style.keyColumn}>
                        {keyList.map((row, index) => (
                            <div className={style.row} key={index}>
                                <div onClick={()=>onKeyPlay(row.key)} style={{height: cellHeight, lineHeight: cellHeight+"px"}} className={`${style.key} ${row.type===1?style.white:style.black}`}>{row.key}</div>
                            </div>
                        ))}
                    </div>
                    <div className={style.midiBox}>
                        <div className={style.topIndex}>{stepList().map(item => <div className={style.text} style={{width: cellWidth}} key={item}>{item+1}</div>)}</div>
                        {keyList.map((row, index) => (
                            <div className={style.row} key={index}>
                                {stepList().map((node, i) => (
                                    <div onDoubleClick={()=>onAddNode(row.key, index, i)} style={{width: cellWidth, height: cellHeight}} className={`${style.node} ${i % (stepOption*2) < stepOption ? style.dark : style.light}`} key={node}/>
                                ))}
                            </div>
                        ))}

                        <div className={style.nodesOverlay}>
                            {nodes.map((node, index) => (
                                <div key={index} className={style.nodeBlock} onDoubleClick={()=>onBlockDelete(index)}
                                    onMouseDown={(e) => handleMouseDown(e, index, "move")}
                                    style={{ left: node.start * cellWidth, top: keyToRow(node.pitch) * cellHeight + 20,
                                        width: node.duration * cellWidth, height: cellHeight, lineHeight: "26px"
                                    }}>
                                    <span className={style.pitch}>{node.pitch}</span>
                                    <div className={style.leftSide} onMouseDown={(e) => handleMouseDown(e, index, "left")}/>
                                    <div className={style.rightSide} onMouseDown={(e) => handleMouseDown(e, index, "right")}/>
                                </div>
                            ))}
                            <div className={style.indicator} style={{left: playStatus.pos}}/>
                        </div>
                    </div>
                </div>
            </div>
            </Spin>
        </div>
    )
}

export default Component;
