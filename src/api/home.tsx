import axios from '@/api/index'

export default {
    fetchVehicleCluster: (params: any = {}) => axios.get('/vehicle_mtng/cluster', params)
}