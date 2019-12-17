import * as React from 'react'
import Amap from '@/components/Map'
import LabelList from '@/components/labelList'
import { RouteComponentProps } from 'react-router-dom'
import { Checkbox, Toast } from 'antd-mobile'
import FooterBottom from '@/components/FooterButton'
import { throttle } from 'lodash'
import { fetchUrlParams } from '@/utils/urlTools'
import VehicleApi from '@/api/vehicle'
import styles from './index.module.scss'

const CheckboxItem = Checkbox.CheckboxItem;


interface IProps extends RouteComponentProps{
    [prop: string]: any
}


class Vehicle extends React.Component<IProps>{

    state = {
        vehicleUnid: '',
        labelDataList: [
            {
                name: '车辆信息',
                desc: '--'
            },
            {
                name: '车辆位置',
                desc: '--'
            },
            {
                name: '续航信息',
                desc: '--'
            },
            {
                name: '数据时间',
                desc: '--'
            }
        ],
        checkDataList: [
            { value: 0, label: '车辆完成充电,续航里程满足运营要求', checked: false },
            { value: 1, label: '已清理车内异物喝垃圾', checked: false },
            { value: 2, label: '车辆移动到指定投放地点', checked: false },
        ],
    }

    fetchVehicleInfoData = (vehicleUnid: string) => {
        const { labelDataList } = this.state
        VehicleApi.fetchVehicleInfoData({}, `/vehicle_mtng/${vehicleUnid}`).then( data => {
            const { licence, addr, endurance, datime_last }: any = data
            labelDataList[0] = {...labelDataList[0], desc: licence}
            labelDataList[1] = {...labelDataList[1], desc: addr}
            labelDataList[2] = {...labelDataList[2], desc: `${endurance}公里`}
            labelDataList[3] = {...labelDataList[3], desc: datime_last}
            this.setState({
                labelDataList
            })
            console.log(data)
        }).catch( error => {
            console.log(error)
        })

    }

    /* 上架车辆 */
    submitShelvesVehicle = (comment: string) => {
        const { history } = this.props
        const { vehicleUnid } = this.state

        const params = {
            comment
        }
        
        VehicleApi.submitShelvesVehicle(params, `/vehicle_mtng/${vehicleUnid}/ava`).then( data => {
            Toast.success('上架成功')
            setTimeout(history.goBack, 500)
        }).catch( error => {
            console.log(error)
        })


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
            const checkTitleArr: string[] = checkDataList.reduce( (prev: any[], cur: any) => {
                if( cur.checked === true ){
                    prev.push(cur.label)
                }
                return prev
            }, [])
            
            if( Array.isArray(checkTitleArr) && checkTitleArr.length>0 ) {
                this.submitShelvesVehicle(checkTitleArr.join(','))
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
        const { location } = this.props
        const urlObj = fetchUrlParams(location.search)
        const { vehicleUnid } = urlObj
        if( vehicleUnid ) {
            this.fetchVehicleInfoData(vehicleUnid)
            this.setState({
                vehicleUnid: urlObj.vehicleUnid
            })
        }
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