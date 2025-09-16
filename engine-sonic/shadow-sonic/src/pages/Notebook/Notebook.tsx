import { Button, Card, Upload, Tabs, Select, List, Table, Row, Col, Divider } from "antd";
import { UploadOutlined, PauseCircleOutlined, PlayCircleOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from "react";
import style from "./Notebook.module.scss";

function Component(){
    const [list, setList] = useState([1]);

    const columns = [
        {title: '歌曲名', dataIndex: 'name', key: 'name'},
        {title: '歌曲名', dataIndex: 'name', key: 'name'},

    ]
    const NoteList = (
        <List grid={{column: 4}} dataSource={list}
            renderItem={(item) => <ListItem data={item}/>}/>
    )
    const tabItems = [
        {label: "Note List", key: "list", children: NoteList}
    ]

    return (
        <div className={style.main}>
            <div className={style.container} style={{width: '100%', height: '100%', maxWidth: 1000, margin: "0 auto"}}>
                <Tabs items={tabItems} type="card"/>
            </div>
        </div>
    )
}

export default Component;

function ListItem(props){
    const { data } = props;

    return (
        <div style={{background: "#999"}}>
            <div>Notebook 1</div>
            <div>创建时间</div>
        </div>
    )
}