
import { getAll, createBlog, deleteBlog, changeBlog} from '../../services/blogs'

export const fetchBlogs = () => async (dispatch) => {
  try {
      const data = await getAll();
      console.log('in-action', data)
    dispatch({ type: "GET_ALL_BLOGS", payload: data });
  } catch (error) {
    console.log(error.message)
  }
};

export const create = (newBlog) => async (dispatch) => {
  try {
    await createBlog(newBlog)
    dispatch({ type: "ADD_BLOG", payload: newBlog });
  } catch (error) {
    console.log(error.message)
  }
};

export const vote = (changedBlog) => async (dispatch) => {
  try {
    
    const data = await changeBlog(changedBlog)
    dispatch({ type: "VOTE_BLOG", payload: data });
  } catch (error) {
    console.log(error.message)
  }
};



export const blogDelete = (id) => async (dispatch) => {
  try {
    await deleteBlog(id)
    dispatch({ type: "DELETE_BLOG", payload: id });
  } catch (error) {
    console.log(error.message)
  }
};
