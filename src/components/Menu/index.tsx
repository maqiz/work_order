import * as React from 'react'
import styles from './index.module.scss';

interface IProps{
    [prop: string]: any
}

const menuDataList = [
    {
        name: '分布',
        iconfont: 'icongerenzhongxin-xuanzhongcopy'
    },
    {
        name: '工单',
        iconfont: 'iconcheliang'
    },
    {
        name: '车辆',
        iconfont: 'icongerenzhongxin-xuanzhongcopy'
    },
    {
        name: '我',
        iconfont: 'icongerenzhongxin-xuanzhongcopy'
    }
]

class Menu extends React.Component<IProps>{
    render(){
        return <div className={styles['menu']}>
            {
                menuDataList.map( (item, index) => {
                    return <div key={index} className={styles['menu-item']}>
                    <i className={`iconfont ${item.iconfont}`}></i>
                    <span className={styles['menu-item-title']}>{item.name}</span>
                </div>
                })
            }
        </div>
    }
}

export default Menu
