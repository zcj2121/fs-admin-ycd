import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/tables',
    hidden: true
  },
  {
    path: '/tables',
    component: Layout,
    redirect: 'tables/table',
    meta: { title: 'tables', icon: 'file-text' },
    children: [
      {
        path: 'table',
        name: 'table',
        component: () => import('@/views/tables/table/index'),
        meta: { title: 'table', icon: 'file' }
      },
      {
        path: 'plan',
        name: 'plan',
        component: () => import('@/views/tables/plan/index'),
        meta: { title: 'plan', icon: 'file' }
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: 'system/role',
    alwaysShow: true, // will always show the root menu
    meta: { title: '系统管理', icon: 'cog' },
    children: [
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role/index'),
        meta: { title: '角色管理', icon: 'user-secret', roles: ['admin', 'editor'] }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user/index'),
        meta: { title: '用户管理', icon: 'users', roles: ['admin'] }
      }
    ]
  },
  // { path: '*', redirect: '/404', hidden: true }
]
