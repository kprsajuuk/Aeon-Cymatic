import api from '../../api';
import { baseUrl } from '../../name';
import { IPage } from '../../interface';

/** 获取仓库列表
 * @param params 分页排序筛选
 */
const get仓库列表 = (params: IPage) => api.get(`${baseUrl}/project/getAllProject`, { params });

/** 获取仓库详情
 * @param id 仓库id
 */
const get仓库详情 = (id: string) => api.get(`${baseUrl}/project/findByProjectId`, { params: {projectId: id} });

/** 获取仓库最新状态
 */
const get刷新仓库 = (projectId) => api.get(`${baseUrl}/project/updateProjectRepo`, { params: {projectId} });

/** 获取仓库分支
 */
const get仓库分支 = (params) => api.get(`${baseUrl}/branch/findAllByProjectId`, { params });

/** 获取分支提交
 */
const get分支提交 = (params) => api.get(`${baseUrl}/branchCommit/findAllByBranchId`, { params });

/** 创建仓库
 * @param data 仓库信息
 */
const post创建仓库 = (data) => api.post(`${baseUrl}/project/createProject`, data);

/** 删除仓库
 * @param params 包含仓库id
 */
const post删除仓库 = (data) => api.post(`${baseUrl}/project/delete`, data);


/** 获取仓库历史检测
 */
const get历史检测 = (params) => api.get(`${baseUrl}/project/findCheckTimesByProjectId`, { params });

/** 获取仓库历史检测
 */
const get检测分支 = (params) => api.get(`${baseUrl}/project/findCheckBranchNumByProjectId`, { params });

/** 获取仓库历史检测
 */
const get用户列表 = (params) => api.get(`${baseUrl}/project/findUserCommitInfoByBranchId`, { params });

/** 获取仓库历史检测
 */
const get提交趋势 = (params) => api.get(`${baseUrl}/project/findBranchCommitTimes`, { params });


export {
    get仓库列表,
    get仓库详情,
    post创建仓库,
    get刷新仓库,
    get仓库分支,
    get分支提交,
    post删除仓库,

    get历史检测,
    get检测分支,
    get用户列表,
    get提交趋势
}