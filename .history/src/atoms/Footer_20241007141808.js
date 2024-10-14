import React from "react";
import "./footer.css";
import IC from "../assets/white_logo.png";

function Footer() {
  return (
    <div className="footer">
      {/* <img src={IC} className='footer-ic'/> */}

      <div className="footer_top">
        <div className="ft_section"></div>
        <div className="ft_section"></div>
        <div className="ft_section"></div>
        <div className="ft_section"></div>
      </div>

      <div className="footer_lower">
        <div className="ftl_top_section">
          <p className="copyright">2023-2024 | Sk!p Events. All Rights Reserved </p>
     <div className="social-media"></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
