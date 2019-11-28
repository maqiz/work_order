import * as React from 'react'
import styles from './index.module.scss'

class Login extends React.Component{

    render(){
        return <div className={styles['container']}>
            <div className={styles['title']}>工单系统</div>
            <div className={styles['form-item']}>
                <label htmlFor="iphone"><i className='iconfont icongerenzhongxin-xuanzhongcopy' /></label>
                <input placeholder="请输入用户名" type="text" name="" id=""/>
            </div>
        </div>
    }
}

export default Login