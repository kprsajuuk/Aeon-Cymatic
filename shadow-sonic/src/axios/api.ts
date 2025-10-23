import { notification, Modal } from 'antd'; //for error notification
import axios, { type AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { type MyResponseType } from './interface';
//import store from '@/redux/store';
//import { sessionTimeOut } from '@/redux/action';

let ongoingRequest: any = {};
let logoutModal: any = undefined;

const axiosApi = axios.create({
    baseURL: import.meta.env.BASE_API,
    timeout: 10000,
    paramsSerializer: {
        serialize: params => qs.stringify(params),
    }
});

axiosApi.defaults.headers['Content-type'] = 'application/json';
//axiosApi.defaults.transformRequest = data => data;

const errorInfo = (url: string, content: string) => {
    notification['error']({
        message: 'request error',
        description: content,
    });
}

const warningInfo = (url: string, content: string) => {
    // message.warning(content)
    notification['warning']({
        message: '操作中断',
        description: content,
    });
}

// 为了省事就没用redux加，直接放在这里了
// 由于登陆页面会发生跳转，所以会重载api文件导致刷新logoutModal因此不会有问题；理应在返回登陆页面前清空logoutModal
const loginRequired = () => {
    if (logoutModal) return;
    let currentUrl = window.location.href;
    setTimeout(() => { window.location.href = `/login?link=${currentUrl}` }, 3000);
    let count = 3;
    logoutModal = Modal.warning({
        title: `未登录`,
        content: `${count} 秒后跳转到登录页面`,
        okText: '立即返回登录页',
        onOk() { window.location.href = `/login?link=${currentUrl}` }
    })
    setInterval(() => {
        count = count - 1 >= 0 ? count - 1 : 0;
        logoutModal.update({ content: `${count} 秒后跳转到登录页面` })
    }, 1000);
}


//发送请求
axiosApi.interceptors.request.use((config: any) => {
    let token = config?.url// + qs.stringify(config?.params);
    if (token) {
        if (ongoingRequest[token]) {
            //ongoingRequest[token].abort();
        }
        let controller = new AbortController();
        ongoingRequest[token] = controller;
        config.signal = controller.signal;
        return config;
    }
}, error => {
    return Promise.reject(error);
})

//请求结果
axiosApi.interceptors.response.use(response => {
    let token = response?.config?.url || ""// + qs.stringify(response?.config?.params);
    delete ongoingRequest[token];
    const res = response.data;
    if (res.success) {
        return Promise.resolve(response);
    }
    const statusCode = res?.status;
    switch (statusCode) {
        case -1:
            errorInfo(token, res?.message ? `${res?.message}` : `error - unknown issue`)
            return Promise.reject(response);
        default:
            errorInfo(token, res?.message ? `${res?.message}` : `error - unknown issue`)
            return Promise.reject(response);
    }
}, error => {
    if (axios.isCancel(error)) {
        console.log("request canceled");
        //接口调用被覆盖
    } else {
        // 请求异常
        let token = error?.config?.url// + qs.stringify(error?.config?.params);
        delete ongoingRequest[token];
        let data = error.response.data;
        errorInfo(error.config.url, data.message ? data.message : `error code: ${error.response.status}`)
    }
    return Promise.reject(error);
})

export default class api {
    static get = <T = any>(url: string, config?: AxiosRequestConfig<any>) => axiosApi.get<MyResponseType<T>>(url, config);
    static delete = <T = any>(url: string, config?: AxiosRequestConfig<any>) => axiosApi.delete<MyResponseType<T>>(url, config);

    static post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>) => axiosApi.post<MyResponseType<T>>(url, data, { ...config });
    static put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>) => axiosApi.put<MyResponseType<T>>(url, data, { ...config });
    static patch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>) => axiosApi.patch<MyResponseType<T>>(url, data, { ...config });
}
