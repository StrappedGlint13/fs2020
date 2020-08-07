import reducer from './reducers/anecdoteReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import notiReducer from './reducers/notiReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const store = () => {
    
    const combReducer = combineReducers( {
        anecdotes: reducer,
        notification: notiReducer,
        filter: filterReducer
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