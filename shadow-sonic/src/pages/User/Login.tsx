import { Col, Form, Input, Checkbox, Button, message } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { postLogin } from '@/axios/api/User/User';
import style from "./Login.module.scss";
//import bg1 from "@/assets/img/login-bg.png";
//import bg2 from "@/assets/img/login-graph.png";
import { useState, useEffect } from 'react';

function Component(){
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const onLogin = () => {
        form.validateFields().then(values => {
            postLogin(values.username, values.password).then((res:any)=>{
                window.localStorage.setItem("remember", values.remember);
                if (values.remember) {
                    window.localStorage.setItem("username", values.username);
                } else {
                    window.localStorage.setItem("username", "");
                }
                if (res.data?.status === 0) {
                    //message.success("登录成功")
                    window.location.href = "/code/asset/project";
                } else {
                    message.warning(res.data?.msg || "登录失败") 
                }
            })
        })
    }

    useEffect(()=>{
        let remember = window.localStorage.getItem("remember");
        if (remember) {
            form.setFieldsValue({username: window.localStorage.getItem("username")||"", remember: remember})
        }
    }, [])

    return (
        <div className={style.loginContainer}>
            <div className={style.loginWrap} style={{  }}>
                <div className={[style.content, style.boxShadow, 'card'].join(' ')} style={{ background: 'inherit' }}>
                    <div className={[style.form, style.boxShadow, 'card'].join(' ')}>
                        <div className={style.wrapper}>
                            <div className={style.toolName} style={{fontSize: 26, marginBottom: 12}}>工具</div>
                            <div className={style.title}>用户登录</div>
                            <div className={style.sub}>USER LOGIN</div>
                            <Form form={form} name='userLogin' style={{ position: 'relative' }}>
                                <Form.Item name="username" className={style.inputRow} rules={[{ required: true, message: '请输入用户名' }]}>
                                    <Input size='large' prefix={<UserOutlined className={style.icon} />} placeholder='用户名' className={style.input}
                                        onPressEnter={onLogin} />
                                </Form.Item>
                                <Form.Item name="password" className={style.inputRow} rules={[{}]}>
                                    <Input.Password size='large' prefix={<KeyOutlined className={style.icon} style={{ transform: 'rotateY(180deg)' }} />} placeholder='密码' className={style.input}
                                        onPressEnter={onLogin} />
                                </Form.Item>
                                <Form.Item valuePropName="checked" name="remember" className={style.checkboxRow} >
                                    <Checkbox>
                                        <span style={{ color: '#666' }}>记住用户名</span>
                                    </Checkbox>
                                </Form.Item>
                            </Form>

                            <div className={style.actionRow}><Button className={style.loginBtn} type='primary' size='large' onClick={onLogin} loading={loading}>登录</Button></div>
                            {/* <div style={{ marginBottom: 12, color: '#666' }}>还没有账号？立即注册!</div> */}
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}></div>
            </div>
            <div className={style.footer}>Copyright &#169; --</div>
        </div>
    )
}

export default Component