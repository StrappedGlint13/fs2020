import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notiReducer'


const Notification = ( props ) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === '' || notification === null || notification === 'ALL') {
    return <div></div>
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}


const mapDispatchToProps = {
  setNotification,
}

const connectedNotifications = connect(mapStateToProps,
  mapDispatchToProps)(Notification)

export default connectedNotifications