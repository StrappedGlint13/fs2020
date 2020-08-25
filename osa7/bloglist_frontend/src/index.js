import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store  from './store'
import { initializeBlogs } from './reducers/reducer'
import blogService from './services/blogService'


const store_1 = store()


blogService.getAll().then(blogs =>
    store_1.dispatch(initializeBlogs(blogs))
   )

ReactDOM.render( <Provider store={store_1}>
    <App />
    </Provider>, document.getElementById('root'))