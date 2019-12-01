import * as React from 'react'
import styles from './index.module.scss';

interface IProps{
    name?: string
}

class Empty extends React.Component<IProps>{

    render(){
        const { name = '暂无数据' } = this.props
        return <div className={styles['container']}>
            <i className='iconfont iconempty'></i>
            <p className={styles['title']}>暂无数据</p>
        </div>
    }
}

export default Empty