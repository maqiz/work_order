import Axios from '@/api/index'
import axios, {AxiosResponse} from 'axios'
import Cache from '@/utils/cache'
import check from '@/utils/check-form'
import { Toast } from 'antd-mobile';

/* 判断是开发环境还是生产环境 */
const NODE_ENV = process.env.NODE_ENV

const wechatUnid: string = 'A3BDA4E449F348B9B5CD6EE78E488D0E'

const redirect_uri = encodeURI(NODE_ENV === 'production' ? window.location.href.split('#')[0] : 'https://www.icicv.sjtu.edu.cn/e492ea/')

/* 获取code */
const fetchCode = async(code?: string) => {
    if( code ) {
        const param = new URLSearchParams()
        param.append('code', code)
        await axios.post(`https://api.ezcarsharing.com/wechat/auth/${wechatUnid}`, param).then( (res: AxiosResponse) => {
            const data = res.data
            if( check.notEmpty(data.wechat_openid) ) {
                Cache.setItem('wechat_openid', data.wechat_openid)
            } else {
                Toast.fail('code已过期')
                window.location.href = '/'
            }
        }).catch( error => {
            console.log(error)
        })

    } else {
        await axios.get(`https://api.ezcarsharing.com/wechat/auth/${wechatUnid}`, {
            baseURL: '',
            params: {
                redirect_uri
            }
        }).then( (data: AxiosResponse) => {
            window.location.href = data.data
        }).catch( error => {
            console.log(error)
        })
    }
}

/* 获取accessToken */
const fetchAccessToken = async (code: string) => {
    const param = new URLSearchParams()
    param.append('grant_type', 'authorization_code')
    param.append('client_id', 'ff1804350f1941b68f5b65f4a16bd8d1.ezcarsharing.com')
    param.append('client_secret', 'OPuGqeXuzH1PnRy')
    param.append('redirect_uri', redirect_uri)
    param.append('scope', '/doraemon/otc /doraemon/spot /doraemon/order /doraemon/vehicle /doraemon/photo /doraemon/locking')
    param.append('code', code)
    await axios({
        method: 'post',
        url: 'https://api.ezcarsharing.com/lancer/token',
        data: param,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then( (res: AxiosResponse )=> {
        Cache.setItem('access_token', res.data.access_token)
    }).catch( error => {
        // 对响应错误做点什么
        if (error.response) {
            const { status, data } = error.response
            Toast.fail(typeof data === 'string' ? status + data : `${status}:获取accessToken错误`)
        }
        Cache.clear()
    })
}

export { fetchCode, fetchAccessToken }