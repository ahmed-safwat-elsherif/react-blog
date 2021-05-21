import React from "react";
const Comment = ({ comment }) => {
  return (
    <>
      <h5>X</h5>
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
    </>
  );
};

export default Comment;
