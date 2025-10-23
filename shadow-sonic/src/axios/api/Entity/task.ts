import api from '../../api';
import { baseUrl } from '../../name';
import { IPage } from '../../interface';

/** 发起检测
 */
const post发起检测 = (data) => api.post(`${baseUrl}/check`, data);

/** 查看任务列表
 */
const get任务列表 = (params) => api.get(`${baseUrl}/task/getAllTask`, { params });

/** 查看结果
 */
const get检测结果 = (params) => api.get(`${baseUrl}/result/findByTaskId`, { params });

/** 查看结果
 */
const get变更列表 = (params) => api.get(`${baseUrl}/result/findDiffByTaskId`, { params });

/** 查看结果
 */
const get变更函数 = (params) => api.get(`${baseUrl}/result/findCallGraphChange`, { params });

/** 查看结果
 */
const get变更类 = (params) => api.get(`${baseUrl}/result/findClassInfoChange`, { params });


/** 查看结果
 */
const get文件树 = (params) => api.get(`${baseUrl}/result/getFileTree`, { params });

/** 查看结果
 */
const get行数变化 = (params) => api.get(`${baseUrl}/result/getFileCompare`, { params });

/** 查看结果
 */
const get类信息 = (taskId) => api.get(`${baseUrl}/result/findClassInfoByTaskId`, { params: { taskId } });

/** 查看结果
 */
const get调用图 = (taskId) => api.get(`${baseUrl}/result/findCallGraphByTaskId`, { params: { taskId } });

/** 查看文件变更图
 */
const get文件变更图 = (taskId, filePath) => api.get(`${baseUrl}/result/findChangeByFile`, { params: { taskId, filePath } });

/** 查看函数调用链
 */
const get函数调用链 = (taskId, id) => api.get(`${baseUrl}/graph/findGraphChain`, { params: { taskId, id } });

/** 查看类调用链
 */
const get类调用链 = (taskId, id) => api.get(`${baseUrl}/class/findClassChain`, { params: { taskId, id } });




/** 查看文件内容，base和target的
 */
const get文件内容 = (taskId, filePath) => api.get(`${baseUrl}/file/findContentByPath`, { params: { taskId, filePath} });

/** 查看函数内容，base和target的
 */
const get函数内容 = (id) => api.get(`${baseUrl}/graph/findGraphContent`, { params: { id } });

/** 查看函数内容，base和target的
 */
const get类内容 = (id) => api.get(`${baseUrl}/class/findClassContent`, { params: { id } });



/** 查看影响链路
 */
const get影响链路列表 = (params) => api.get(`${baseUrl}/graph/findChainByTaskId`, { params });
/** 查看影响链路详情
 */
const get影响链路详情 = (id) => api.get(`${baseUrl}/graph/findChainById`, { params: { id } });
/** 查看影响链路
 */
const get链路文件内容 = (id) => api.get(`${baseUrl}/graph/findGraphChainContent`, { params: { id } });

export {
    get任务列表,
    post发起检测,
    get检测结果,
    get变更类,
    get文件树,
    get行数变化,
    get变更列表,
    get变更函数,
    get类信息,
    get调用图,
    get文件变更图,

    get文件内容,
    get函数内容,
    get类内容,
    get函数调用链,
    get类调用链,

    get影响链路列表,
    get影响链路详情,
    get链路文件内容,
}