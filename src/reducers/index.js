import { combineReducers } from "redux";
import { blogsReducer } from "./blogs.reducer";
import { selectedBlogReducer } from "./selectedBlog.reducer";
const rootReducer = combineReducers({
  blogs: blogsReducer,
  selectedBlog: selectedBlogReducer,
});
export default rootReducer;
