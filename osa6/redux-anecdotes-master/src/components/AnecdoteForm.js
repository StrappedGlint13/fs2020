import React from 'react'
import { useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import  { setNotification }  from '../reducers/notiReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newV = (event) => {
    event.preventDefault()
    const content = event.target.vote.value
    event.target.vote.value = ''
    dispatch(newVote(content))
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