
export const setNotification = ( notification, time) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTI',
        notification,
      })
      setTimeout(() => {
        dispatch({
            type: 'SET_NOTI',
            notification: null,
          })
      }, time * 500 )
      
    }
  }
  const notiReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'SET_NOTI':
        return action.notification
      default:
        return state
    }
  }

  export default notiReducer