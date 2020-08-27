import React from 'react'
import {
     useParams
  } from "react-router-dom"

const Blogs = ({ users }) => {

    const id = useParams().id
    const user = users.find(n => n.id === id)
    console.log(id)
    console.log('user', user)
    console.log('users', users)

  return (
    <div>
      <h2> {user.name} </h2>
          {user.blogs.map(blog => <li key={blog.id}>
              {blog.title}
              
          </li>)
          }
          
      </div>
      
  )
  
}

export default Blogs
