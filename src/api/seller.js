import axios from 'axios'
// import {options} from './config'
// import jsonp from 'common/js/jsonp'
export function getMenu (id) {
  const data = Object.assign({}, {
    'restaurant_id': id,
    'terminal': 'web'
  })
  return axios.get('/api/menu', {
    params: data
  })
}

export function getRating (id, limit = 10, offset = 0, record_type = 0) {
  const data = {
    offset,
    limit,
    record_type,
    id
  }
  return axios.get('/api/rating', {
    params: data
  })
}
export function getRatingOverview (id) {
  const data = {
    latitude: 30.515977,
    longitude: 114.414724,
    id
  }
  return axios.get('/api/rating-overview', {
    params: data
  })
}
export function getQualification (id) {
  const data = {
    latitude: 30.515977,
    longitude: 114.414724,
    terminal: 'h5',
    id
  }
  return axios.get('/api/qualification', {
    params: data
  })
}
