import * as React from 'react'
import Amap from '@/components/Map'
import styles from './index.module.scss'
import HomeApi from '@/api/home'


class Home extends React.Component{

    fetchVehicleCluster = () => {
        
        const param = {
            rectangle: '118.796424,32.085187,118.77488,32.00596',

        }

        HomeApi.fetchVehicleCluster({param}).then(data => {
            console.log(data)
        }).catch( error => {
            console.log(error)
        }) 
    }

    componentDidMount(){
        this.fetchVehicleCluster()
    }

    render(){
        console.log(this.props)
        return <div className={styles['container']}>
            <div className={styles['map']}>
                <Amap />
            </div>
        </div>
    }
}

export default Home