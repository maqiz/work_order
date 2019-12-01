import * as React from 'react'
import styles from './index.module.scss';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'

interface IProps extends RouteComponentProps{
    [prop: string]: any
}

interface IMatchPath{
    link: string,
    subLink: string[]
}

const menuDataList = [
    {
        name: '首页',
        iconfont: 'iconshouye',
        link: '/',
        subLink: ['/home']
    },
    {
        name: '工单',
        iconfont: 'icongongdan',
        link: '/workOrder',
        subLink: ['/workOrder/list']
    },
    {
        name: '车辆',
        iconfont: 'iconcheliang',
        link: '/vehicle',
        subLink: ['/vehicle/list']
    },
    {
        name: '我',
        iconfont: 'iconuser',
        link: '/center',
        subLink: ['/center']
    }
]

class Menu extends React.Component<IProps>{

    mathPath = ( item: IMatchPath ) => {
        const { location } = this.props
        const routePath = location.pathname
        const matchSubLink = item.subLink.find((subitem: string) => routePath.includes(subitem));
        return routePath === item.link || matchSubLink
    }

    render(){
        return <div className={styles['menu']}>
            {
                menuDataList.map( (item, index) => {
                    return <Link key={index} className={`${styles['menu-item']} ${this.mathPath(item) ? styles['active'] : ''}`} to={item.link}>
                    <i className={`iconfont ${item.iconfont}`}></i>
                    <span className={styles['menu-item-title']}>{item.name}</span>
                </Link>
                })
            }
        </div>
    }
}

export default withRouter(Menu)
