import * as React from 'react'
import WorkOrderApi from '@/api/work-order'
import { throttle } from 'lodash'
import styles from './index.module.scss'


class WorkOrder extends React.Component{

    state = {
        isLoading: true,
        workOrderDataList: [],
        /* 开始条数 */
        offset: 0,
        /* 分页条数 */
        page_size: 10,
        /* 是否在加载下一条 */
        isLoadingNext: false,
        /* 是否还有更多 */
        isMore: true
    }

    /* 工单状态码 */
	getWorkOrder(code: number){
		switch(Number(code)) {
			case 0:
				return "已取消";
			case 1:
				return "已创建";
			case 3:
				return "处理中";
			case 4:
				return "待审核";
			case 5:
				return "已确认";
			default:
				return ""
		}
	}

    /* 获取工单数据列表 */
    fetchWorkOrderDataList = () => {
        const { workOrderDataList, offset, page_size } = this.state
        const params = {
            offset,
            page_size
        }
        this.setState({
            isLoadingNext: true
        })
        WorkOrderApi.fetchWorkOrderDataList({params}).then((data: any) => {
            this.setState({
                offset: offset + page_size,
                workOrderDataList: [...workOrderDataList, ...data],
                isLoading: false,
                isLoadingNext: false,
                isMore: data.length < page_size ? false : true
            })
        }).catch( error => {
            this.setState({
                isLoading: false,
                isLoadingNext: false,
                isMore: false
            })
        }) 
    }

    mouseScrooll = throttle(() => {
        // try {
        //     const { isLoadingNext, isMore } = this.state
        //     const outerEl = this.vehicle, innerEl = this.vehicleWrap
        //     if( outerEl && innerEl ) {
        //         let scrollTop = outerEl.scrollTop || 0;
        //         let clientHeight = window.screen.availHeight || document.documentElement.clientHeight;
        //         let offsetHeight = innerEl.offsetHeight;
        //         if(isLoadingNext) { //防止scroll重复执行
        //             return false;
        //         }
        //         if(scrollTop  + clientHeight > offsetHeight - 200 && isMore) {
        //             this.fetchWorkOrderDataList();
        //         }
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }, 200, {
        trailing: true
    })

    componentDidMount(){
        document.title = '运维工单列表'
        this.fetchWorkOrderDataList()
        // this.vehicle && this.vehicle.addEventListener('scroll', this.mouseScrooll)
    }

    componentWillUnmount(){
        this.setState = (state, callback) => { return false }
        // this.vehicle && this.vehicle.removeEventListener('scroll', this.mouseScrooll)
    }

    render(){
        const { workOrderDataList } = this.state
        console.log(workOrderDataList)
        return <div className={styles['container']}>
            <div className={styles['status-list']}>
                <h2 className={styles['status-title']}>进行中</h2>
                <ul className={styles['work-list']}>
                    {
                        workOrderDataList.map( (item: any, index: number) => {
                            return <li key={index} className={styles['work-item']}>
                            <span>{item.unid ? item.unid.substr(0, 6) : ''}</span>
                            <span className={styles['work-licence']}>泸A-123456</span>
                            <span>1.2公里</span>
                            <span>{this.getWorkOrder(item.business_id)}</span>
                        </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}

export default WorkOrder