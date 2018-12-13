import * as types from './mutation-types'
function findIndex (foodList, food) {
  let i = -1
  foodList.forEach((item, index) => {
    if (item.item_id === food.item_id && item.spec === food.spec && item.attrs === food.attrs) {
      i = index
      return true
    }
  })
  return i
}
export const addFoodAction = function ({commit, state}, food) {
  let i = findIndex(state.cartList, food)
  if (i >= 0) {
    commit(types.ADD_FOOD_COUNT, i)
  } else {
    food = Object.assign(food, {
      count: 1
    })
    commit(types.ADD_FOOD_ITEM, food)
  }
}

export const minusFoodAction = function ({commit, state}, food) {
  let i = findIndex(state.cartList, food)
  if (i < 0) {
    return
  }
  commit(types.MINUS_FOOD_COUNT, i)
}
