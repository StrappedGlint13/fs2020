import React from 'react'

const SingleBlog = ({ blog, user, addLike }) => {

    if (!blog) {    
        return null  
    }

    if (!user) {    
        return null  
    }

  return (    
      <div>
        <h2>{blog.title} {blog.author}</h2>        
           <a href={blog.url}>url: {blog.url}</a>
      <p>likes: {blog.likes} <button onClick={addLike}> like</button> </p>      
          <p> added by: {user.username} </p>
      </div>
   
  )}

export default SingleBlog