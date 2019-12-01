import Axios from '@/api/index'

export default {
    fetchVehicleDataList: (params: any = {}) => Axios.get('/vehicle_mtng', params)
}