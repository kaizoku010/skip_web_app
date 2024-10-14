import React from "react";
import "./footer.css";
import IC from "../assets/white_logo.png";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";
import { SlPhone } from "react-icons/sl";
import { SlLocationPin } from "react-icons/sl";
import { SlEnvolope } from "react-icons/sl";

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
       <div className="ft_ics_text">
 <div className="ft_ic_text">
<SlLocationPin className="ft_ic_tf"/>
<p className="ft_desc">Ntinda, Opposite Capital Shoppers</p>
          </div>
          <div className="ft_ic_text">
<SlPhone className="ft_ic_tf"/>
<p className="ft_desc">+256-971-151</p>
          </div>
          <div className="ft_ic_text">
<SlEnvolope className="ft_ic_tf"/>
<p className="ft_desc">sales@skipug.app</p>
          </div>
       </div>
         

        </div>
        <div className="ft_section">
        <h4 className="ft_title">Useful Links</h4>
        <div className="ft_ics_text">
 <div className="ft_ic_text">
<p className="ft_desc">About moxie5agency</p>
          </div>
          <div className="ft_ic_text">
<p className="ft_desc">Careers</p>
          </div>
          <div className="ft_ic_text">
<p className="ft_desc">Blog</p>
          </div>
       </div>
        </div>
        <div className="ft_section">
        <h4 className="ft_title">Contact</h4>
        <div className="ft_ics_text">
 <div className="ft_ic_text">
<p className="ft_desc">info@moxie5agency.com</p>
          </div>
          <div className="ft_ic_text">
<p className="ft_desc">jobs@moxie5agency.com</p>
          </div>
          <div className="ft_ic_text">
<p className="ft_desc">Ski</p>
          </div>
       </div>
        </div>
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
