// import jsonp from 'common/js/jsonp.js'
// export function getRecommend () {
//   const url = 'https://h5.ele.me/restapi/shopping/v2/banners'
//   const data = {
//     consumer: 1,
//     type: 1,
//     latitude: 30.507451,
//     longitude: 114.410972
//   }
//   return jsonp(url, data, {
//     param: 'jsonpCallback'
//   })
// }
import axios from 'axios'
export function getBanners () {
  const data = Object.assign({}, {
    consumer: 1,
    type: 1,
    latitude: 30.507451,
    longitude: 114.410972
  })
  return axios.get('/api/banners', {
    params: data
  })
}
// 手机api需要登录
// export function getRecommends (offset = 0, limit = 8, other = {}) {
//   const data = Object.assign({}, {
//     latitude: 30.507451,
//     longitude: 114.410972,
//     offset,
//     limit,
//     extras: ['activities', 'tags'],
//     extra_filters: 'home',
//     rank_id: offset === 0 ? '' : 'b2d76784c48b4a95965886ad72ab5e9c',
//     terminal: 'h5'
//   }, other)
//   return axios.get('/api/recommends', {
//     params: data
//   })
// }
export function getRecommends (offset = 0, limit = 8, other = {}) {
  const data = Object.assign({}, {
    latitude: 30.507451,
    longitude: 114.410972,
    offset,
    limit,
    extras: ['activities', 'tags', 'albums', 'license', 'identification', 'qualification'],
    // extra_filters: 'home',
    // rank_id: offset === 0 ? '' : 'b2d76784c48b4a95965886ad72ab5e9c',
    terminal: 'web',
    geohash: 'wt3mee622q3t'
  }, other)
  return axios.get('/api/recommends', {
    params: data
  })
}

// export function login () {
//   const data = Object.assign({}, {
//     info_raw: {}
//   })
//   return axios.get('/api/login', {
//     params: data
//   })
// }
