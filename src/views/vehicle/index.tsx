import * as React from 'react'
import styles from './index.module.scss'
import { RouteComponentProps } from 'react-router';
import { throttle } from 'lodash'
import VehicleApi from '@/api/vehicle'

interface IProps extends RouteComponentProps {
    [prop: string]: any
  }

class Vehicle extends React.Component<IProps>{

    vehicle!: HTMLDivElement | null;
    vehicleWrap!: HTMLDivElement | null;
    state = {
        isLoading: true,
        vehicleDataList: [],
        /* 开始条数 */
        offset: 0,
        /* 分页条数 */
        page_size: 10,
        /* 是否在加载下一条 */
        isLoadingNext: false,
        /* 是否还有更多 */
        isMore: true
    }

    handleToVhicleShelves = throttle(() => {
        const { history } = this.props
        history.push(`/vehicleShelves`);
    }, 500, {
        trailing: false
    })

    fetchVehicleDataList = () => {
        const { vehicleDataList, offset, page_size } = this.state
        const params = {
            offset,
            page_size
        }
        this.setState({
            isLoadingNext: true
        })
        VehicleApi.fetchVehicleDataList({params}).then((data: any) => {
            this.setState({
                offset: offset + page_size,
                vehicleDataList: [...vehicleDataList, ...data],
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
        try {
            const { isLoadingNext, isMore } = this.state
            const outerEl = this.vehicle, innerEl = this.vehicleWrap
            if( outerEl && innerEl ) {
                let scrollTop = outerEl.scrollTop || 0;
                let clientHeight = window.screen.availHeight || document.documentElement.clientHeight;
                let offsetHeight = innerEl.offsetHeight;
                if(isLoadingNext) { //防止scroll重复执行
                    return false;
                }
                if(scrollTop  + clientHeight > offsetHeight - 200 && isMore) {
                    this.fetchVehicleDataList();
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, 200, {
        trailing: true
    })

    componentDidMount() {
        document.title = '下架车辆列表'
        this.fetchVehicleDataList()
        this.vehicle && this.vehicle.addEventListener('scroll', this.mouseScrooll)
    }

    componentWillUnmount(){
        this.setState = (state, callback) => { return false }
        this.vehicle && this.vehicle.removeEventListener('scroll', this.mouseScrooll)
    }

    render() {
        const { vehicleDataList, isLoading } = this.state
        return <React.Fragment>
            {
                isLoading === false ? <div ref={ref => this.vehicle = ref} className={styles['container']}>
                    {
                        Array.isArray(vehicleDataList) && vehicleDataList.length > 0 ? <div ref={ref => this.vehicleWrap = ref} className={styles['vehicle-list']}>
                        {
                            vehicleDataList.map((item: any, index: number) => {
                                return <div key={item.unid || index} onClick={this.handleToVhicleShelves} className={styles['vehicle-item']}>
                                    <div className={styles['vehicle-img']}>
                                        <img src={item.avatar} alt="" />
                                    </div>
                                    <div className={styles['vehicle-info']}>
                                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />{item.name}</p>
                                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />{item.mileage}公里</p>
                                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />{item.count_trip}次行程</p>
                                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />{item.date_reg}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    : <p>暂无数据</p>
                    }
                </div>
                : null
            }
        </React.Fragment>
    }
}

export default Vehicle