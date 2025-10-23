import { InputNumber, Slider } from "antd";

function Component(props:any){
    const { value=1, max=10, min=1, onChange, addonAfter="" } = props;
    return (
        <div style={{display: 'flex', alignItems: 'center', overflow: 'hidden', padding: "6px 0"}}>
            <div style={{flexShrink: 0, marginRight: 20}}>{props.title}</div>
            <div style={{width: '100%'}}><Slider min={min} max={max} value={value} onChange={onChange}/></div>
            <div style={{flexShrink: 0, width: 110}}><InputNumber value={value} onChange={e=>onChange(e||1)} min={min} max={max} style={{ width: 90, marginLeft: 16 }} addonAfter={addonAfter}/></div>
        </div>
    )
}

export default Component