import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 text-center">
            <div className="copyright my-5 pt-5">
              <p>
                © Copyright 2021 <Link to="/">AssiaGroupe</Link>, All rights
                reserved.
              </p>
            </div>
            <div className="back">
              <Link to="/" className="back-top hide">
                <i className="fas fa-long-arrow-alt-up"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
