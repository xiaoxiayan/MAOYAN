import Vue from 'vue'
import Router from 'vue-router'

import Movie from '../pages/movie/movie.vue'
import Cinema from '../pages/cinema/cinema.vue'
import Mine from '../pages/mine/mine.vue'
import Find from '../pages/common/find.vue'
import CityList from '../pages/common/CityList'
import BrandCom from '../components/cinemaSetCom/brandCom'
import ServiceCom from '../components/cinemaSetCom/serviceCom'
import SetCom from '../components/cinemaSetCom/setCom.vue'




Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: 'find',
          component: Find,
          props: {
            type: ['cinema', 'movie']
          }
        },
        {
          path: 'cityList',
          component: CityList
        }
      ]
    },
    {
      path: '/cinema',
      component: Cinema,
       children: [
        {
          path: 'find',
          component: Find,
          props: {
            type: ['cinema']
          }
        },
        {
          path: 'cityList',
          component: CityList
        },
        {
          path:"brandCom",
          component:BrandCom
        },
        {
          path:'serviceCom',
          component:ServiceCom
        },
        {
          path:'setCom',
          component:SetCom

        }
      ]
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '**',
      redirect: '/movie'
    }
  ]
})
