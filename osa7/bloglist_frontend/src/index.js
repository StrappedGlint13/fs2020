import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store  from './store'

const store_1 = store()


ReactDOM.render( <Provider store={store_1}>
    <App />
    </Provider>, document.getElementById('root'))