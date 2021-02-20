const initialState = {
  allUsers: [],
  loggedUser:null
}

const userReducer = (state =initialState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      const { payload:users } = action
      return state.allUsers.push(users)
    case "LOG_IN":
      const { payload:userInfo } = action
      return state.loggedUser=userInfo
    default:
      return state;
  }
};

export default userReducer