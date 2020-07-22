import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
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
      <button type="like">like</button>
      <br></br>
      {blog.user.username}
    </Togglable>
  </div>
  </div>
)}

export default Blog
