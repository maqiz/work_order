import Axios from '@/api/index'

export default {
    fetchVehicleCluster: (params: any = {}) => Axios.get('/vehicle_mtng/cluster', params)
}