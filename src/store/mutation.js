import * as types from './mutation-types'
const mutation = {
  [types.SET_SELLER] (state, seller) {
    state.seller = seller
  }
}

export default mutation
