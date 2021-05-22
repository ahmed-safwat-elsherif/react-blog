import { applyMiddleware, createStore, compose, combineReducers } from "redux";

import thunk from "redux-thunk";

import { blogsReducer } from "./blogs.reducer";
import { selectedBlogReducer } from "./selectedBlog.reducer";
import { reducer as formReducer } from "redux-form";
import { authReducer } from "./auth";
import { profileReducer } from "./profile.reducer";
import { userReducer } from "./user.reducer";

const rootReducer = combineReducers({
  blogs: blogsReducer,
  selectedBlog: selectedBlogReducer,
  form: formReducer,
  auth: authReducer,
  profile: profileReducer,
  user: userReducer,
});

const comboseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  comboseEnhancers(applyMiddleware(thunk))
);
export default store;
