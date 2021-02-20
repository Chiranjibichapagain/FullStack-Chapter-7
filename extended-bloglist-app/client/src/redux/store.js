import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    blogReducer,
    userReducer,
    notificationReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;