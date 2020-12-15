import loginService from '../services/loginService'
import blogService from '../services/blogService'
import { setError } from '../reducers/notiReducer'

const userReducer = (state = null, action) => {
  console.log('state: ' + JSON.stringify(state))
  console.log('action: ' + JSON.stringify(action))
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGIN_VIEW':
    blogService.setToken(JSON.stringify(action.user.token))
    return action.user
  case 'LOGOUT':
    window.localStorage.removeItem('loggedUser')
    blogService.setToken('')
    return action.data
  default:
    return state
  }
}

export const setLogout = () => {
  return  {
    type: 'LOGOUT',
    data: null
  }
}

export const setLogin = ( user ) => {
  return async dispatch => {
    try {
      const logged_user = await loginService.login(user)
      const userJSON = JSON.stringify(logged_user)
      blogService.setToken(userJSON.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userJSON))
      await dispatch({
        type: 'LOGIN',
        data: userJSON,
      })
    } catch (e) {
      dispatch(setError('invalid username or password', 5))
    }
  }
}

export default userReducer