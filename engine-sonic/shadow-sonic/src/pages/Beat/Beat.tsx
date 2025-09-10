import { Button, Card, Typography, InputNumber, Select, Slider, Table, Row, Col } from "antd";
import { useState } from "react";
import { exportMidi } from "./generateBeatMidi";
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
    const [bpm, setBpm] = useState(120);
    const [rhyStyle, setRhyStyle] = useState("simple");
    const [bar, setBar] = useState(4);
    const [complexity, setComplexity] = useState(5);

    const [pattern, setPattern] = useState([]);

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
        const stepsPerBar = 16; // 每小节 16 步
        const totalSteps = bar * stepsPerBar;

        const newPattern = instruments.map((inst) => {
        return {
            name: inst.name,
            note: inst.note,
            steps: Array.from({ length: totalSteps }, () =>
            Math.random() * 10 < complexity ? 1 : 0
            ),
        };
        });

        setPattern(newPattern);
    };

    const columns = [
        { title: "Instrument", dataIndex: "name", key: "name" },
        ...Array.from({ length: bar * 16 }, (_, i) => ({
        title: `${i + 1}`,
        dataIndex: `step${i}`,
        key: `step${i}`,
        render: (value) =>
            value === 1 ? <div style={{ color: "red" }}>●</div> : <div>·</div>,
        })),
    ];

    const dataSource = pattern.map((row, i) => {
        const rowData = { key: i, name: row.name };
        row.steps.forEach((val, step) => {
        rowData[`step${step}`] = val;
        });
        return rowData;
    });

    return (
        <div className={style.main}>
            <div className={style.container} style={{width: 800, margin: "0 auto"}}>
                <div className={style.box}>
                    <div className={style.title}>节奏</div>
                    <div className={style.subTitle}>BPM</div>
                    <NumberSlider value={bpm} min={10} max={200} onChange={v=>setBpm(v)}/>
                </div>

                <div className={style.box}>
                    <div className={style.title}>配置</div>
                    <Row gutter={[20,20]}>
                        <Col span={12}>
                            <div className={style.subTitle}>小节</div>
                            <NumberSlider value={bar} min={1} max={16} onChange={v=>setBar(v)}/>
                            
                            <div className={style.subTitle}>模式</div>
                            <Select options={rhyStyleOptions} value={rhyStyle} onChange={v=>setRhyStyle(v)} style={{width: 120, marginTop: 12}}/>
                        </Col>
                        <Col span={12}>
                            <div className={style.subTitle}>复杂度</div>
                            <NumberSlider value={complexity} min={1} max={16} onChange={v=>setComplexity(v)}/>
                            <div className={style.subTitle} style={{textAlign: 'right'}}>操作</div>
                            <div style={{textAlign: 'right', marginTop: 12}}>
                                <Button type="primary" onClick={downloadMidi} style={{marginRight: 12}} disabled={pattern.length===0}>下载 MIDI</Button>
                                <Button type="primary" onClick={generatePattern}>生成 pattern</Button>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
                {pattern.length > 0 && (
                    <Table
                        size="small"
                        pagination={false}
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{ x: true }}
                    />
                )}

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