import Axios from '@/api/index'

export default {
    /* 首页根据地图范围获取车辆数据 */
    fetchVehicleDataList: (params: any = {}) => Axios.get('/vehicle_mtng', params),

    /* 上架车辆-获取车辆信息数据 */
    fetchVehicleInfoData: (params: any = {}, url: string) => Axios.get(url, params),

    /* 上架车辆-提交上架车辆信息 */
    submitShelvesVehicle: (params: any = {}, url: string) => Axios.put(url, params),
}