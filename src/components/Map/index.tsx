import * as React from 'react'
import { Map } from 'react-amap'
import { Icon } from 'antd-mobile'
import styles from './index.module.scss'

interface IProp{
    [prop: string]: any
}

const loading = <div className={styles['loading-wrap']}>
    <Icon type="loading" />
    <p className={styles['loading-title']}>地图加载中</p>
</div>

class Amap extends React.Component<IProp>{

    constructor(props: any){
        super(props);

    }

    render(){

        return <div style={{ width: '100%', height: '100%' }}>
            <Map
                // plugins={['ToolBar']}
                {...this.props}
                loading={loading}
            >
                { this.props.children }
            </Map>
        </div>
    }
}

export default Amap