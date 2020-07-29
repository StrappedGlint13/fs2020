import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, addLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <li className='blog'>
    <div style={blogStyle}>
      <div>
        <p id='blogTa'>{blog.title}{blog.author}</p>
        <Togglable buttonLabel="view" >
          <p id='url'>{blog.url}</p>
          <br></br>
      <p id='likes'> likes {blog.likes} </p>
          <button onClick={addLike}>like</button>
          <br></br>
          {blog.user.username}
          <br></br>
          <button onClick={removeBlog}>remove</button>
        </Togglable>
      </div>
    </div>
    </li>
  )}

export default Blog
