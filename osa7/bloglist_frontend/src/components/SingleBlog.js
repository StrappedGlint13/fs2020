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
          <tr>
            <td><a href={blog.url}>{blog.url}</a></td>
          </tr>
          <tr>
            <td>likes:{blog.likes}<button onClick={addLike}>like</button> </td>
          </tr>
          <tr>
            <td>added by:{user.username}</td>
          </tr>
        </tbody>
      </Table>
      <div>
        <h3>Comments</h3>
        {blog.comments
          .map(c =>
            <li key={c.id}>{c.comment}
            </li>)}
      </div>
    </div>

  )}

export default SingleBlog