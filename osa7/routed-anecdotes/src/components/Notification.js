import React, { useState } from 'react'

const Notification = ({ notification }) => {
    if ((notification === null || notification === undefined)) {
      return null
        }
    return (
      <div className="notification">
        {notification}
      </div>
    )
    
  }

  export default Notification