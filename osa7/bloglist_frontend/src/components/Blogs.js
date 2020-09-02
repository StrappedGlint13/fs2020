import React from 'react'
import {
     useParams
  } from "react-router-dom"
const Blogs = ({ users }) => {

    const id = useParams().id
    const user = users.find(n => n.id === id)

    if (!user) {    
        return null  
    }

  return (
    <div>
      <h2> {user.name} </h2>
          {user.blogs.map(blog => <tr key={blog.id}>
              {blog.title}         
          </tr>)
          
          }
   </div>
  )
  
}

export default Blogs
