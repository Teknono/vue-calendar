import Detail from '@/components/Detail'
import FileSystem from '@/components/FileSystem'
import FullCalendar from '@/components/FullCalendar'
import LastFm from '@/components/LastFm'
import Router from 'vue-router'
import Vue from 'vue'
import VueCharts from '@/components/Charts'

Vue.use(Router)

export default new Router({
  linkExactActiveClass : 'is-active',
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: LastFm
    },
    {
      path: '/Calendar',
      name: 'Calendar',
      component : FullCalendar
    },
    {
      path: '/Detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/FileSystem',
      name: 'FileSystem',
      component: FileSystem
    },
       {
      path: '/Charts',
      name: 'Charts',
      component: VueCharts
    }
  ]
})
