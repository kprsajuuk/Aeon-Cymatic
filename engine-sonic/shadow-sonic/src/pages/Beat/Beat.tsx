import { Button, Card, Typography, InputNumber, Select, Slider, Table, Row, Col, Divider } from "antd";
import { useState } from "react";
import { exportMidi, getPattern } from "./generateBeatMidi";
import style from "./Beat.module.scss";

const { Title } = Typography;

const instruments = [
    { name: "Kick", note: 36 },
    { name: "Snare", note: 38 },
    { name: "Closed Hi-Hat", note: 42 },
    { name: "Open Hi-Hat", note: 46 },
    { name: "Tom Low", note: 45 },
];

function Component(){
    const [bpm, setBpm] = useState({value:120, min: 60, max: 200});
    const [bar, setBar] = useState({value:4, min: 1, max: 16});
    const [complexity, setComplexity] = useState({value:5, min: 1, max: 16});
    const [stepsEachBar, setStepsEachBar] = useState({value:16, min: 1, max: 32});
    const [rhyStyle, setRhyStyle] = useState("simple");

    const [pattern, setPattern] = useState([]);
    const baseChance = 0.2 + (complexity.value * 0.05);

    const rhyStyleOptions = [
        { label: "简单节奏", value: "simple"},
        { label: "摇滚节奏", value: "rock"},
        { label: "爵士节奏", value: "jazz"},
        { label: "完全随机", value: "random"},
    ]

    const downloadMidi = () => {
        exportMidi(pattern, bpm, bar);
        //generateBeatMidi(bpm);
    }

    const generatePattern = () => {
        let totalSteps = bar.value * stepsEachBar.value;
        let newPattern = getPattern(rhyStyle, instruments, totalSteps, baseChance)
        setPattern(newPattern);
    };

    return (
        <div className={style.main}>
            <div className={style.container} style={{width: 800, margin: "0 auto"}}>
                <div className={style.box}>
                    <div className={style.title}>节奏</div>
                    <div className={style.subTitle}>BPM</div>
                    <NumberSlider value={bpm.value} min={bpm.min} max={bpm.max} onChange={v=>setBpm({...bpm, value: v})}/>
                </div>

                <div className={style.box}>
                    <div className={style.title}>配置</div>
                    <Row gutter={[20,20]}>
                        <Col span={12}>
                            <div className={style.subTitle}>小节</div>
                            <NumberSlider value={bar.value} min={bar.min} max={bar.max} onChange={v=>setBar({...bar, value:v})}/>
                            <div className={style.subTitle}>每小节steps</div>
                            <NumberSlider value={stepsEachBar.value} min={stepsEachBar.min} max={stepsEachBar.max} onChange={v=>setStepsEachBar({...stepsEachBar, value: v})}/>
                            
                        </Col>
                        <Col span={12}>
                            <div className={style.subTitle}>复杂度</div>
                            <NumberSlider value={complexity.value} min={complexity.min} max={complexity.max} onChange={v=>setComplexity({...complexity, value: v})}/>
                            
                        </Col>
                        <Col span={12}>
                            <div className={style.subTitle}>模式</div>
                            <Select options={rhyStyleOptions} value={rhyStyle} onChange={v=>setRhyStyle(v)} style={{width: 120, marginTop: 12}}/>
                        </Col>
                        <Col span={12}>
                            <div className={style.subTitle} style={{textAlign: 'right'}}>操作</div>
                            <div style={{textAlign: 'right', marginTop: 12}}>
                                <Button type="primary" onClick={downloadMidi} style={{marginRight: 12}} disabled={pattern.length===0}>下载 MIDI</Button>
                                <Button type="primary" onClick={generatePattern}>生成 pattern</Button>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
                <Divider/>
                {pattern.length > 0 &&
                <div style={{ padding: "0 12px", display: 'flex'}}>
                    <div style={{flexShrink: 0, width: 110, padding: "6px 0", marginRight: 12, lineHeight: "40px"}}>
                        {pattern.map(element => (
                            <div key={element.name}>{element.name}</div>
                        ))}
                    </div>
                    <div style={{width: '100%', overflow: 'auto', whiteSpace: "nowrap", border: '1px solid #666', padding: 6}}>
                        {pattern.map(element => (
                            <div key={element.name} style={{height: 40}}>
                                {element.steps.map((note, index) => (
                                    <div style={{display: 'inline-block', height: 40}}>
                                        {index !== 0 && index % stepsEachBar.value === 0 &&
                                        <div style={{height: "100%", boxSizing: 'border-box', margin: "0 10px", border: '1px solid gold', display: 'inline-block'}}></div>}
                                        <div style={{width: 30, height: 30,  margin: 5, display: 'inline-block', background: note ? '#faad14': '#ffffff11', cursor: 'pointer'}} key={index}></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Component;

function NumberSlider(props:any){
    const { value=1, max=10, min=1, onChange, addonAfter="" } = props;
    return (
        <div style={{display: 'flex', alignItems: 'center', overflow: 'hidden', padding: "6px 0"}}>
            <div style={{flexShrink: 0, marginRight: 20}}>{props.title}</div>
            <div style={{width: '100%'}}><Slider min={min} max={max} value={value} onChange={onChange}/></div>
            <div style={{flexShrink: 0, width: 110}}><InputNumber value={value} onChange={e=>onChange(e||1)} min={min} max={max} style={{ width: 90, marginLeft: 16 }} addonAfter={addonAfter}/></div>
        </div>
    )
}