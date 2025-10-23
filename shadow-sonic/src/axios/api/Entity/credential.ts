import api from '../../api';
import { baseUrl } from '../../name';
import { IPage } from '../../interface';

/** 获取凭证列表
 * @param params 分页排序筛选
 */
const get凭证列表 = (params: IPage = {}) => api.get(`${baseUrl}/credential/getAllCredential`, { params });

/** 创建仓库
 * @param data 信息
 */
const post创建凭证 = (data) => api.post(`${baseUrl}/credential/addCredential`, data);

/** 创建仓库
 * @param data 信息
 */
const delete删除凭证 = (params) => api.delete(`${baseUrl}/credential/delete`, {params});

export {
    get凭证列表,
    post创建凭证,
    delete删除凭证,
}