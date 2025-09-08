//import { get登录状态, post注销 } from '@/axios/api/Session';
import { CaretDownOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Modal, Switch, Tooltip, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useEffect, useState } from "react";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { postLogout } from '@/axios/api/User/User';
import logo from "@/assets/img/favicon.ico";
import style from './Header.module.scss';

const items: MenuProps['items'] = [
    //{ label: '系统设置', key: '5' },
];
const labelList = [
    {label: "注销", key: "logout"},
]


function Component(){
    const location = useLocation();
    const [creOpen, setCreOpen] = useState(false);
    const [menuActive, setMenuActive] = useState("0");
    const onJump = (key:string) => {
        if (key === "1") {
            window.location.href="/code/asset/project";
        } else if (key === '2') {
            window.location.href="/code/task/center";
        } else if (key === '3') {
            window.location.href="/code/system/config";
        } else if (key === '4') {
            window.location.href="/code/manage/user";
        } else if (key === '5') {
            window.location.href="/code/report/center";
        } else if (key === '11') {
            window.location.href="/code/hub/main";
        }
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
            case "cre":
                setCreOpen(true)
                return;
            case "logout":
                onLogout();
                return;
            default:
                break;
        }
    }

    useEffect(() => {
        const path = location.pathname;
        switch(path){
            case "/code/asset/project":
                setMenuActive("1");
                break;
            case "/code/task/center":
                setMenuActive("2");
                break;
            case "/code/system/config":
                setMenuActive("3");
                break;
            case "/code/manage/user":
                setMenuActive("4");
                break;
            case "/code/report/center":
                setMenuActive("5");
                break;
            case "/code/hub/main":
                setMenuActive("11");
                break;
            default:
                break;
        }
    }, [])
    return (
        <div className={style.container}>
            <div className={style.logo} onClick={()=>{}}>
                <img className={style.img} src={logo} alt="logo" />
                <p className={style.text}>CYMATIC</p>
            </div>
            <div className={style.menu}>
                <Menu className={`headerMenu ${style.menuComponent}`} 
                    selectedKeys={[menuActive]}
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
                <Dropdown menu={{ items: labelList, onClick: onSelect }} >
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
