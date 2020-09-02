import React from 'react'
import { Table } from 'react-bootstrap'

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
          <Table striped> 
            <tbody>
           <tr><td><a href={blog.url}>url: {blog.url}</a></td></tr>
            <tr> 
                <td>likes: {blog.likes} <button onClick={addLike}> like</button> </td>
                </tr>      
          <tr> 
              <td>added by: {user.username}</td>
          </tr>
          </tbody> 
          </Table> 
      </div>
  )}

export default SingleBlog