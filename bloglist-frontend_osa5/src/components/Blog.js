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
  <div style={blogStyle}>
  <div>
    {blog.title} {blog.author} 
    <Togglable buttonLabel="view" >
      {blog.url}
      <br></br>
      likes {blog.likes}
      <button onClick={addLike}>like</button>
      <br></br>
      {blog.user.username}
      <br></br>
      <button onClick={removeBlog}>remove</button>
    </Togglable>
  </div>
  </div>
)}

export default Blog
