import { combineReducers } from "redux";
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
export default rootReducer;
