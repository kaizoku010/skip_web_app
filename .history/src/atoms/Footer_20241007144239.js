import React from "react";
import "./footer.css";
import IC from "../assets/white_logo.png";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";
import Logo from "../assets/white_png.png"


function Footer() {
  return (
    <div className="footer">
      {/* <img src={IC} className='footer-ic'/> */}

      <div className="footer_top">
        <div className="ft_section2">
          <img className="ft_logo" src={Logo}/>
        </div>
        <div className="ft_section">
          <h4 className="ft_title">Find Us</h4>
          

        </div>
        <div className="ft_section"></div>
        <div className="ft_section"></div>
      </div>

      <div className="footer_lower">
        <div className="ftl_top_section">
          <p className="copyright">2023-2024 | Sk!p Events. All Rights Reserved </p>
     <div className="social-media-icons">
      <SlSocialFacebook className="ft_ic"/>
      <SlSocialInstagram className="ft_ic"/>
      <SlSocialLinkedin className="ft_ic"/>
      <SlSocialTwitter className="ft_ic"/>
<SlSocialYoutube/>
     </div>
     <p className="skip_footer_about">Sk!p Events is an events management platform and software owned by moxie 5 marketing agency LTD. By using this application, you accept and agree to Sk!p Events' terms of Use and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
