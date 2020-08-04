export const setNotification = notification => {
    return {
      type: 'SET_NOTI',
      notification,
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