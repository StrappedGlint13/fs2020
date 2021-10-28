import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const title = subscriptionData.data.bookAdded.title
      const author = subscriptionData.data.bookAdded.author.name
      notify(`Book added: ${title} by ${author}`)
    }
  })

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
        show={page === 'books'} setError={notify}
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