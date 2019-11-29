import * as React from 'react'
import styles from './index.module.scss'


class Vehicle extends React.Component{

    componentDidMount(){

    }

    componentWillMount(){
        this.setState = (state, callback) => { return false }
    }

    render(){
        return <div className={styles['container']}>
            vehicle
        </div>
    }
}

export default Vehicle