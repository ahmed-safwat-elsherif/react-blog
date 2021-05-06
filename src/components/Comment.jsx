import React from "react";
import { Link } from "react-router-dom";
const Comment = ({ comment }) => {
  return (
    <li className="comment-item">
      <img
        src="https://noonpost.netlify.app/html/template/assets/img/author/1.jpg"
        alt="comment avatar photo"
      />
      <div className="content">
        <ul className="info list-inline">
          <li>
            {comment.userId.firstname} {comment.userId.lastname}
          </li>
          <li className="dot"></li>
          <li>{new Date(comment.createdAt).toDateString()}</li>
        </ul>

        <p>{comment.comment}</p>
        {/* <div>
          <Link to="/" className="link">
            <i className="fas fa-reply"></i> Reply
          </Link>
        </div> */}
      </div>
    </li>
  );
};

export default Comment;
