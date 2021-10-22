import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  
  const result = useQuery(ALL_BOOKS, {
    onError: (error) => {
      notify([error][0].message)
    }
  })

  const client = useApolloClient()

  const notify = (message) => {    
    setErrorMessage(message)    
    setTimeout(() => {      
      setErrorMessage(null)    
    }, 5000)  
  }
  

  const logout = () => {    
    setToken(null)    
    localStorage.clear()   
    client.cache.reset()
    setPage('authors')  
  }

  

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }
  
  const books = result.data.allBooks

  return (
    <div>
      <div>
      <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout('logout')}>logout</button>
      </div>
      <Authors show={page === 'authors'} setError={notify}
      />
      <Books
        show={page === 'books'} setError={notify} books={books}
      />
      <NewBook
        show={page === 'add'} setError={notify}
      />
      <Recommend
        show={page === 'recommend'} setError={notify}
      />

    </div>
  )
}

const Notify = ({errorMessage}) => {  
  if ( !errorMessage ) {    
    return null  
  }
  
  if (errorMessage === "Response not successful: Received status code 400") {
      return (
      <div style={{color: 'red', fontSize: 19, fontFamily: 'bold'}}>      
        {"Some details are wrong!"}    
      </div> 
    )
  }
  

  return (   
      <div style={{color: 'red', fontSize: 19, fontFamily: 'bold'}}>      
        {errorMessage}    
      </div>  
  )}

export default App