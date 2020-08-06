import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store  from './store'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const store_1 = store()

anecdoteService.getAll().then(anecdotes =>
 store_1.dispatch(initializeAnecdotes(anecdotes))
)

ReactDOM.render(
  <Provider store={store_1}>
    <App />
  </Provider>,
  document.getElementById('root')
)