import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Recommend=()=>import('@/components/recommend/recommend');
const Singer=()=>import('@/components/singer');
const Rank =()=>import('@/components/rank');
const Paly=()=>import('@/components/player/player');
const RankList=()=>import('@/components/ranklist');
const Search=()=>import('@/components/search');
const SingerDetail=()=>import('@/components/singer-detail');
const User=()=>import('@/components/user');


export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path:'/recommend',
      component:Recommend
    },
    {
      path:'/user',
      component:User
    },
    {
      path:'/singer',
      component:Singer,
      children:[
        {
          path:':id',
          component:SingerDetail
        }
      ]
    },
    {
      path:'/rank',
      component:Rank,
      children:[
        {
          path:':id',
          component:RankList
        }
      ]
    },
    {
      path:'/search',
      component:Search,
      children:[
        {
          path:'singer/:id',
          component:SingerDetail
        }
      ]
    }
  
  ]
})
