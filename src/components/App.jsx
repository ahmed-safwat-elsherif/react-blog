import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Blog from "./Blog";
import Blogs from "./Blogs";
import Home from "./Home";
import NavBar from "./NavBar";
import CategoryBlogs from "./CategoryBlogs";
import Contacts from "./Contacts";
import Footer from "./Footer";

const App = () => {
  let [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));
  useEffect(() => {
    const toggleSwitch = document.querySelector(
      '.theme-switch input[type="checkbox"]'
    );
    const logoDark = document.querySelector(".logo-dark");
    const logoWhite = document.querySelector(".logo-white");

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);

      if (currentTheme === "dark") {
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
        <NavBar currentTheme={currentTheme} />
      </header>
      <Switch>
        <Route path="/blogs/:id" component={Blog} />
        <Route path="/category/:name" component={CategoryBlogs} />
        <Route path="/home" component={Home} />
        <Route path="/blogs" component={Blogs} />
        <Route
          path="/not-found"
          render={() => <h3 className="text-center mt-5">Not found</h3>}
        />
        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
      <Contacts />
      <Footer />
    </>
  );
};

export default App;
