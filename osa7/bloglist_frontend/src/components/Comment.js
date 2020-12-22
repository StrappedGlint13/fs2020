import React from 'react'

const Comment = ({
  addComment,
  comments,
  handleCommentChange
}) =>
  <form onSubmit={addComment}>
    <div>
      <input id={'comments'} value={comments}
        onChange={handleCommentChange} />
      <button id={'comment-button'} type="submit">create</button>
    </div>

    <div>
      <h3>comments</h3>
      {comments.map(c => <li key={c}>
        {c.comment}
      </li>
      )}

    </div>
  </form>

export default Comment