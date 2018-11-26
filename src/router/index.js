import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 懒加载 按需异步加载
const Miste = (resolve) => {
  import('components/miste/miste').then((module) => {
    resolve(module)
  })
}
const Order = (resolve) => {
  import('components/order/order').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}
const Profile = (resolve) => {
  import('components/profile/profile').then((module) => {
    resolve(module)
  })
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/miste'
    },
    {
      path: '/miste',
      component: Miste
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/profile',
      compnent: Profile
    }
  ]
})
