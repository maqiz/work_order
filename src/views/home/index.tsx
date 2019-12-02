import * as React from 'react'
import Amap from '@/components/Map'
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

    constructor(props: any){
        super(props);
        // 地图事件
        this.amapEvents = {
            created: (map: any) => {
                this.map = map
                this.mapMoveend()
                map.on('moveend', this.mapMoveend);
            }
        }
    }

    state = {
        infoData: [
            {
                name: '上架',
                value: '78'
            },
            {
                name: '待维护',
                value: '256'
            },
            {
                name: '工单',
                value: '50'
            }
        ]
    }

    /* 根据地图可视化区域获取车辆列表 */
    fetchVehicleCluster = (rectangle: string) => {
        
        const params = {
            rectangle
        }

        HomeApi.fetchVehicleCluster({params}).then(data => {
            console.log(data)
        }).catch( error => {
            console.log(error)
        }) 
    }

    /* 获取车辆概况 */
    fetchVehicleSummary = () => {
        
        const params = {}

        HomeApi.fetchVehicleSummary({params}).then(data => {
            console.log(data)
        }).catch( error => {
            console.log(error)
        }) 
    }

    /* 获取工单概况 */
    fetchWorkOrderSummary = () => {
        
        const params = {}

        HomeApi.fetchWorkOrderSummary({params}).then(data => {
            console.log(data)
        }).catch( error => {
            console.log(error)
        }) 
    }

    /* 处理地图移动事件结束 */
    mapMoveend = throttle(() => {
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

    componentDidMount(){
        document.title = '运维首页'
        this.fetchVehicleSummary()
        this.fetchWorkOrderSummary()
    }

    componentWillUnmount(){
        this.setState = (state, callback) => { return false }
    }

    render(){
        
        const { infoData } = this.state

        return <div className={styles['container']}>
            <div className={styles['info']}>
                <div className={styles['info-head']}>
                    <div className={styles['info-number']}>165</div>
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
                <Amap events={this.amapEvents} />
            </div>
        </div>
    }
}

export default Home