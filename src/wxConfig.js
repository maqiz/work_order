import axios from 'axios';
import { wechatUnid } from '@/wxchat';
//微信配置
function wxConfig(href){
	let uri = href || window.location.href;
	axios({
		url : `https://api.ezcarsharing.com/wechat/js/${wechatUnid}?uri=${uri}`,
		method : 'GET'
	}).then((res)=>{
		var data = res.data;
		window.wx.config({
			// debug : true,
			beta:true, 
			appId: data.appid,
			timestamp: data.timestamp,
			nonceStr: data.nonce,
			signature: data.signature,
			jsApiList: [
				'getLocation', 
			]
		});
	}).catch((err)=>{
		console.log(err)
	})
}

export default wxConfig;