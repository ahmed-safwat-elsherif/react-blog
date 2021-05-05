import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BlogCard from "./BlogCard";
import Comments from "./Comments";
import { fetchBlogById } from "./../actions/selectedBlog.actions";

const errorHangler = (errMsg) => <div className="text-danger">{errMsg}</div>;

const loadingHandler = () => <div className="text-primary">Loading ..</div>;

const Blog = (props) => {
  useEffect(() => {
    let { id } = props.match.params;
    props.fetchBlogById(id);
    console.log(props);
  }, []);
  if (props.isLoading) return <div>{loadingHandler()}</div>;
  if (props.errMsg) return <div>{errorHangler(props.errMsg)}</div>;
  return (
    <section class="container-fluid main">
      <div class="flex-container">
        <div class="flex-child-7">
          {props.blog && <BlogCard blog={props.blog} />}
        </div>
        <div class="flex-child-1 p-y-5">
          <Comments />
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = ({ selectedBlog }) => {
  console.log(selectedBlog);
  return {
    blog: selectedBlog.blog,
    isLoading: selectedBlog.isLoading,
    errMsg: selectedBlog.errMsg,
  };
};
export default connect(mapStateToProps, { fetchBlogById })(Blog);
