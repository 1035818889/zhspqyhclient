
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import TodoPage from '../pages/TodoPage'
import swlcFgjzsp from '../pages/swlc/fgjzsp'
import zbksfgjzsp from '../pages/swlc/zbksfgjzsp'
import yskfgjz from '../pages/swlc/yskfgjz'
import swlcJz from '../pages/swlc/swlcJz'
import typyJldsp from '../pages/swlc/typyJldsp'
import typyJzsp from '../pages/swlc/typyJzsp'
import bgbJzjdSp from '../pages/swlc/bgbJzjdSp'
import bgbFgjzSp from '../pages/swlc/bgbFgjzSp'
import ksyiAdjustFgjzsp from '../pages/swlc/ksyiAdjustFgjzsp'
import swlcCx from '../pages/swlc/swlcCx'
import swlcCxLclx0 from '../pages/swlc/swlcCxLclx0'
import swlcCxLclx1 from '../pages/swlc/swlcCxLclx1'

import tzxmjsJz from '../pages/tzxmjs/Jz'
import tzxmjsJjkFgjz from '../pages/tzxmjs/JjkFgjz'
import tzxmjsCgzjKsFgjz from '../pages/tzxmjs/CgzjKsFgjz'
import tzxmjsCx from '../pages/tzxmjs/TzxmjsCx'
import tzxmjsCxForId from '../pages/tzxmjs/tzxmjsCxForId'

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
           path: '/swlcJz',
           component: swlcJz
       },
       {
           path: '/swlcFgjzsp',
           component: swlcFgjzsp
       },
       {
           path: '/yskfgjz',
           component: yskfgjz
       },
       {
           path: '/zbksfgjzsp',
           component: zbksfgjzsp
       },
       {
           path: '/typyJldsp',
           component: typyJldsp
       },
       {
           path: '/typyJzsp',
           component: typyJzsp
       },
       {
           path: '/bgbJzjdSp',
           component: bgbJzjdSp
       },
       {
           path: '/bgbFgjzSp',
           component: bgbFgjzSp
       },
       {
           path: '/ksyiAdjustFgjzsp',
           component: ksyiAdjustFgjzsp
       },
       {
           path: '/swlcCx',
           component: swlcCx,
           meta: {
               title: '文件查询'
           }
       },
       {
           path: '/swlcCxLclx0',
           component: swlcCxLclx0
       },
       {
           path: '/swlcCxLclx1',
           component: swlcCxLclx1
       },
       {
           path: '/tzxmjsJz',
           component: tzxmjsJz
       },
       {
           path: '/tzxmjsJjkFgjz',
           component: tzxmjsJjkFgjz
       },
       {
           path: '/tzxmjsCgzjKsFgjz',
           component: tzxmjsCgzjKsFgjz
       },
       {
           path: '/tzxmjsCx',
           component: tzxmjsCx
       },
       {
           path: '/tzxmjsCxForId',
           component: tzxmjsCxForId
       }
  ]
})