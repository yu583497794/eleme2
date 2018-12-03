// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Icon from 'vue-svg-icon/Icon.vue'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'
Vue.config.productionTip = false
Vue.component('icon', Icon)
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})
/* eslint-disable no-new */
window.eventBus = new Vue()
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
