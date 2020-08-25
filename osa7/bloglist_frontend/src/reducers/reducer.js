import blogService from '../services/blogService'

const reducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
      case 'NEW_BLOG':
        return [...state, action.data]
      case 'ADD_LIKE':
          const id = action.data.id
          const blogToLike = state.find(n => n.id === id)
          const changedBlog = {
              ...blogToLike, likes: blogToLike.likes + 1
          }
          return state.map(like => like.id !== id? like : changedBlog) 
      case 'REMOVE_BLOG':
            const deletedId = action.data
            console.log(deletedId)
            return state.filter(a => a.id !== deletedId)
      case 'INIT':
            return action.data
    default: 
    return state
    }
  }

  export const newBlog = ( blog ) => {
    return async dispatch => {
        const new_blog = await blogService.create(blog)
        dispatch({
          type: 'NEW_BLOG',
          data: new_blog
        })
        
      }
  }

  export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
          type: 'INIT',
          data: blogs,
        })
    }
  }

  export const addLike = (id, blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id, blog)
        dispatch({
          type: 'ADD_LIKE',
          data: updatedBlog
        })
        
      }
  }

  export const removeBlog = (id) => {
      return async dispatch => {
           await blogService.remove(id)
          dispatch({
              type:'REMOVE_BLOG',
              data: id
          })
      }
  }

  export default reducer