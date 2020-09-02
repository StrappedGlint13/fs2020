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
addLike } from './reducers/reducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"
import userService from './services/userService'
import SingleBlog from './components/SingleBlog'
import { Navbar, Nav } from 'react-bootstrap'


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
    padding: 7
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

  const CertainBlog = () => {
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)
    console.log(blog)

    if(!blog || blog === undefined) {
      return null
    }

    return (
      <SingleBlog blog={blog} user={blog.user} addLike={() => like(blog.id)}/>
    )

  }

  return (
    <Router>
      <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
        <Link style={padding} to="/blogs">blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
        <Link style={padding} to="/users">users</Link> 
        </Nav.Link>
        <p style={padding}> {user.name} logged in  </p>
        <Nav.Link href="#" as="span">
        <button onClick={() => handleLogout()}>logout</button>
        </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
      <h1>Blog app</h1>  
      <Notification />
      <Switch>
      <Route path="/users/:id">
        <Blogs users={users} />
      </Route>
      <Route path="/blogs/:id">
        <CertainBlog />
      </Route>
      <Route path="/blogs">
      <br></br>
      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} newTitle={newTitle}
          newAuthor={newAuthor} newUrl={newUrl} handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />
      </Togglable>
      <Blog blogs={blogs}/>
      </Route>
      <Route path="/users">
        <UserList users={users} />
      </Route>
    </Switch>
    </div>
    </Router>
  )
}

export default App