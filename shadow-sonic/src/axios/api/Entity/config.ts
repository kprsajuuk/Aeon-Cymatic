import api from '../../api';
import { baseUrl } from '../../name';
import { IPage } from '../../interface';

/** 获取配置
 * @returns Promise
 */
const get获取配置 = () => api.get(`${baseUrl}/common/getConfig`);

/** 更新配置
 * @param data 配置
 * @returns Promise
 */
const post更新配置 = (data: any) => api.post(`${baseUrl}/common/updateConfig`, data);

export {
    get获取配置, 
    post更新配置,
}