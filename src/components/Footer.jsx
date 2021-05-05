import React from "react";
const Footer = () => {
  return (
    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 text-center">
            <div class="copyright my-5 pt-5">
              <p>
                © Copyright 2021 <a href="#">AssiaGroupe</a>, All rights
                reserved.
              </p>
            </div>
            <div class="back">
              <a href="#" class="back-top hide">
                <i class="fas fa-long-arrow-alt-up"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
