import React from 'react'

const Comment = ({
  addComment,
  comments,
  handelCommentChange
}) =>
  <form onSubmit={addComment}>
    <div>
      <input id={'comments'} value={comments}
        onChange={handelCommentChange} />
      <button id={'comment-button'} type="submit">create</button>
    </div>

    <div>
      <h3>comments</h3>
      {comments.map(comment => <li key={comment}>
        {comment}
      </li>
      )}

    </div>
  </form>

export default Comment