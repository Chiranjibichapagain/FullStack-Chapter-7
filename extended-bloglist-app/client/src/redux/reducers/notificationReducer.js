const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      const { payload } = action
      return payload
    default:
      return state;
  }
};

export default notificationReducer