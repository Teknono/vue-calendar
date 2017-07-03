import FullCalendar from '@/components/FullCalendar'
import Gmap from '@/components/Gmap'
import Hello from '@/components/Hello'
import Layout from '@/Layout/Layout'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Netatmo',
      name: 'Netatmo',
      component: Layout
    },
    {
      path: '/Map',
      name: 'Map',
      component : Gmap
    },
    {
      path: '/Calendar',
      name: 'Calendar',
      component : FullCalendar
    }
  ]
})
