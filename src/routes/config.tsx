import React from 'react'
import Loadable from '@loadable/component'

/* 有菜单模块 */
const routerMenu = [
    {
        key: 'home',
        exact: true,
        auth: false,
        path: '/',
        component: Loadable(() => import('@/views/home'))
    }
]
/* 单独，没有菜单模块 */
const routerNotMenu = [
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