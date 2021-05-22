import React from "react";
import { connect } from "react-redux";
import { deleteComment } from "./../actions/selectedBlog.actions";
import { useParams } from "react-router";
const Comment = ({ comment, deleteComment, ...props }) => {
  const params = useParams();
  const handleDeleteComment = (id) => {
    deleteComment(id, params.id);
  };
  return (
    <>
      <span className="comment-options">
        <span
          className="delete-comment"
          onClick={() => handleDeleteComment(comment._id)}
        >
          <i className="fas fa-times"></i>
        </span>
      </span>
      <li className="comment-item">
        <img
          src={
            comment.userId.imageUrl ||
            "https://noonpost.netlify.app/html/template/assets/img/author/1.jpg"
          }
          alt="comment-avatar"
        />
        <div className="content">
          <ul className="info list-inline">
            <li>
              <b>
                {comment.userId.firstname} {comment.userId.lastname}
              </b>
            </li>
            <li className="dot"></li>
            <li style={{ fontSize: "0.74rem", fontStyle: "italic" }}>
              {new Date(comment.createdAt).toDateString()}
            </li>
          </ul>

          <p>{comment.comment}</p>
          {/* <div>
            <Link to="/" className="link">
              <i className="fas fa-reply"></i> Reply
            </Link>
          </div> */}
        </div>
      </li>
    </>
  );
};

export default connect(null, { deleteComment })(Comment);
