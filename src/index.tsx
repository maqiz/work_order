import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from '@/routes/index';
import * as serviceWorker from './serviceWorker';
import '@/assets/iconfont/iconfont.css'

import { fetchUrlParams } from '@/utils/urlTools'
import { fetchCode, fetchAccessToken } from '@/wxchat'
import Cache from '@/utils/cache'
import check from '@/utils/check-form'
const wechatAuth = async() => {
  const urlObj = fetchUrlParams()
  if (!check.notEmpty(Cache.getItem('access_token'))) {
    const wechat_openid = Cache.getItem('wechat_openid')
    const {code} = urlObj
    if( check.notEmpty(wechat_openid) ){
      await fetchAccessToken(wechat_openid)
      ReactDOM.render(<Router />, document.getElementById('root') as HTMLElement);
    } else {
      if( check.notEmpty(code) ){
        await fetchCode(code)
        await fetchAccessToken(Cache.getItem('wechat_openid'))
        check.notEmpty(Cache.getItem('access_token')) && ReactDOM.render(<Router />, document.getElementById('root') as HTMLElement);
      } else {
        fetchCode()
      }
    }
  } else {
    ReactDOM.render(<Router />, document.getElementById('root') as HTMLElement);
  }
}

wechatAuth()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
