import api from '../../api';
import { baseUrl } from '../../name';
import { type IPage } from '../../interface';

const postLogin = (user: string, pass: string) => api.post(`${baseUrl}/login`, { 
    username: user, password: pass, verifyCode: undefined, forceLogin: false 
});

const postLogout = () => api.post(`${baseUrl}/logout`);

export {
    postLogin,
    postLogout
}