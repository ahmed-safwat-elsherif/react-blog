import axios from "axios";

const blogServer = axios.create({
  // baseURL: "http://localhost:3001/api",
  baseURL: "https://api-blog-mern-app.herokuapp.com/api",
});
blogServer.interceptors.request.use(
  (req) => {
    if (
      req.url.includes("/profile") ||
      req.url.includes("/users") ||
      req.url.includes("/blogs") ||
      req.url.includes("/images")
    ) {
      req.headers["Authorization"] = localStorage.getItem("token") || "empty";
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default blogServer;
