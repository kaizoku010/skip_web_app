import React from "react";
import "./footer.css";
import IC from "../assets/white_logo.png";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";


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
     <div className="social-media-icons">
      <SlSocialFacebook/>
      <SlSocialInstagram/>
      <SlSocialLinkedin/>
      <SlSocialTwitter/>
<SlSocialYoutube/>
     </div>
     <p>Sk!p Events is an events management platform and software product of moxie 5 marketing agency LTD</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
