import React from 'react'
import { useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newV = (event) => {
    event.preventDefault()
    const content = event.target.vote.value
    event.target.vote.value = ''
    dispatch(newVote(content))
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