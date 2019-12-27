import * as React from 'react'
import WorkOrderApi from '@/api/work-order'
import { throttle } from 'lodash'
import styles from './index.module.scss'
import Empty from '@/components/Empty'

interface IProps {
    [prop: string]: any
}

class WorkOrder extends React.Component<IProps>{

    state = {
        isLoadingDone: true,
        isLoadingWait: true,
        /* 未完成工单数据 */
        workOrderDoneDataList: [],
        /* 待领取工单数据 */
        workOrderWaitDataList: [],
    }

    /* 工单状态码 */
	getWorkOrder(code: number){
		switch(Number(code)) {
			case 0:
				return "已取消";
			case 1:
                return "已创建";
            case 2:
				return "已分配";
			case 3:
				return "处理中";
			case 4:
				return "待审核";
			case 5:
                return "已确认";
            case 6:
                return "已完成";
			default:
				return ""
		}
	}

    /* 获取工单未完成数据列表 */
    fetchWorkOrderDoneDataList = () => {
        const params = {
            flag_done: false,
            offset: 0,
            page_size: 999
        }
        WorkOrderApi.fetchWorkOrderDataList({params}, '/work_order').then((data: any) => {
            this.setState({
                workOrderDoneDataList: data,
                isLoadingDone: false
            })
        }).catch( error => {
            this.setState({
                isLoadingDone: false
            })
        })
    }

    /* 获取工单待领取数据列表 */
    fetchWorkOrderWaitDataList = () => {
        const params = {
            business_id: 1,
            offset: 0,
            page_size: 999
        }
        WorkOrderApi.fetchWorkOrderDataList({params}, '/work_order').then((data: any) => {
            this.setState({
                workOrderWaitDataList: data,
                isLoadingWait: false
            })
        }).catch( error => {
            this.setState({
                isLoadingWait: false
            })
        }) 
    }
    /* 完成工单工单 */
    handleTohandle = throttle((workOrderUnid: string, vehicleUnid: string) => {
        const { history } = this.props
        history.push(`/handleWorkOrder?workOrderUnid=${workOrderUnid}&vehicleUnid=${vehicleUnid}`);
    }, 500, {
        trailing: false
    })

    /* 取领取工单 */
    handleToReceive = throttle((workOrderUnid: string, vehicleUnid: string) => {
        const { history } = this.props
        history.push(`/receiveWorkOrder?workOrderUnid=${workOrderUnid}&vehicleUnid=${vehicleUnid}`);
    }, 500, {
        trailing: false
    })

    componentDidMount(){
        document.title = '运维工单列表'
        this.fetchWorkOrderDoneDataList()
        this.fetchWorkOrderWaitDataList()
    }

    componentWillUnmount(){
        this.setState = (state, callback) => { return false }
    }

    render(){
        const { workOrderDoneDataList, workOrderWaitDataList, isLoadingDone, isLoadingWait } = this.state
        return <div className={styles['container']}>
            <div className={styles['status-list']}>
                <h2 className={styles['status-title']}>进行中</h2>

                {
                    isLoadingDone === false ? (Array.isArray(workOrderDoneDataList) && workOrderDoneDataList.length > 0 ? <ul className={styles['work-list']}>
                    {
                        workOrderDoneDataList.map( (item: any, index: number) => {
                            return <li key={index} className={styles['work-item']} onClick={() => this.handleTohandle(item.unid, item.vehicle ? item.vehicle.unid : '')}>
                            <span>{item.unid ? item.unid.substr(0, 6) : ''}</span>
                            <span className={styles['work-licence']}>{item.vehicle.licence}</span>
                            <span>{item.vehicle.endurance}公里</span>
                            <span>{this.getWorkOrder(item.business_id)}</span>
                        </li>
                        })
                    }
                </ul> : <Empty />) : null
                }

                <h2 className={styles['status-title']}>待领取</h2>

                {
                    isLoadingWait === false ? (Array.isArray(workOrderWaitDataList) && workOrderWaitDataList.length > 0 ? <ul className={styles['work-list']}>
                    {
                        workOrderWaitDataList.map( (item: any, index: number) => {
                            return <li key={index} className={styles['work-item']} onClick={() => this.handleToReceive(item.unid, item.vehicle ? item.vehicle.unid : '')}>
                            <span>{item.unid ? item.unid.substr(0, 6) : ''}</span>
                            <span className={styles['work-licence']}>{item.vehicle.licence}</span>
                            <span>{item.vehicle.endurance}公里</span>
                            <span>{this.getWorkOrder(item.business_id)}</span>
                        </li>
                        })
                    }
                </ul> : <Empty />) : null
                }
            </div>
        </div>
    }
}

export default WorkOrder