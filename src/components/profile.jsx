import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import BlogCard from "./BlogCard";
import LoadingSpinner from "./UI_Components/Loading_spinner";
import ErrorHandler from "./UI_Components/Error_handler";
import { getUser } from "./../actions/user.actions";

const Profile = ({ profile, user, isLoading, errMsg, ...props }) => {
  useEffect(() => {
    const id = props.match.params.id;

    props.getUser(id);
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (errMsg) {
    return <ErrorHandler errMsg={errMsg} />;
  }
  const isAuth = user._id == profile?._id;
  return (
    <>
      <div
        style={{
          width: "20rem",
        }}
        className="widget newslettre-form  mx-auto text-center register"
      >
        <div className="image-wrapper">
          <img
            src="https://noonpost.netlify.app/html/template/assets/img/author/1.jpg"
            alt="profile"
            className="profile-image"
          />
          <div>
            <h3>
              {user.firstname} {user.lastname}
            </h3>
          </div>
          {isAuth && (
            <label htmlFor="change-image">
              <span className="change-image-icon">
                <i className="fas fa-camera"></i>
              </span>
            </label>
          )}
          <input
            type="file"
            id="change-image"
            onInput={console.log}
            style={{ display: "none" }}
          />
        </div>
        <div className="profile-details">
          {isAuth && (
            <Link
              to={`/profile/${user._id}/edit`}
              className="edit-profile-icon"
            >
              <i className="far fa-edit"></i>
            </Link>
          )}
        </div>

        <div>blogs: ({user.blogs.length}) blogs</div>
      </div>

      <Switch>
        <Route path="/profile/:id/edit" component={EditProfile} />
      </Switch>
      <hr />
      <div className="user-blogs text-center">
        <h2>Blogs</h2>
        {user?.blogs?.length === 0 ? (
          <div>
            <p>No blogs were posted yet</p>
          </div>
        ) : (
          <div className="container-fluid">
            <div className="columns">
              {user.blogs.map((blog) => {
                return <BlogCard key={blog._id} blog={blog} />;
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { profile } = state.profile;
  const { isLoading, errMsg, user } = state.user;
  return {
    isLoading,
    errMsg,
    profile,
    user,
  };
};

export default connect(mapStateToProps, { getUser })(Profile);
