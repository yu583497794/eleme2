// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Icon from 'vue-svg-icon/Icon.vue'
import VueLazyLoad from 'vue-lazyload'
import resource from './resource/index'
import 'common/stylus/index.styl'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VueReact from 'vue-react'
// import {VuePlugin} from 'vuera'
// eslint-disable-next-line
// import axios from 'axios'
Vue.config.productionTip = false
Vue.component('icon', Icon)
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})
Vue.use(ElementUI)

// Vue.use(VueReact)
// // eslint-disable-next-line
// import RatingEditor from './components/rating-editor/RatingEditor.js'

// Vue.react('Editor', RatingEditor)
// Vue.use(VuePlugin)
// let axios = require('axios')
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// Vue.prototype.$http = axios
/* eslint-disable no-new */
window.eventBus = new Vue()
new Vue({
  el: '#app',
  router,
  resource,
  store,
  render: h => h(App)
})
