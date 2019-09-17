import storage from 'good-storage'
const USER_KEY = '__user__'
const LIKE_MAX_LENGTH = 10
function findUser (arr, id) {
  let ret = arr.findIndex((item) => {
    return item.id === Number(id)
  })
  // arr.forEach((item, index) => {
  //   if (item.id === id) {
  //     ret = index
  //     return
  //   }
  // })
  return ret
}
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  // 要插入的val就在arr首
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 在数组前方添加
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
  return arr
}
function deleteFromArray (arr, compare) {
  let index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}
export function saveFavorite (userId, seller) {
  // seller = JSON.stringify(seller)
  let users = storage.get(USER_KEY, [])
  let index = findUser(users, userId)
  let favoriteList
  let user
  if (index < 0) {
    favoriteList = [seller]
    let user = {
      id: userId,
      favorite: [seller]
    }
    users.push(user)
  } else {
    favoriteList = users[index].favorite
    insertArray(favoriteList, seller, (item) => {
      return item.id === seller.id
    }, LIKE_MAX_LENGTH)
    user = {
      id: userId,
      favorite: favoriteList
    }
    users.splice(index, 1, user)
  }
  storage.set(USER_KEY, users)
  return favoriteList
}

export function deleteFavorite (userId, seller) {
  let users = storage.get(USER_KEY, [])
  let index = findUser(users, userId)
  if (index > -1) {
    let favoriteList = users[index].favorite
    deleteFromArray(favoriteList, (item) => {
      return seller.id === item.id
    })
    let user = {
      id: userId,
      favorite: favoriteList
    }
    users.splice(index, 1, user)
    storage.set(USER_KEY, users)
    return favoriteList
  } else {
    return []
  }
}

export function loadFavorite (id) {
  let users = storage.get(USER_KEY, [])
  let index = findUser(users, id)
  return index > -1 ? users[index].favorite : []
}
