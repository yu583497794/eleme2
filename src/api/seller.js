import axios from 'axios'
// import {options} from './config'
// import jsonp from 'common/js/jsonp'
export function getMenu (id) {
  const data = Object.assign({}, {
    'restaurant_id': id,
    'terminal': 'web'
  })
  return axios('/api/menu', {
    params: data
  })
}
