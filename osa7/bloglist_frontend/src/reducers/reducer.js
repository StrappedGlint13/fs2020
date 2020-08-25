import blogService from '../services/blogService'

const reducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
      case 'NEW_BLOG':
        return [...state, action.data]
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

  export default reducer