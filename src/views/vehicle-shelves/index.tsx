import * as React from 'react'
import Amap from '@/components/Map'
import LabelList from '@/components/labelList'
import { RouteComponentProps } from 'react-router-dom'
import { Checkbox, Toast } from 'antd-mobile'
import FooterBottom from '@/components/FooterButton'
import { throttle } from 'lodash'
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
            { value: 0, label: '车辆完成充电,续航里程满足运营要求', checked: false },
            { value: 1, label: '已清理车内异物喝垃圾', checked: false },
            { value: 2, label: '车辆移动到指定投放地点', checked: false },
        ],
        checkSelectKeys: []
    }

    /* check变化函数 */
    onChange = (index: number) => {
        const { checkDataList } = this.state
        checkDataList[index].checked = !checkDataList[index].checked
        this.setState({
            checkDataList: [...checkDataList]
        })
    }

    /* 处理按钮点击 */
    handleClick = throttle(() => {
        try {
            const { checkDataList } = this.state
            const checkTitleArr = checkDataList.reduce( (prev: any[], cur: any) => {
                if( cur.checked === true ){
                    prev.push(cur.label)
                }
                return prev
            }, [])
            
            if( Array.isArray(checkTitleArr) && checkTitleArr.length>0 ) {
                
            } else {
                Toast.info('请至少选择一项')
            }

        } catch (error) {
            
        }
    }, 500, {
        trailing: false
    })

    componentDidMount(){
        document.title = '上架车辆'
        console.log(this.props)
    }

    componentWillUnmount(){
        this.setState = (state, callback) => { return false }
    }

    render(){
        const { labelDataList, checkDataList } = this.state
        return <div className={`ignore-container`}>
            <div className={styles['content']}>
                <div className={styles['map']}>
                    <Amap />
                </div>
                <LabelList className={styles['info']} data={labelDataList} />
                <div className={styles['checkbox']}>
                    {
                        checkDataList.map( (item, index) => {
                            return <CheckboxItem key={item.value} onChange={() => this.onChange(index)} checked={item.checked}>
                            {item.label}
                        </CheckboxItem>
                        } )
                    }
                </div>
            </div>
            <FooterBottom handleClick={this.handleClick} className={styles['btn']} type="primary">上架车辆</FooterBottom>
        </div>
    }
}

export default Vehicle