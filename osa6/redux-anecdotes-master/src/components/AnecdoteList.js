import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import  { setNotification }  from '../reducers/notiReducer'

const AnecdoteList = () => {

const anecdotes = useSelector(state => {
    if (state.filter === '') {
        return state.anecdotes
    }
    
    const sorts = state.anecdotes.sort((a,b) => b.votes - a.votes)

    return sorts.filter(a => a.content
        .toUpperCase()
        .includes(state.filter.toUpperCase()))
})



const dispatch = useDispatch()

const vote = (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(addVote(id))
    dispatch(setNotification
        (`You voted "${anecdote.content}"`))
    setTimeout(() => {
        dispatch(setNotification(''))
    }, 5000)
}



  return (
    <div>
    {anecdotes.map(anecdote =>
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
