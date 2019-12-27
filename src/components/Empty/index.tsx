import * as React from 'react'
import './index.module.scss';

interface IProps{
    name?: string
}

class Empty extends React.Component<IProps>{

    render(){
        const { name = '暂无数据' } = this.props
        return <div className={'empty-container'}>
            <i className='iconfont iconempty'></i>
            <p className={'empty-title'}>{name}</p>
        </div>
    }
}

export default Empty