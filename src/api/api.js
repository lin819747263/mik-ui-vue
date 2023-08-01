import { request } from './axios.ts'
/**
 * @description -封装User类型的接口方法
 */
export class UserService {       // 模块一
    /**
     * 分页获取用户
     * @param params 参数
     * @returns 
     */
    static async listUserPage(params) {
        return request('/user/listUserPage',params, 'post')
    }
    
}