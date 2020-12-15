import React from 'react'
import {
  useParams
} from 'react-router-dom'

const BlogsList = ({ users }) => {

  const id = useParams().id
  const user = users.find(n => n.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2> {user.name} </h2>
      {user.blogs.map(blog => <p key={blog.id}>
        {blog.title}
      </p>)

      }
    </div>
  )

}

export default BlogsList
