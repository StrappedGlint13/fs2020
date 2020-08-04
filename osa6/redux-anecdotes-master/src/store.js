import reducer from './reducers/anecdoteReducer'
import { createStore } from 'redux'

const Store = () => {
    
    const store = createStore(reducer)

    return (
        store
    )
} 

export default Store