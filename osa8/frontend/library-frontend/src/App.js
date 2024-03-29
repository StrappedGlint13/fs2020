import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {    
    console.log(message)
    setErrorMessage(message.error.graphQLErrors.message)    
    setTimeout(() => {      
      setErrorMessage(null)    
    }, 10000)  
  }

  return (
    <div>
      <div>
      <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Authors show={page === 'authors'}
      />
      <Books
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add'} setError={notify}
      />

    </div>
  )
}

const Notify = ({errorMessage}) => {  
  if ( !errorMessage ) {    
    return null  
  }  
  return (   
      <div style={{color: 'red'}}>      
      {errorMessage}    
      </div>  
  )}

export default App