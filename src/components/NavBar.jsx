import React, { useEffect } from "react";
import $ from "jquery";
import { Link, NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "./../actions/profile.action";
import { authLogout } from "./../actions/Auth.actions";
import ProfileIcon from "./profileIcon";

const NavBar = ({
  currentTheme,
  isLoggedIn,
  profile,
  getProfile,
  ...props
}) => {
  let history = useHistory();
  useEffect(() => {
    let lightSwitcher = $("input[type='checkbox']#checkbox");
    lightSwitcher.prop("checked", currentTheme === "dark" ? true : false);
    $(".navbar-toggler").on("click", function () {
      $(".navbar-collapse").toggle("show");
    });

    $(".theme-switch").on("click", () => {
      lightSwitcher.prop("checked", !lightSwitcher.prop("checked"));
    });
    getProfile();
  }, [getProfile, currentTheme]);
  const handleLogout = () => {
    let answer = window.confirm("Did you really want to leave?");
    if (answer) {
      history.push("/login");
      props.authLogout();
    }
    return;
  };
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
            {!isLoggedIn && (
              <Link className="small-screen btn-custom mr-3" to="/login">
                Signup / login
              </Link>
            )}
            {isLoggedIn && (
              <button
                className="small-screen btn-custom mr-3"
                onClick={handleLogout}
              >
                Sign out
              </button>
            )}

            {profile && (
              <div className="small-screen ">
                <ProfileIcon profile={profile} />
              </div>
            )}
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
          {!isLoggedIn && (
            <Link className=" big-screen  btn-custom mr-3" to="/login">
              Signup / login
            </Link>
          )}
          {isLoggedIn && (
            <button
              className=" big-screen  btn-custom mr-3"
              onClick={handleLogout}
            >
              Sign out
            </button>
          )}
          {profile && (
            <div className="big-screen">
              <ProfileIcon profile={profile} />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
const mapStateToProps = (state) => {
  const { isLoggedIn, profile } = state.profile;
  return {
    isLoggedIn,
    profile,
  };
};
export default connect(mapStateToProps, { getProfile, authLogout })(NavBar);
