import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notiReducer from './reducers/notiReducer'
import reducer from './reducers/reducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

const store = () => {

  const combReducer = combineReducers( {
    notification: notiReducer,
    error: notiReducer,
    user: loginReducer,
    blogs: reducer,
    users: usersReducer,
  })

  const stor = createStore(
    combReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )

  return (
    stor
  )

}


export default store