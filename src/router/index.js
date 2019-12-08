
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import TodoPage from '../pages/TodoPage'
import AllTodoList from '../pages/AllTodoList'
import Actived from '../pages/Actived'
import Unfinish from '../pages/Unfinish'
import About from '../components/About'
import SwlcJzOld from '../pages/SwlcJz'
import swlcFgjzsp from '../pages/swlc/fgjzsp'
import swlcJz from '../pages/swlc/swlcJz'
import swlcCx from '../pages/swlc/swlcCx'
import swlcCxLclx0 from '../pages/swlc/swlcCxLclx0'
import swlcCxLclx2 from '../pages/swlc/swlcCxLclx2'
import SidebarTest from '../pages/SidebarTest'

export default new VueRouter({
   routes: [
     {
       path: '/',
       redirect: '/todo'
     },
       {
           path: '/todo',
           component: TodoPage,
           meta: {
               title: '待办任务'
           }
       },
     {
       path: '/all',
       component: AllTodoList
     },
    {
      path: '/actived',
      component: Actived
    },
     {
       path: '/unfinish',
       component: Unfinish
     },
       {
           path: '/about',
           component: About
       },
       {
           path: '/swlcJzOld',
           component: SwlcJzOld
       },
       {
           path: '/swlcJz',
           component: swlcJz
       },
       {
           path: '/swlcFgjzsp',
           component: swlcFgjzsp
       },
       {
           path: '/swlcCx',
           component: swlcCx,
           meta: {
               title: '文件查询'
           }
       },
       {
           path: '/swlcCxLclx2',
           component: swlcCxLclx0
       },
       {
           path: '/test1',
           component: SidebarTest
       },
       {
           path: '/swlcCxLclx0',
           component: swlcCxLclx2
       }
  ]
})