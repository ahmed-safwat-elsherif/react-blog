import axios from "axios";

const blogServer = axios.create({
  baseURL: "http://localhost:3001/api",
});
blogServer.interceptors.request.use(
  (req) => {
    if (
      req.url.includes("/profile") ||
      req.url.includes("/users") ||
      req.url.includes("/blogs/new")
    ) {
      console.log("interceptor");
      req.headers["Authorization"] = localStorage.getItem("token") || "empty";
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default blogServer;
