import reducer from './reducers/anecdoteReducer'
import { createStore, combineReducers } from 'redux'
import notiReducer from './reducers/notiReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = () => {
    
    const combReducer = combineReducers( {
        anecdotes: reducer,
        notification: notiReducer,
        filter: filterReducer
    })

    const stor = createStore(
        combReducer,
        composeWithDevTools()
    )

    return (
        stor
    )
    
}


export default store