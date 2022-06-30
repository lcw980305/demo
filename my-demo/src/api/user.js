import { LOCALSTORAGE_NAME } from '../constants'

export const addUser = (user) => {
  const list = listUsers()
  if (list.find((u) => u.id === user.id)) {
    console.error('已经存在')
  }
  list.push(user)
  localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(list))
}

export const editUser = (user) => {
  const list = listUsers()
  const users = list.map((u) => {
    if (u.id === user.id) {
      return user
    }
    return u
  })
  localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(users))
}

export const deleteUser = (user) => {
  const list = listUsers()
  const users = list.filter((u) => u.id !== user.id)
  localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(users))
}

export const listUsers = () => {
  const users = localStorage.getItem(LOCALSTORAGE_NAME)
  if (users) {
    try {
      return JSON.parse(users)
    } catch (error) {
      return []
    }
  }
  return []
}
