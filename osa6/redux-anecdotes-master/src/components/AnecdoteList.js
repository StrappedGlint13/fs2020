import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import  { setNotification }  from '../reducers/notiReducer'

const AnecdoteList = () => {

const anecdotes = useSelector(state => {
    if (state.filter === '') {
        return state.anecdotes
    }
    
    return state.anecdotes.filter(a => a.content
        .toUpperCase()
        .includes(state.filter.toUpperCase()))
})



const dispatch = useDispatch()

const vote = (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
      const changedVote = {
        ...anecdote, votes: anecdote.votes + 1
      }
    dispatch(addVote(id, changedVote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
}

const sorts = anecdotes.sort((a,b) => b.votes - a.votes)

  return (
    <div>
    {sorts.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>  
  )     
}

export default AnecdoteList
