import React from "react";
const Contacts = () => {
  return (
    <section className="newslettre">
      <div className="container-fluid">
        <div className="newslettre-width text-center">
          <div className="newslettre-info">
            <h5>Subscribe to our Newslatter</h5>
            <p>
              Sign up for free and be the first to get notified about new posts.
            </p>
          </div>
          <form className="newslettre-form">
            <div className="form-flex">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email adress"
                  required="required"
                />
              </div>
              <button className="submit-btn" type="submit">
                Subscribe
              </button>
            </div>
          </form>
          <div className="social-icones">
            <ul className="list-inline justify-content-center">
              <li>
                <a href="https://google.com" target="_blank">
                  {" "}
                  <i className="fab fa-facebook-f"></i>Facebook
                </a>
              </li>
              <li>
                <a href="https://google.com" target="_blank">
                  {" "}
                  <i className="fab fa-twitter"></i>Twitter{" "}
                </a>
              </li>
              <li>
                <a href="https://google.com" target="_blank">
                  {" "}
                  <i className="fab fa-instagram"></i>Instagram{" "}
                </a>
              </li>
              <li>
                <a href="https://google.com" target="_blank">
                  {" "}
                  <i className="fab fa-youtube"></i>Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
