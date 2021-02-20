
import { getAll } from '../../services/users'
import {login} from '../../services/login'


export const fetchUsers = () => async (dispatch) => {
  try {
    const data = await getAll()
    dispatch({ type: "GET_ALL_USERS", payload: data });
  } catch (error) {
    console.log(error.message)
  }
};

export const logUser = ({username, password}) => async (dispatch) => {
  try {
    const data = await login(username, password)
    dispatch({ type: "LOG_IN", payload: data });
  } catch (error) {
    console.log(error.message)
  }
};




