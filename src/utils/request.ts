import axios from "axios";
import {ElMessage} from "element-plus";

let request =axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

request.interceptors.request.use((config)=>{
    return config
})

request.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    let message = ''
    let status = error.response.status
    switch (status){
        case 401:
            message = 'token失效'
            break
        case 500:
            message = '服务器异常,请联系管理员'
            break
        default:
            message = '网络异常'
            break
    }
    ElMessage({
        message: message,
        type: 'error'
    })
    return Promise.reject(error)
})

export default request