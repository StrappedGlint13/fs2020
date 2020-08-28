import React from 'react'
import {
  Link
} from "react-router-dom"

const Blog = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle}>
        {blogs.map(blog => <p key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
            {blog.url}</Link>
        </p>)}
    </div>
  )}

export default Blog
