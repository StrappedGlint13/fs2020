import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Error from './components/Error.js'
import UserList from './components/UserList'
import Blogs from './components/Blogs'
import './App.css'
import Togglable from './components/Togglable'
import  { setNotification, setError }  from './reducers/notiReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, newBlog, 
addLike, removeBlog } from './reducers/reducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import userService from './services/userService'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const blogFormRef= useRef()

  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  const padding = {
    padding: 5
  }



  const dispatch = useDispatch()

  const blogs = useSelector(state => {
    return state.blogs
  })

  let noti = null
  let err = null


  useEffect(() => {
    userService.getAll().then(users =>
      setUsers( users )
    )
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])


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
      likes: 0
    }

    blogFormRef.current.toggleVisibility()

    dispatch(newBlog(blogObject))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    noti = dispatch(setNotification(`a new blog '${blogObject.title}' added`, 10))

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
      noti = dispatch(setNotification(`Welcome ${user.username}`, 10))
    } catch (exception) {
      err = dispatch(setError('invalid username or password', 10))
    }
  }

  const like = (id) => {
      const blog = blogs.find(n => n.id === id)
      console.log(blog)
      const changedBlog = { ...blog, likes: blog.likes + 1 }

      dispatch(addLike(id, changedBlog))
      noti = dispatch(setNotification(`a like added for '${blog.title}'`, 10))
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Error />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id='username'
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  const SortedBlogs = () => {
    return blogs.sort((a,b) => b.likes - a.likes).map(blog =>
      <Blog key={blog.id} blog={blog} user={blog.user} addLike={() => like(blog.id)}
        removeBlog={() => remove(blog)} />
    )

  }

  const remove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`))
        dispatch(removeBlog(blog.id))
        noti = dispatch(setNotification(`${blog.title} deleted`, 10))
      }


  return (
    <Router>
      <div>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in
      <button onClick={() => handleLogout()}>logout</button>
      </div>
      <Notification />
      <Switch>
      <Route path="/blogs/:id">
        <Blogs users={users} />
      </Route>
      <Route path="/blogs">
      <h2>blogs</h2>
      <br></br>
      <h2>create new</h2>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} newTitle={newTitle}
          newAuthor={newAuthor} newUrl={newUrl} handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />
      </Togglable>
      <SortedBlogs/>
      </Route>
      <Route path="/users">
        <UserList users={users} />
      </Route>
    </Switch>
    </Router>
  )
}

export default App