import React from 'react'

const Error = ({ error }) => {
    if ((error === null || error === undefined)) {
      return null
        }
    return (
      <div className="error">
        {error}
      </div>
    )
    
  }

  export default Error 

