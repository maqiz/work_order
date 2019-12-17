import Axios from '@/api/index'

export default {
    /* 工单列表-获取工单列表数据 */
    fetchWorkOrderDataList: (params: any = {}) => Axios.get('/work_order', params),
}