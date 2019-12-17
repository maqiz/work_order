import axios, {AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios'
import { Toast } from 'antd-mobile';
import Cache from '@/utils/cache'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.ezcarsharing.com/lancer/' : 'https://api.ezcarsharing.com/lancer/';


const handleErrorTips = (status: number) => {
    switch (status) {
        case 401:
            Toast.fail('未登录')
            Cache.clear()
            break;
        case 403:
            Toast.fail('没有权限')
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
    // 在发送请求之前做些什么
    // 请求 access_token，登录后每个请求都带上
    config.headers.Authorization = 'Bearer ttronf8ab323dcdfce2b2625219bd3fe'
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
    return response.data;
}, (error: AxiosError) => {
    // 对响应错误做点什么
    if (error.response) {
        handleErrorTips(error.response.status)
    }
    return Promise.reject(error);
});

export default Axios