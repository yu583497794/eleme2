// import jsonp from 'common/js/jsonp'
// import {options} from './config'
import axios from 'axios'
export function getAvatar () {
  // const url = 'https://api.uomg.com/api/rand.avatar'
  // return jsonp(url, {
  //   format: 'json'
  // }, {
  //   param: 'callback'
  // })
  const url = 'https://api.uomg.com/api/rand.avatar'
  return axios.get(url, {
    params: {
      format: 'json'
    }
  }).then((response) => {
    return response.data
  }).catch(e => {
    console.log(e)
  })
}
