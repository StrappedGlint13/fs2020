import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import  { setNotification }  from '../reducers/notiReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newV = async (event) => {
        event.preventDefault()
        const content = event.target.vote.value
        event.target.vote.value = ''
        dispatch(newAnecdote(content))
        dispatch(setNotification(`You have created a new anecdote`))
        setTimeout(() => {
            dispatch(setNotification(''))
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

export default AnecdoteForm