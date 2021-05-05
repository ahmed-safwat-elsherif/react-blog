import React from "react";
const Comment = () => {
  return (
    <li className="comment-item">
      <img
        src="https://noonpost.netlify.app/html/template/assets/img/author/1.jpg"
        alt="comment avatar photo"
      />
      <div className="content">
        <ul className="info list-inline">
          <li>Simon Albert</li>
          <li className="dot"></li>
          <li>January 15, 2021</li>
        </ul>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          at doloremque adipisci eum placeat quod non fugiat aliquid sit
          similique!
        </p>
        <div>
          <a href="#" className="link">
            <i className="fas fa-reply"></i> Reply
          </a>
        </div>
      </div>
    </li>
  );
};

export default Comment;
