import React from "react";
import Comment from "./Comment";
const Comments = ({ comments }) => {
  return (
    <div className="widget mb-50">
      <div className="title">
        <h5>
          {comments.length
            ? `${comments.length} Comment(s)`
            : "Be the first comment"}
        </h5>
        <hr style={{ border: "#4b778d solid 0.03rem", width: "60%" }} />
      </div>
      <ul className="widget-comments">
        {comments.map((cmnt) => {
          return <Comment key={cmnt._id} comment={cmnt} />;
        })}
      </ul>
      <div className="title">
        <h5>Leave a Reply</h5>
        <hr style={{ border: "#4b778d solid 0.03rem", width: "60%" }} />
      </div>
      <form
        className="widget-form"
        action="#"
        method="POST"
        id="main_contact_form"
      >
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
                cols="30"
                rows="5"
                className="form-control"
                placeholder="Message*"
                required="required"
              ></textarea>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" name="submit" className="btn-custom">
              Post Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comments;
