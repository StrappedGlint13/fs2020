import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import  { setNotification }  from '../reducers/notiReducer'
import { connect } from 'react-redux' 


const AnecdoteForm = ( props ) => {

    const newV = async (event) => {
        event.preventDefault()
        const content = event.target.vote.value
        event.target.vote.value = ''
        props.newAnecdote(content)
        props.setNotification(`You have created a new anecdote`)
        setTimeout(() => {
            props.setNotification('')
        }, 5000)
  }

  return (
    <form onSubmit={newV}>
    <div>
      <input name="vote" />
      </div>
    <button type="submit">create</button>
  </form>
  )
}

export default connect(
    null, 
    {newAnecdote, setNotification})
    (AnecdoteForm)