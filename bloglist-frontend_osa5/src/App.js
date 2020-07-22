import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Error from './components/Error.js'
import './App.css'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedUser')    
  if (loggedUserJSON) {      
    const user = JSON.parse(loggedUserJSON)      
    setUser(user)      
    blogService.setToken(user.token)    
  }  
}, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
    .create(blogObject)

      
    .then(res => {
      setBlogs(blogs.concat(res))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setMessage(`a new blog '${blogObject.title}' added`)
      setTimeout(()=> {
        setMessage(null)
      }, 5000)
    })
    
  }

  const handleLogin = async (event) => {    
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(        
        'loggedUser', JSON.stringify(user)      ) 


      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Welcome ${user.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setError('invalid username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  if (user === null) {
      return (
        <div>
          <Error error={error} />
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
        </div>
      )
    }

     
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user.name} logged in
      <button onClick={()=>handleLogout()}>logout</button> 
      <br></br>
      <h2>create new</h2>
      <Togglable buttonLabel='new note'>
      <BlogForm addBlog={addBlog} newTitle={newTitle} 
      newAuthor={newAuthor} newUrl={newUrl} handleTitleChange={handleTitleChange}
      handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App