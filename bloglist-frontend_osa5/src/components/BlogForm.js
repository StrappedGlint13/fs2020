import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl,
}) =>
  <form onSubmit={addBlog}>
    <div>
  title: <input id={'title'} value={newTitle}
        onChange={handleTitleChange} />
    </div>
    <div>
  author: <input id={'author'} value={newAuthor}
        onChange={handleAuthorChange} />
    </div>
    <div>
      <div>
  url: <input id={'url'} value={newUrl}
          onChange={handleUrlChange} />
      </div>
      <div></div>
      <button id={'create-button'} type="submit">create</button>
    </div>
  </form>


BlogForm.propTypes= {
  addBlog: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newTitle: PropTypes.func.isRequired,
  newAuthor: PropTypes.func.isRequired,
  newUrl: PropTypes.func.isRequired,
}

export default BlogForm