import * as React from 'react'
import Amap from '@/components/Map'
import LabelList from '@/components/labelList'
import { RouteComponentProps } from 'react-router-dom'
import { Checkbox, Button } from 'antd-mobile'
import styles from './index.module.scss'

const CheckboxItem = Checkbox.CheckboxItem;

interface IProps extends RouteComponentProps{
    [prop: string]: any
}


class Vehicle extends React.Component<IProps>{

    state = {
        labelDataList: [
            {
                name: '车辆信息',
                desc: '泸A-D12345'
            },
            {
                name: '车辆信息',
                desc: '泸A-D12345'
            },
            {
                name: '车辆信息',
                desc: '泸A-D12345'
            }
        ],
        checkDataList: [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
            { value: 3, label: 'College diploma' },
            { value: 4, label: 'College diploma' },
        ],
        checkSelectKeys: []
    }

    /* check变化函数 */
    onChange = (value: number) => {
        const { checkSelectKeys } = this.state
    }

    componentDidMount(){
        document.title = '上架车辆'
    }

    componentWillMount(){
        this.setState = (state, callback) => { return false }
    }

    render(){
        const { labelDataList, checkDataList } = this.state
        return <div className={`ignore-container`}>
            <div className={styles['content']}>
                <div className={styles['map']}>
                    <Amap />
                </div>
                <LabelList className={styles['info']} labelDataList={labelDataList} />
                <div className={styles['checkbox']}>
                    {
                        checkDataList.map( item => {
                            return <CheckboxItem key={item.value} onChange={() => this.onChange(item.value)}>
                            {item.label}
                        </CheckboxItem>
                        } )
                    }
                </div>
            </div>
            <Button className={styles['btn']} type="primary">上架车辆</Button>
        </div>
    }
}

export default Vehicle