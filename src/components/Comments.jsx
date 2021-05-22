import React, { useState } from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import { postComment } from "./../actions/selectedBlog.actions";
import { useHistory } from "react-router";
const Comments = ({ comments, isCommentLoading, profile, ...props }) => {
  const [comment, setComment] = useState("");
  let history = useHistory();
  const handlePostComment = () => {
    if (profile) {
      props.postComment(comment, props.id);
    } else {
      history.push("/login");
    }
    setComment("");
  };
  return (
    <div className="widget mb-50">
      <div className="title">
        <h5>Leave a Reply</h5>
        <hr style={{ border: "#4b778d solid 0.03rem", width: "60%" }} />
      </div>
      <div className="title">
        <p>
          {comments.length
            ? `${comments.length} Comment(s)`
            : "Be the first comment !"}
        </p>
        <hr style={{ border: "#4b778d solid 0.03rem", width: "60%" }} />
      </div>
      <ul className="widget-comments">
        {comments.map((cmnt) => {
          return <Comment key={cmnt._id} comment={cmnt} />;
        })}
      </ul>

      <div className="widget-form" id="main_contact_form">
        <div
          className="alert alert-success contact_msg"
          style={{ display: "none" }}
          role="alert"
        >
          Your message was sent successfully.
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <textarea
                name="message"
                id="message"
                onInput={(e) => setComment(e.target.value)}
                value={comment}
                cols="30"
                rows="5"
                className="form-control"
                placeholder="Message*"
                required="required"
              ></textarea>
            </div>
          </div>

          <div className="col-12">
            <button
              disabled={isCommentLoading || comment.trim().length === 0}
              onClick={handlePostComment}
              type="submit"
              name="submit"
              className="btn-custom"
            >
              {isCommentLoading ? (
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                "Add comment"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.selectedBlog.blog._id,
    comments: state.selectedBlog.blog.comments,
    isCommentLoading: state.selectedBlog.isCommentLoading,
    profile: state.profile.profile,
  };
};

export default connect(mapStateToProps, { postComment })(Comments);
