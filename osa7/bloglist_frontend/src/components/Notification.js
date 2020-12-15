import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notiReducer'

const Notification = ( props ) => {
  const notification = props.notification


  if (notification === '' || notification === 'ALL') {
    return null
  }

  return (
    <div className="notification">
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