import * as types from './mutation-types'
import {loadFavorite, saveFavorite, deleteFavorite} from 'common/js/cache'
function findIndex (foodList, food) {
  let i = -1
  foodList.forEach((item, index) => {
    if (item.item_id === food.item_id && item.spec === food.spec && item.attr === food.attr) {
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

export const loginAction = function ({commit, state}, user) {
  // state.user.id = user.id
  // state.user.favorite = loadFavorite(user.id)
  // console.log('load:' + loadFavorite(user.id))
  // console.log(loadFavorite(user.id))
  commit(types.SET_USER, {
    id: user.id,
    favorite: loadFavorite(user.id)
  })
  commit(types.SET_LOGINED)
}

export const logoutAction = function ({commit}) {
  // state.user.id = 0
  // state.user.favorite = []
  commit(types.SET_USER, {
    id: 0,
    favorite: []
  })
  commit(types.REMOVE_LOGINED)
}
export const pushFavorite = function ({commit}, {id, seller}) {
  commit(types.SET_FAVORITE, saveFavorite(id, seller))
}
export const popFavorite = function ({commit}, {id, seller}) {
  commit(types.SET_FAVORITE, deleteFavorite(id, seller))
}
