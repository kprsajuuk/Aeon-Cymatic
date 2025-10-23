import { Button, App, Upload, Tabs, Select, List, Form, Row, Col, Tag, Divider, Input, message, Modal } from "antd";
import { UploadOutlined, PauseCircleOutlined, DeleteOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect, useCallback } from "react";
import { getNoteList, postAddNote, deleteNote } from "@/axios/api/Entity/note";
import { NoteForm } from "./NoteForm";
import style from "./Notebook.module.scss";
import dayjs from "dayjs";
import NotebookDetail from "./NotebookDetail";

function Component(props){
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeKey, setActiveKey] = useState("list");
    const [tabList, setTabList] = useState([]);

    const fetchList = () => {
        setLoading(true)
        getNoteList({}).then((res:any) => {
            setList(res.data?.data || [])
        }).finally(() => setLoading(false))
    }

    const onTabUpdate = (id, values) => {
        const index = tabList.findIndex((item) => item.id === id);
        if (index >= 0) {
            tabList[index] = {id, ...values}
            setTabList([...tabList])
        }
    }

    const openNote = (record) => {
        const newKey = record.id;
        const targetIndex = tabList.findIndex((item) => item.id === newKey);
        if (targetIndex >= 0) {
            setActiveKey(newKey)
        } else {
            setTabList([ ...(tabList || []), record]);
            setActiveKey(newKey);
        }
    };

    const onEdit = (targetKey: string, action: 'add' | 'remove') => {
        if (action === 'remove') {
            remove(targetKey);
        }
    };

    const remove = (targetKey) => {
        if (!tabList) return;
        const targetIndex = tabList.findIndex((item) => item.id === targetKey);
        const newItems = tabList.filter((item) => item.id !== targetKey);

        if (newItems.length && targetKey === activeKey) {
            const newActiveKey = newItems[targetIndex === newItems.length ? targetIndex - 1 : targetIndex].id;
            setActiveKey(newActiveKey);
        } else {
            onSwitchList();
        }
        setTabList(newItems);
    };

    const onDetail = (record) => {
        openNote(record)
    }

    const onTabChange = (tab) => {
        if (tab === "list") {
            onSwitchList();
        } else {
            setActiveKey(tab)
        }
    }

    const onSwitchList = () => {
        setActiveKey("list");
        fetchList();
    }

    const NoteList = (
        <List grid={{gutter: [30, 14], column: 4 }} dataSource={list} rowKey={(item:any)=>item.id} loading={loading}
            renderItem={(item) => <List.Item><ListItem data={item} onUpdate={onSwitchList} onDetail={onDetail}/></List.Item>}/>
    )

    const tabItems = [
        {label: "Note List", key: "list", children: NoteList, closable: false},
        ...tabList.map(item => {
            return { label: item.name, key: item.id, children: <NotebookDetail id={item.id} data={item} onDataUpdate={onTabUpdate} scrollContainer={props.scrollContainer}/> }
        }),
        {label: "+", key: "add", children: <NewNotebook onUpdate={onSwitchList}/>, closable: false},
    ]

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className={style.main}>
            <div className={style.container} style={{width: '100%', height: '100%', maxWidth: 1000, margin: "0 auto"}}>
                <Tabs items={tabItems} hideAdd type="editable-card" onEdit={onEdit} activeKey={activeKey} onChange={v=>onTabChange(v)}/>
            </div>
        </div>
    )
}

export default Component;

function ListItem(props){
    const { data, onDetail, onUpdate } = props;
    const [modal, modalContextHolder] = Modal.useModal();
    const [messageApi, messageContextHolder] = message.useMessage();

    const tags = data.tags? data.tags.split(",") : []
    const onOpenDetail = () => {
        onDetail(data);
    }

    const onDelete = () => {
        modal.confirm({
            title: "Delete Note",
            content: `${data.name} will be deleted`,
            onOk: () => {
                deleteNote({id: data.id}).then((res:any) => {
                    if (res.data.success) {
                        messageApi.info("delete success");
                        onUpdate();
                    }
                })
            }
        })
    }

    return (
        <div className={style.noteCard} >
            {messageContextHolder}
            {modalContextHolder}
            <div className={style.infoRow}>
                <div className={style.title}><span className="link" onClick={onOpenDetail}>{data.name}</span></div>
                <div className={style.time}>{dayjs(data.created_at).format("YYYY-MM-DD")}</div>
            </div>
            {tags.length > 0 &&
            <div style={{borderTop: "1px solid #faad1466", padding: "4px 10px 6px 10px"}}>
                {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>}
            <div className={style.actionRow}>
                <Row>
                    <Col span={8} className={style.btnCol}></Col>
                    <Col span={8} className={style.btnCol} style={{borderLeft: '1px solid #111', borderRight: '1px solid #111'}}></Col>
                    <Col span={8} className={style.btnCol} onClick={onDelete}><DeleteOutlined /></Col>
                </Row>
                
            </div>
            
        </div>
    )
}

function NewNotebook(props) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const { onUpdate } = props;

    const onFinish = () => {
        form.validateFields().then(values => {
            values.tags = (values.tags || []).join(",")
            postAddNote(values).then((res:any) => {
                if (res.data.success) {
                    messageApi.info('Success');
                    form.resetFields();
                    onUpdate()
                }
            })
        })
    }
    
    return (
        <div style={{ maxWidth: 500 }}>
            {contextHolder}
            <Divider>New Midi Notebook</Divider>
            <NoteForm name="addNote" form={form} onFinish={onFinish}/>
        </div>
    )
}
