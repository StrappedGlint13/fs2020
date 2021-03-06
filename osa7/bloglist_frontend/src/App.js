import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import BlogsList from './components/BlogsList'
import './App.css'
import Togglable from './components/Togglable'
import  { setNotification }  from './reducers/notiReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, newBlog,
  addLike, setComment } from './reducers/reducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from 'react-router-dom'
import SingleBlog from './components/SingleBlog'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { setLogout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Page } from './components/Styled-Components'
import LoginForm from './components/LoginForm'
import AppFooter from './components/AppFooter'


const App = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [comments, setComments] = useState('')
  const blogFormRef= useRef()

  const padding = {
    padding: 7
  }

  const dispatch = useDispatch()

  const blogs = useSelector(state => {
    return state.blogs
  })

  const user = useSelector(state => {
    return state.user
  })

  const users = useSelector(state => {
    return state.users
  })

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'LOGIN_VIEW',
        user
      })
    }
  }, [dispatch])


  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      comments: comments,
    }

    blogFormRef.current.toggleVisibility()

    dispatch(newBlog(blogObject))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    dispatch(setNotification(`a new blog '${blogObject.title}' added`, 5))
  }


  const addComment = (event, id) => {
    event.preventDefault()
    const comment = {
      comment: comment,
    }

    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, comments: blog.comments.concat(comment) }
    dispatch(setComment(id, changedBlog))
  }

  const like = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    dispatch(addLike(id, changedBlog))
    dispatch(setNotification(`a like added for '${blog.title}'`, 5))
  }

  const handleCommentChange = (event) => {
    setComments(event.target.value)
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
    dispatch(setLogout())
    window.localStorage.removeItem('loggedUser')
  }

  const CertainBlog = () => {
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)

    if(!blog || blog === undefined) {
      return null
    }

    return (
      <SingleBlog blog={blog} user={blog.user}
        addLike={() => like(blog.id)}
        addComment={() => addComment(blog.id)}
        handleCommentChange={handleCommentChange}
        comments={comments}
      />
    )

  }

  if (user === null)  {
    return (<LoginForm />)
  }

  return (
    <Page>
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
                <Nav.Link href="#" as="span">
                  <Button onClick={() => handleLogout()}>logout</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <h1>Blog app</h1>
          <Notification />
          <Switch>
            <Route path="/users/:id">
              <BlogsList users={users} />
            </Route>
            <Route path="/blogs/:id">
              <CertainBlog />
            </Route>
            <Route path="/blogs">
              <br></br>
              <h2>Create new</h2>
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
      <AppFooter />
    </Page>
  )
}

export default App