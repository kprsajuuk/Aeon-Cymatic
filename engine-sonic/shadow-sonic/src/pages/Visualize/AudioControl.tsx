import { Button, Progress, Popover, Slider, Tooltip, Select, Space, Upload, Switch, Menu } from "antd";
import { CaretRightOutlined, PauseOutlined, MutedOutlined, SettingOutlined, UploadOutlined, MutedFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { GetDuration } from '@/common/utils';

function Component(props){
    const { 
        paused=true, current=0, duration=10, volume=50, graphType="basic", visual, loop,
        onGraphTypeChange=()=>{}, onSwitchPlay=()=>{}, onAudioFile=()=>{}, onVolumnChange, onLoopChange, onVisualChange
    } = props;
    const [visible, setVisible] = useState(false);
    const [fileName, setFileName] = useState("未选择文件");

    const onPlay = () => {
        onSwitchPlay();
    }
    
    const Volume = (
        <div style={{height: 100}}>
            <Slider style={{height: '100%'}} vertical value={volume} onChange={onVolumnChange}/>
        </div>
    );

    const menuItems = [
        // {label: "下载", key: "download", onClick: onDownload, disabled: !audioSource },
        {label: <div><Space>循环<Switch checked={loop} onChange={onLoopChange}/></Space></div>, key: "loopBtn"},
        {label: <div><Space>效果<Switch checked={visual} onChange={onVisualChange}/></Space></div>, key: "visualBtn"},
    ]

    const graphTypeList = [
        {label: "spectrum", value: "spectrum"}, 
        {label: "waveform", value: "waveform"}, 
        {label: "basic2", value: "basic2"}, 
    ]

    return (
        <div style={{width: '100%', boxSizing: "border-box", background: '#ffffff11', padding: "6px 12px", display: 'flex', alignItems: 'center'}}>
            <Upload maxCount={1} accept="audio/*" showUploadList={false}
                beforeUpload={(file) => {
                    setFileName(file.name)
                    onAudioFile(URL.createObjectURL(file))
                    return false;
                }}>
                <Tooltip title="Select audio file"><Button style={{flexShrink: 0}} icon={<UploadOutlined />} shape="round"/></Tooltip>
            </Upload>

            <Tooltip title={fileName}>
                <div style={{flexShrink: 0, marginLeft: 12, width: 120}}>
                    <div className="ellipsis">{fileName}</div>
                </div>
            </Tooltip>

            <Button shape="circle" onClick={onPlay} size='small' type="primary" //disabled={!audioSource}
                style={{flexShrink: 0, marginLeft: 12}} icon={paused ? <CaretRightOutlined /> : <PauseOutlined />} />

            <div style={{marginLeft: 12, flexShrink: 0}}>{GetDuration(current, 'seconds')}/{GetDuration(duration, 'seconds')}</div>

            <Progress strokeColor="#faad14" style={{marginLeft: 20, width: '100%'}} percent={100*current/duration} showInfo={false} size={{height: 10}}/>
            
            <Select style={{width: 100, marginLeft: 12, flexShrink: 0}} options={graphTypeList} value={graphType} onChange={onGraphTypeChange}/>

            <Popover placement="bottom" content={Volume}>
                <MutedFilled style={{color:"#faad14", cursor: 'pointer', flexShrink: 0, marginLeft: 12}}/>
            </Popover>

            <Popover content={<Menu items={menuItems} />} open={visible} onOpenChange={v=>setVisible(v)}>
                <Button style={{ flexShrink: 0, marginLeft: 12}} icon={<SettingOutlined />}/> 
            </Popover>
        </div>
    )
}

export default Component;
