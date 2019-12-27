import Axios from '@/api/index'

export default {
    /* 工单列表-获取工单列表数据 */
    fetchWorkOrderDataList: (params: any = {}, url: string) => Axios.get(url, params),

    /* 工单列表-获取工单信息 */
    fetchWorkOrderData: (params: any = {}, url: string) => Axios.get(url, params),

    /* 工单列表-领取工单任务 */
    receiveWorkOrder: (params: any = {}, url: string) => Axios.put(url, params),
}