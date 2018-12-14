import * as types from './mutation-types'
const mutation = {
  [types.SET_SELLER] (state, seller) {
    state.seller = seller
  },
  [types.SET_FOOD] (state, food) {
    state.cartList = food
  },
  [types.ADD_FOOD_COUNT] (state, index) {
    state.cartList[index].count++
  },
  [types.ADD_FOOD_ITEM] (state, item) {
    state.cartList.push(item)
  },
  [types.MINUS_FOOD_COUNT] (state, index) {
    state.cartList[index].count--
    if (state.cartList[index].count === 0) {
      state.cartList.splice(index, 1)
    }
  },
  [types.CLEAR_SELLER_CART] (state, sellerId) {
    let list = state.cartList.slice()
    let remove = 0
    state.cartList.forEach((item, index) => {
      if (item.seller === sellerId) {
        list.splice(index - remove, 1)
        // state.cartList.splice(index - remove, 1)
        remove++
      }
    })
    state.cartList = list
  }
}

export default mutation
