import axios from "axios";

let request =axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

request.interceptors.request.use((config)=>{
    return config
})

request.interceptors.response.use((response)=>{
    let data = response.data
    console.log(data)
    if(data.code != 1){
        let message = data.msg || '请求失败'
        console.error(message)
        ElNotification({
            title: 'ERROR',
            message: message,
            type: 'error'
        })
        return Promise.reject(new Error(message))
    }
    return data
},(error)=>{
    console.log(error)
    let message
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
    ElNotification({
        title: 'ERROR',
        message: message,
        type: 'error'
    })
    return Promise.reject(error)
})

export default request