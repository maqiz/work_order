import * as React from 'react'
import Amap from '@/components/Map'
import { Markers } from 'react-amap'
import { RouteComponentProps } from 'react-router';
import styles from './index.module.scss'
import HomeApi from '@/api/home'
import { throttle } from 'lodash'


interface IProps extends RouteComponentProps {
    [prop: string]: any
}
interface IMapEvent{
    created: (map: any) => void;
}

class Home extends React.Component<IProps>{
    amapEvents: IMapEvent;
    map: any
    vehicleEl!: HTMLDivElement;

    constructor(props: any){
        super(props);
        // 地图事件
        this.amapEvents = {
            created: (map: any) => {
                this.map = map
                this.mapMoveEnd()
                map.on('moveend', this.mapMoveEnd);
            }
        }
    }

    state = {
        isShowVehicle: true,
        vehicleTotalCount: 0,
        infoData: [
            {
                name: '上架',
                value: '0'
            },
            {
                name: '待维护',
                value: '0'
            },
            {
                name: '工单',
                value: '0'
            }
        ],
        markers: []
    }

    /* 根据地图可视化区域获取车辆列表 */
    fetchVehicleCluster = (rectangle: string) => {
        
        const params = {
            geodetic_system: 'gcj02',
            rectangle: '121.44639460872365,31.028372473333746,121.4497524800122,31.023732377950054'
        }

        HomeApi.fetchVehicleCluster({params}, '/vehicle_mtng/cluster/4856712C981340B0A6A10B77861F2411').then((data: any) => {
            const markers = data.map( (item: any) => {
                const data = item.vehicles.vehicle[0]
                return {
                    position: {
                        longitude: data.lond,
                        latitude: data.latd
                    },
                    image: data.avatar,
                    data: data
                }
            })
            this.setState({
                markers
            })
        }).catch( error => {
            console.log(error)
        }) 
    }

    /* 获取车辆概况 */
    fetchVehicleSummary = () => {
        const { infoData } = this.state
        HomeApi.fetchVehicleSummary().then(data => {
            const { count_total, count_ava, count_mtng }: any = data
            infoData[0] = {...infoData[0], value: count_ava}
            infoData[1] = {...infoData[1], value: count_mtng}
            this.setState({
                vehicleTotalCount: count_total,
                infoData: infoData
            })
        }).catch( error => {
            console.log(error)
        }) 
    }

    /* 获取工单概况 */
    fetchWorkOrderSummary = () => {
        const { infoData } = this.state
        HomeApi.fetchWorkOrderSummary().then(data => {
            const { count_total}: any = data
            infoData[2] = {...infoData[2], value: count_total}
            this.setState({
                infoData: infoData
            })
        }).catch( error => {
            console.log(error)
        }) 
    }

    /* 处理地图移动事件结束 */
    mapMoveEnd = throttle(() => {
        try {
            const bs = this.map.getBounds();   //获取可视区域
            const {southwest, northeast} = bs; //southwest-可视区域左下角,northeast-可视区域右上角
            const rectangle = southwest.lng + ',' + northeast.lat +',' + northeast.lng + "," + southwest.lat;	//左上 + 右下坐标
            this.fetchVehicleCluster(rectangle)
        } catch (error) {
            console.log(error)
        }
    }, 500, {
        trailing: false
    })

    /* 地图渲染maker函数 */
    renderMarkerFn = (extData: any )=> {
        console.log(extData)
        return <img style={{ width: '64px', cursor: 'pointer' }} src={extData.image} alt=''/>
    }

    eventInit = () => {
        try {
            const vehicleEl = this.vehicleEl
            let startX: number=0, startY: number=0, isMoveEnd: boolean = true;
            vehicleEl.addEventListener('touchstart', (e) => {
                const touches = e.touches;
                startX = touches[0].pageX;
                startY = touches[0].pageY;
                isMoveEnd = false;
            })

            vehicleEl.addEventListener('touchend', (e) => {
                if( isMoveEnd === false) {
                    isMoveEnd = true
                    const touches = e.changedTouches;
                    const endX = touches[0].pageX;
                    const endY = touches[0].pageY;
                    console.log(endX - startX, endY - startY)
                    if( endY - startY > 0 ) {
                        console.log('向下滑动了')
                        this.setState({
                            isShowVehicle: false
                        })
                    }
                }
            })

        } catch (error) {
            
        }
    }
  
    componentDidMount(){
        document.title = '运维首页'
        this.fetchVehicleSummary()
        this.fetchWorkOrderSummary()
        this.eventInit()
    }

    componentWillUnmount(){
        this.setState = (state, callback) => { return false }
    }

    render(){
        
        const { infoData, vehicleTotalCount, markers, isShowVehicle } = this.state

        return <div className={styles['container']}>
            <div className={styles['info']}>
                <div className={styles['info-head']}>
                    <div className={styles['info-number']}>{vehicleTotalCount}</div>
                    <div className={styles['info-nane']}>车辆总数</div>
                </div>
                <ul className={styles['info-list']}>
                    {
                        infoData.map( (item, index)  => {
                            return <li key={index} className={styles['info-item']}>
                            <div className={styles['info-number']}>{item.value}</div>
                            <div className={styles['info-nane']}>{item.name}</div>
                        </li>
                        })
                    }
                </ul>
            </div>
            <div className={styles['map']}>
                <Amap events={this.amapEvents}>
                    <Markers
                        render={this.renderMarkerFn}
                        markers={markers}
                    />
                </Amap>
            </div>

            <div ref={(ref: HTMLDivElement) => {this.vehicleEl = ref}} className={ isShowVehicle ? styles['vehicle'] : `${styles['vehicle']} ${styles['hide']}`}>
                <div className={styles['vehicle-img']}>
                    <img src="" alt=""/>
                </div>
                <h2 className={styles['vehicle-title']}>自动互联纸</h2>
                <div className={styles['vehicle-info-list']}>
                    <div className={styles['vehicle-info-item']}>车牌号码：<span className={styles['vehicle-info-item-name']}>粤B-P12R7</span></div>
                    <div className={styles['vehicle-info-item']}>座位：<span className={styles['vehicle-info-item-name']}>粤B-P12R7</span></div>
                    <div className={styles['vehicle-info-item']}>续航里程: <span className={styles['vehicle-info-item-name']}>粤B-P12R7</span></div>
                    <div className={styles['vehicle-info-item']}>距离：<span className={styles['vehicle-info-item-name']}>粤B-P12R7</span></div>
                </div>
            </div>
        </div>
    }
}

export default Home