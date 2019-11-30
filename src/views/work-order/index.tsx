import * as React from 'react'
import styles from './index.module.scss'


class WorkOrder extends React.Component{

    componentDidMount(){
        document.title = '运维工单列表'
    }

    componentWillMount(){
        this.setState = (state, callback) => { return false }
    }

    render(){
        return <div className={styles['container']}>
            <div className={styles['status-list']}>
                <h2 className={styles['status-title']}>进行中</h2>
                <ul className={styles['work-list']}>
                    <li className={styles['work-item']}>
                        <span>AABBCC</span>
                        <span className={styles['work-licence']}>泸A-123456</span>
                        <span>1.2公里</span>
                        <span>待审核</span>
                    </li>
                    <li className={styles['work-item']}>
                        <span>AABBAABBCCAABBCCCC</span>
                        <span className={styles['work-licence']}>泸A-123456</span>
                        <span>1.2公里</span>
                        <span>待审核</span>
                    </li>
                </ul>
            </div>
        </div>
    }
}

export default WorkOrder