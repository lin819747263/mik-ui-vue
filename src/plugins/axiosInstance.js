//axiosInstance.js
//导入axios
import axios from 'axios'

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const API = axios.create({
	baseURL:'http://localhost:8888', //请求后端数据的基本地址，自定义
	timeout: 2000                   //请求超时设置，单位ms
})


const $get = (url, param)=>{
    return new Promise((resolve, reject) => {
        API({
            url: url,
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
            params: param,
          }).then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}

const $post = (url, param)=>{
    return new Promise((resolve, reject) => {
        API({
            url: url,
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            params: param,
          }).then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}

//导出我们建立的axios实例模块，ES6 export用法
// export default API

export {API, $post, $get}
