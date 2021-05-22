import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Blog from "./Blog";
import Blogs from "./Blogs";
import Home from "./Home";
import NavBar from "./NavBar";
import CategoryBlogs from "./CategoryBlogs";
import Contacts from "./Contacts";
import Footer from "./Footer";
import Signup from "./Signup";
import Page404 from "./Page404";
import Login from "./Login";
import Profile from "./profile";
import NewBlog from "./NewBlog";
import EditBlog from "./EditBlog";

const App = () => {
  useEffect(() => {
    const toggleSwitch = document.querySelector(
      '.theme-switch input[type="checkbox"]'
    );
    const logoDark = document.querySelector(".logo-dark");
    const logoWhite = document.querySelector(".logo-white");

    if (localStorage.getItem("theme")) {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme")
      );

      if (localStorage.getItem("theme") === "dark") {
        toggleSwitch.checked = true;
        document.body.classList.toggle("dark");
        logoDark.classList.add("display-none");
        logoWhite.classList.add("display-block");
      }
    }

    const switchTheme = (e) => {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        document.body.classList.add("dark");
        logoDark.classList.add("display-none");
        logoWhite.classList.add("display-block");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        document.body.classList.remove("dark");
        logoDark.classList.remove("display-none");
        logoWhite.classList.remove("display-block");
      }
    };

    toggleSwitch.addEventListener("change", switchTheme, false);
  }, []);
  return (
    <>
      <header>
        <NavBar currentTheme={localStorage.getItem("theme")} />
      </header>
      <div className="body main mx-0 w-100">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/category/:name" component={CategoryBlogs} />
          <Route path="/blogs/blog/:id" component={Blog} />
          <Route path="/blog/new" component={NewBlog} />
          <Route path="/blog/edit/:id" component={EditBlog} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/not-found" component={Page404} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
      <Contacts />
      <Footer />
    </>
  );
};

export default App;
