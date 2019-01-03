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
const Seller = (resolve) => {
  import('components/seller/seller').then((module) => {
    resolve(module)
  })
}
const MenuList = (resolve) => {
  import('components/menu-list/menu-list').then((module) => {
    resolve(module)
  })
}
const Rating = (resolve) => {
  import('components/rating/rating').then((module) => {
    resolve(module)
  })
}
const SellerDetail = (resolve) => {
  import('components/seller-detail/seller-detail').then((module) => {
    resolve(module)
  })
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'miste'
    },
    {
      path: '/miste',
      component: Miste,
      children: [
        {
          path: ':id',
          component: Seller,
          children: [
            {
              path: '',
              redirect: 'menu',
              component: MenuList
            },
            {
              // 不加'/',否则找不到正确的router-view出口
              // 以 / 开头的嵌套路径会被当作根路径。
              path: 'menu',
              component: MenuList
            },
            {
              path: 'rating',
              component: Rating
            },
            {
              path: 'seller-detail',
              component: SellerDetail
            }
          ]
        }
      ]
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
      component: Profile
    }
  ]
})
