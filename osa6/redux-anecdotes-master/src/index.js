import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store  from './store'

const store_1 = store()


ReactDOM.render(
  <Provider store={store_1}>
    <App />
  </Provider>,
  document.getElementById('root')
)