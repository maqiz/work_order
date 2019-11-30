import * as React from 'react'
import Amap from '@/components/Map'
import styles from './index.module.scss'
import HomeApi from '@/api/home'


class Home extends React.Component{

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

    fetchVehicleCluster = () => {
        
        const params = {
            rectangle: '118.796424,32.085187,118.77488,32.00596',
        }

        HomeApi.fetchVehicleCluster({params}).then(data => {
            console.log(data)
        }).catch( error => {
            console.log(error)
        }) 
    }

    componentDidMount(){
        this.fetchVehicleCluster()
    }

    componentWillMount(){
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
                <Amap />
            </div>
        </div>
    }
}

export default Home