import anecdoteService from '../services/anecdotes'


export const addVote = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, anecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: updatedAnecdote
    })
    
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANEC',
      data: newAnecdote
    })
    
  }
}


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const changedVote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }
      return state.map(vote => vote.id !== id? vote : changedVote)
    case 'NEW_ANEC':
      return [...state, action.data]
    case 'INIT':
      return action.data
  default: 
  return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
    
  }
}



export default reducer