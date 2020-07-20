import React from 'react'

const BlogForm = (props) =>
<form onSubmit={props.addBlog}>
<div>
  title: <input value={props.newTitle}
  onChange={props.handleTitleChange} />
</div>
<div>
  author: <input value={props.newAuthor}
  onChange={props.handleAuthorChange} />
</div>
<div>
<div>
  url: <input value={props.newUrl}
  onChange={props.handleUrlChange} />
</div>
<div></div>
  <button type="submit">create</button>
</div>
</form>

export default BlogForm