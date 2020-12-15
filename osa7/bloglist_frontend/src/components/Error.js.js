import React from 'react'
import { connect } from 'react-redux'
import { setError } from '../reducers/notiReducer'

const Error = ( props ) => {
  const error = props.error

  if (error === '' || error === 'ALL') {
    return null
  }

  return (
    <div className="error">
      {error}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  }
}


const mapDispatchToProps = {
  setError,
}

const connectedErrors = connect(mapStateToProps,
  mapDispatchToProps)(Error)

export default connectedErrors