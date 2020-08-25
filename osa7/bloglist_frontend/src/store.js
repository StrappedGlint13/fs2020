import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notiReducer from './reducers/notiReducer'

const store = () => {
    
    const combReducer = combineReducers( {
        notification: notiReducer,
        error: notiReducer,
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