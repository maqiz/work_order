import Loadable from '@loadable/component'

/* 有菜单模块 */
const routerMenu = [
    {
        key: 'vehicle',
        exact: true,
        auth: true,
        path: '/vehicle',
        component: Loadable(() => import('@/views/vehicle'))
    },
    {
        key: 'workOrder',
        exact: true,
        auth: true,
        path: '/workOrder',
        component: Loadable(() => import('@/views/work-order'))
    },
    {
        key: 'center',
        exact: true,
        auth: true,
        path: '/center',
        component: Loadable(() => import('@/views/center'))
    },
    {
        key: 'home',
        exact: true,
        auth: true,
        path: '/',
        component: Loadable(() => import('@/views/home'))
    }
]
/* 单独，没有菜单模块 */
const routerNotMenu = [
    {
        key: 'handleWorkOrder',
        exact: true,
        auth: true,
        path: '/handleWorkOrder',
        component: Loadable(() => import('@/views/handle-work-order'))
    },
    {
        key: 'receiveWorkOrder',
        exact: true,
        auth: true,
        path: '/receiveWorkOrder',
        component: Loadable(() => import('@/views/receive-work-order'))
    },
    {
        key: 'vehicleShelves',
        exact: true,
        auth: true,
        path: '/vehicleShelves',
        component: Loadable(() => import('@/views/vehicle-shelves'))
    },
    {
        key: 'login',
        exact: true,
        auth: false,
        path: '/login',
        component: Loadable(() => import('@/views/login'))
    }
]

export {
    routerMenu,
    routerNotMenu
}