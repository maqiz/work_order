import * as React from 'react'
import styles from './index.module.scss'
import { RouteComponentProps } from 'react-router';
import { throttle } from 'lodash'
import VehicleApi from '@/api/vehicle'

interface IProps extends RouteComponentProps {
    [prop: string]: any
  }

class Vehicle extends React.Component<IProps>{

    handleToVhicleShelves = throttle(() => {
        const { history } = this.props
        history.push(`/vehicleShelves`);
    }, 500, {
        trailing: false
    })

    fetchVehicleDataList = () => {

        VehicleApi.fetchVehicleDataList({}).then(data => {
            console.log(data)
        }).catch( error => {
            console.log(error)
        }) 
    }

    componentDidMount(){
        document.title = '下架车辆列表'
        this.fetchVehicleDataList()
    }

    componentWillMount(){
        this.setState = (state, callback) => { return false }
    }

    render(){
        return <div className={styles['container']}>
            <div className={styles['vehicle-list']}>
                <div onClick={ this.handleToVhicleShelves } className={styles['vehicle-item']}>
                    <div className={styles['vehicle-img']}>
                        <img src="" alt=""/>
                    </div>
                    <div className={styles['vehicle-info']}>
                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />1354公里</p>
                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />1354公里</p>
                        <p className={styles['vehicle-info-item']}><i className='iconfont icongerenzhongxin-xuanzhongcopy' />1354公里</p>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Vehicle