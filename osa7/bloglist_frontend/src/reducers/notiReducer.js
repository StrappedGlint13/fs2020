export const setNotification = ( notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTI',
      notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTI',
        notification: '',
      })
    }, time * 500 )

  }
}

export const setError = ( error, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_ERROR',
      error,
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_ERROR',
        error: '',
      })
    }, time * 500 )

  }
}


const notiReducer = (state = 'ALL', action) => {
  switch (action.type) {
  case 'SET_NOTI':
    return action.notification
  case 'SET_ERROR':
    return action.error
  default:
    return state
  }
}

export default notiReducer