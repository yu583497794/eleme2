import * as types from './mutation-types'
const mutation = {
  [types.SET_SELECTED] (state, selected) {
    state.selected = selected
  }
}

export default mutation
