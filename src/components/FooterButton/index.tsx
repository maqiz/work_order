import * as React from 'react'
import styles from './index.module.scss';
import { Button } from 'antd-mobile'

interface IProps{
    handleClick: () => void,
    className?: string,
    type?: "primary" | "warning" | "ghost" | undefined,
    children?: any
}

class FooterBottom extends React.Component<IProps>{

    render(){
        const { handleClick, className, type, children = '提交' } = this.props
    return <Button onClick={ handleClick } className={className ? `${className} ${styles['btn']}` : styles['btn'] } type={type}>{children}</Button>
    }
}

export default FooterBottom