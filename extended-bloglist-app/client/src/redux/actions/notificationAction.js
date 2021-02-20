
export const newNotification = (notification) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_NOTIFICATION", payload: notification });
  } catch (error) {
    console.log(error.message)
  }
};


