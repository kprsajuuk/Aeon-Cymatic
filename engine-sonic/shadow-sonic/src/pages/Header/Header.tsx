//import { get登录状态, post注销 } from '@/axios/api/Session';
import { CaretDownOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Modal, Switch, Tooltip, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { postLogout } from '@/axios/api/User/User';
import logo from "@/assets/img/favicon.ico";
import style from './Header.module.scss';

const menuLabel = (label) => (
    <div style={{minWidth: 80, textAlign: 'center'}}>{label}</div>
)
const items: MenuProps['items'] = [
    { label: menuLabel("搜索"), key: 'search' },
    { label: menuLabel("可视化"), key: 'visual' },
    { label: menuLabel("鼓点"), key: 'beat' },
    { label: menuLabel("MIDIbook"), key: 'notebook' },
];
const labelList = [
    {label: "注销", key: "logout"},
]

function Component(){
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const [menuActive, setMenuActive] = useState("0");
    const onJump = (key:string) => {
        navigate(`/cymatic/${key}`); 
    }

    const onLogout = () => {
        postLogout().then(res => {
            setTimeout(() => { window.location.href = '/login' }, 5000);
            let count = 5;
            const modal = Modal.info({
                title: `注销成功`,
                content: `${count} 秒后跳转到登录页面`,
                okText: '立即返回登录页',
                onOk() { window.location.href = '/login' }
            })
            setInterval(() => {
                count = count - 1 >= 0 ? count - 1 : 0;
                modal.update({ content: `${count} 秒后跳转到登录页面` })
            }, 1000);
        })
    }
    
    const onSelect = (item) => {
        switch(item.key){
            case "logout":
                onLogout();
                return;
            default:
                break;
        }
    }

    useEffect(() => {
        switch(path){
            case "/cymatic/search":
                setMenuActive("search");
                break;
            case "/cymatic/beat":
                setMenuActive("beat");
                break;
            case "/cymatic/visual":
                setMenuActive("visual");
                break;
            case "/cymatic/notebook":
                setMenuActive("notebook");
                break;
            default:
                break;
        }
    }, [path])
    
    return (
        <div className={style.container}>
            <div className={style.logo} onClick={()=>{}}>
                <img className={style.img} src={logo} alt="logo" />
                <p className={style.text}>CYMATIC</p>
            </div>
            <div className={style.menu}>
                <Menu className={style.menuComponent} selectedKeys={[menuActive]} style={{maxWidth: '100%'}}
                    onClick={e=>onJump(e.key)} mode="horizontal" items={items}/>
            </div>
            {/* <div className={style.theme}>
                <Switch
                    checkedChildren="日间模式"
                    unCheckedChildren="夜间模式"
                    defaultChecked
                    onChange={(c, e) => {
                        store.dispatch(c ? toLightTheme() : toDarkTheme())
                    }}
                />
            </div> */}
            <div className={style.user}>
                <div className={style.avatar}>
                    <Tooltip title="user">
                        <Avatar style={{ backgroundColor: '#faad14', color: '#333' }} size={36}>U</Avatar>
                    </Tooltip>
                </div>
                <Dropdown menu={{ items: labelList, onClick: onSelect }} placement='bottomRight'>
                    <div className={style.name}>
                        <span className={style.text}>user</span>
                        <CaretDownOutlined className={style.icon} />
                    </div>
                </Dropdown>
            </div>
        </div>
    )
}

export default Component;
