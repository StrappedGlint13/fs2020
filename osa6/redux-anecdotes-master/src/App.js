import React from 'react'
import { useDispatch } from 'react-redux'
import { newVote } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'


const App = () => {
  const dispatch = useDispatch()

  const newV = (event) => {
    event.preventDefault()
    const content = event.target.vote.value
    event.target.vote.value = ''
    dispatch(newVote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <form onSubmit={newV}>
        <div>
          <input name="vote" />
          </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App