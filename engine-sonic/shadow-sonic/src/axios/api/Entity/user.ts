import api from '../../api';
import { baseUrl } from '../../name';
import { IPage } from '../../interface';

const 用户 = '/user'

/** 增加用户
 * @param data 用户数据(interface待补充)
 * @returns Promise
 */
const post增加用户 = (data: any) => api.post(`${baseUrl}${用户}/createUser`, data);

/** 批量删除用户
 * @param params
 * @returns Promise
 */
const delete批量删除用户 = (params: any) => api.delete(`${baseUrl}${用户}/deleteUser`, { params });

/** 获取用户列表
 * @param config
 * @returns Promise
 */
const get用户列表 = (params) => api.get(`${baseUrl}${用户}/getAllUser`, {params});

/** 更新用户
 * @param param
 * @returns Promise
 */
const put更新用户 = ({ id, roleIds, groupIds }) => api.post(`${baseUrl}${用户}/update`, { id, roleIds, groupIds });

export {
    post增加用户, 
    get用户列表,
    delete批量删除用户,
    //put更新用户
}