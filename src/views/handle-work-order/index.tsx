import * as React from 'react'
import styles from './index.module.scss'


class Vehicle extends React.Component{

    componentDidMount(){
        document.title = '下架车辆列表'
    }

    componentWillMount(){
        this.setState = (state, callback) => { return false }
    }

    render(){
        return <div className={styles['container']}>
            <div className={styles['vehicle-list']}>
                <div className={styles['vehicle-item']}>
                    <div className={styles['vehicle-img']}>
                        <img src="" alt=""/>
                    </div>
                    <div className={styles['vehicle-info']}>
                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />1354公里</p>
                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />1354公里</p>
                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />1354公里</p>
                    </div>
                </div>
                <div className={styles['vehicle-item']}>
                    <div className={styles['vehicle-img']}>
                        <img src="" alt=""/>
                    </div>
                    <div className={styles['vehicle-info']}>
                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />1354公里</p>
                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />1354公里</p>
                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />1354公里</p>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Vehicle