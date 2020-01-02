import * as React from 'react'
import Amap from '@/components/Map'
import LabelList from '@/components/labelList'
import { RouteComponentProps } from 'react-router-dom'
import { Marker } from 'react-amap'
import { Toast, Button } from 'antd-mobile'
import FooterBottom from '@/components/FooterButton'
import { throttle } from 'lodash'
import { fetchUrlParams } from '@/utils/urlTools'
import VehicleApi from '@/api/vehicle'
import WorkOrderApi from '@/api/work-order'
import styles from './index.module.scss'
import check from '@/utils/check-form'


interface IProps extends RouteComponentProps{
    [prop: string]: any
}

interface IParams {
    unid: string,
    comment?: string
}


class HandleWorkOrder extends React.Component<IProps>{
    amapEvents: { created: (map: any) => void; }
    map: any

    constructor(props: any){
        super(props);
        // 地图事件
        this.amapEvents = {
            created: (map: any) => {
                this.map = map
            }
        }
    }
    
    state = {
        workOrderUnid: '',
        vehicleUnid: '',
        comment: '',
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
                name: '维护内容',
                desc: '--'
            }
        ],
        markerPosition: undefined,
        markerExtData: null
    }
    /* 获取车辆数据 */
    fetchVehicleInfoData = (vehicleUnid: string) => {
        const { labelDataList } = this.state
        VehicleApi.fetchVehicleInfoData({}, `/vehicle_mtng/${vehicleUnid}`).then( data => {
            const { licence, addr, lond, latd, avatar }: any = data
            const markerPosition = {longitude: lond, latitude: latd}
            const markerExtData = { avatar}
            labelDataList[0] = {...labelDataList[0], desc: licence}
            labelDataList[1] = {...labelDataList[1], desc: addr}
            this.setState({
                markerExtData,
                markerPosition,
                labelDataList
            }, () => {
                setTimeout(() => {
                    this.map && this.map.setFitView()
                }, 200)
            })
            console.log(data)
        }).catch( error => {
            console.log(error)
        })
    }
    /* 获取工单数据 */
    fetchWorkOrderData = (workOrderUnid: string) => {
        const { labelDataList } = this.state
        WorkOrderApi.fetchWorkOrderData({}, `/work_order/${workOrderUnid}`).then( data => {
            const { content }: any = data
            labelDataList[2] = {...labelDataList[1], desc: content}
            this.setState({
                labelDataList
            })
        }).catch( error => {
            console.log(error)
        })

    } 
    /* 处理按钮点击 */
    handleClick = throttle((type: string) => {
        const { history } = this.props
        const { workOrderUnid, comment } = this.state
        try {
            const params = new URLSearchParams()
            params.append('unid', workOrderUnid)
            if( type === 'done' ) {
                if( !check.notEmpty(comment) ) {
                    Toast.info('请输入备注内容')
                    return false
                } else {
                    params.append('comment', comment)
                }
            }
            WorkOrderApi.receiveWorkOrder(params, `/work_order/${workOrderUnid}/${type}`).then( data => {
                if( type === 'done' ) {
                    Toast.success('工单任务处理成功')
                } else {
                    Toast.success('工单任务取消成功')
                }
                setTimeout(history.goBack, 500)
            }).catch( error => {
                console.log(error)
            })
        } catch (error) {
            
        }
    }, 500, {
        trailing: false
    })

    /* 渲染车辆 */
    renderMarker = (extData: any )=> {
        if ( extData ) {
            const { avatar } = extData
            return <img style={{ width: '64px'}} src={avatar} alt=''/> 
        }
        return null
    }
    /* 处理输入框变化 */
    handleChange = (e: any, type: string) => {
        this.setState({
            [type]: e.target.value
        })
    }

    componentDidMount(){
        document.title = '上架车辆'
        const { location } = this.props
        const urlObj = fetchUrlParams(location.search)
        const { vehicleUnid, workOrderUnid } = urlObj
        
        if( check.notEmpty(workOrderUnid) ) {
            this.fetchWorkOrderData(workOrderUnid)
        }
        if( check.notEmpty(vehicleUnid) ) {
            this.fetchVehicleInfoData(vehicleUnid)
        }
        this.setState({
            workOrderUnid,
            vehicleUnid
        })
    }

    componentWillUnmount(){
        this.setState = (state, callback) => { return false }
    }

    render(){
        const { labelDataList, markerPosition, markerExtData, comment } = this.state
        console.log(markerPosition)
        return <div className={`ignore-container`}>
            <div className={styles['content']}>
                <div className={styles['map']}>
                    <Amap events={this.amapEvents}>
                        {
                            markerPosition && <Marker position={markerPosition} render={this.renderMarker} extData={markerExtData} />
                        }
                    </Amap>
                </div>
                <LabelList className={styles['info']} data={labelDataList} />
            </div>
            <div className={styles['textarea-wrap']}>
                <textarea onChange={ (e) => {this.handleChange(e, 'comment')} } value={comment} placeholder={'请输入处理工单备注'} className={styles['textarea']} rows={5}></textarea>
            </div>

            <div className={styles['btn']}>
                <Button onClick={ () => this.handleClick('cancel')} className={styles['btn-cancel']}>取消任务</Button>
                <Button onClick={ () => this.handleClick('done')} type='primary'>完成</Button>
            </div>
        </div>
    }
}

export default HandleWorkOrder