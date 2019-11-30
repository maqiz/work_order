import * as React from 'react'
import styles from './index.module.scss';

interface IProps{
    className?: string,
    style?: object,
    labelDataList: any[]
}

class LabelList extends React.Component<IProps>{

    render(){
        const { props } = this
        const { labelDataList } = props
        return <div {...props}>
            <div className={styles['wrap']}>
                <div className='labelList-list'>
                    {
                        labelDataList.map( (item, index) => {
                            return <div className='labelList-item' key={index}>
                                <span className='labelList-item-name'>{item.name}:</span>
                                <p className='labelList-item-desc'>{item.desc}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    }
}

export default LabelList