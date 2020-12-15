import React from 'react'
import { Table } from 'react-bootstrap'
import Comment from './Comment'

const SingleBlog = ({ blog, user, addLike, addComment, comments, handelCommentChange }) => {

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
      <Comment addComment={addComment} comments={comments}
        handelCommentChange={handelCommentChange}/>
    </div>

  )}

export default SingleBlog