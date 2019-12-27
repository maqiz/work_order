import axios, {AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios'
import { Toast } from 'antd-mobile';
import Cache from '@/utils/cache'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.ezcarsharing.com/lancer/' : 'https://api.ezcarsharing.com/lancer/';


const handleErrorTips = (status: number, data: any) => {
    switch (status) {
        case 400:
            Toast.fail(data ? (data.error_description || data.text || '请求错误') : '请求错误')
            break;
        case 401:
            Toast.fail('未登录,请重新刷新页面')
            Cache.clear()
            break;
        case 403:
            Toast.fail(data ? (data.text || '没有权限') : '没有权限')
            break;
        case 500:
            Toast.fail('服务器错误')
            break;
        case 502:
            Toast.fail('网关错误')
            break;
        case 504:
            Toast.fail('请求超时')
            break;
        default:
            Toast.fail('请求出错')
            break;
    }
}

/* 创建axios实例 */
const Axios = axios.create({
    baseURL: baseUrl,
    responseType: 'json', // 数据格式
    timeout: 10000,
    validateStatus: function (status) {
        return status === 200 || status === 404; // default
    }
});

// 添加请求拦截器
Axios.interceptors.request.use( (config: AxiosRequestConfig) => {
    const { method } = config
    // 请求 access_token，登录后每个请求都带上
    if (Cache.getItem('access_token')) {
        config.headers.Authorization = `Bearer ${Cache.getItem('access_token')}`;
    }
    if (method === 'post' || method === 'put') { // 针对post的处理
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use( (response: AxiosResponse) => {
    // 对响应数据做点什么
    if( response.status === 404) {
        return Promise.reject(response);
    }
    console.log(response)
    return response.data;
}, (error: AxiosError) => {
    // 对响应错误做点什么
    if (error.response) {
        const { status, data } = error.response
        handleErrorTips(status, data)
    }
    return Promise.reject(error);
});

export default Axios