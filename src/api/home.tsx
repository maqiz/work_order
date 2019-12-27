import Axios from '@/api/index'

export default {

    /* 获取车辆概况 */
    fetchVehicleSummary: (params: any = {}) => Axios.get('/vehicle_mtng/summary', params),

    /* 获取工单概况 */
    fetchWorkOrderSummary: (params: any = {}) => Axios.get('/work_order/summary', params),

    /* 根据地图可视化区域获取车辆列表 */
    fetchVehicleCluster: (params: any = {}, url: string) => Axios.get(url, params),

}