import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from './Styled-Components'

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
  title: <Input id={'title'} value={newTitle}
        onChange={handleTitleChange} />
    </div>
    <div>
  author: <Input id={'author'} value={newAuthor}
        onChange={handleAuthorChange} />
    </div>
    <div>
      <div>
  url: <Input id={'url'} value={newUrl}
          onChange={handleUrlChange} />
      </div>
      <div></div>
      <Button id={'create-button'} type="submit">Create</Button>
    </div>
  </form>


BlogForm.propTypes= {
  addBlog: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired,
}

export default BlogForm