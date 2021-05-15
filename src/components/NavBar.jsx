import React, { useEffect } from "react";
import $ from "jquery";
import { Link, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "./../actions/profile.action";
import { authLogout } from "./../actions/Auth.actions";

const NavBar = ({ currentTheme, isAuth, user, ...props }) => {
  useEffect(() => {
    let lightSwitcher = $("input[type='checkbox']#checkbox");
    lightSwitcher.prop("checked", currentTheme == "dark" ? true : false);
    $(".navbar-toggler").on("click", function () {
      $(".navbar-collapse").toggle("show");
    });

    $(".theme-switch").on("click", () => {
      lightSwitcher.prop("checked", !lightSwitcher.prop("checked"));
    });
    props.getProfile();
  }, []);
  const handleLogout = () => {
    props.authLogout();
    return <Redirect to="/home" />;
  };
  console.log("is Auth", isAuth);
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-scroll">
        <div className="container-fluid">
          <div className="logo">
            <Link to="/">
              <img
                src="assets/img/logo-dark.png"
                alt=""
                className="logo-dark"
              />
              <img
                src="assets/img/logo-white.png"
                alt=""
                className="logo-white"
              />
            </Link>
          </div>

          <div className="navbar-right ml-auto">
            <div className="small-screen theme-switch-wrapper">
              <label className="theme-switch" htmlFor="checkbox">
                <input type="checkbox" id="checkbox" />
                <div className="slider round"></div>
              </label>
            </div>
            {!isAuth && (
              <Link className="small-screen btn-custom mr-3" to="/login">
                Signup / login
              </Link>
            )}
            {isAuth && (
              <Link className="small-screen btn-custom mr-3" to="/login">
                Sign out
              </Link>
            )}

            <div className="small-screen search-icon">
              <i className="fas fa-search"></i>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#main_nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse text-center navbar-collapse" id="main_nav">
            <ul className="navbar-nav ml-auto mr-auto">
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/home"
                  data-toggle="dropdown"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/blogs"
                  data-toggle="dropdown"
                >
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/about"
                  data-toggle="dropdown"
                >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="big-screen theme-switch-wrapper">
            <label className="theme-switch" htmlFor="checkbox">
              <input type="checkbox" id="checkbox" />
              <div className="slider round"></div>
            </label>
          </div>
          {!isAuth && (
            <Link className=" big-screen  btn-custom mr-3" to="/login">
              Signup / login
            </Link>
          )}
          {isAuth && (
            <button
              className=" big-screen  btn-custom mr-3"
              onClick={handleLogout}
            >
              Sign out
            </button>
          )}
          <div className="big-screen search-icon">
            <i className="fas fa-search"></i>
          </div>
        </div>
      </nav>
    </>
  );
};
const mapStateToProps = (state) => {
  console.log("navbar visited");
  return {
    isAuth: state.profile.isAuth,
    user: state.profile.user,
  };
};
export default connect(mapStateToProps, { getProfile, authLogout })(NavBar);
