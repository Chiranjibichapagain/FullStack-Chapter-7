
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_BLOGS":
      return state.concat(action.payload)
      case "VOTE_BLOG":
        const changedBlog = action.payload
        return state.map((blog) => blog.id !== changedBlog.id ? blog : changedBlog)
      case "DELETE_BLOG":
        const id = action.payload
        const clearedData = state.filter((blog) => blog.id !== id)
        return clearedData
      case "ADD_BLOG":
        const newBlog = action.payload
        return state.concat(newBlog)
      default:
      return state;
  }
};

export default blogReducer