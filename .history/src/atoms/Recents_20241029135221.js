import React from "react";
import "./recent.css";
import { Typography, Text } from "antd";
import EventImage from "../assets/cee2.jpg";
import EventImage2 from "../assets/man.jpg";
import EventImage3 from "../assets/cee.jpg";



function Recents() {
  const { Title } = Typography;
  const sampleText = "In the process of internal desktop applications development, many different design specs and implementations would be involved, In the process of internal desktop applications development, many different design specs and implementations would be involved"

  return (
    <div className="recents">
      <div className="recents_title">
        <h3 className="rc_title" level={1}>Our Last Event</h3>
        <p style={{marginTop:"2%", marginBottom:"-10%"}} className="our_recent_desc">{"Imagine walking into a conference, skipping the long registration lines, and instantly connecting with like-minded professionals—all with just a tap on your phone. Sounds like a dream? Welcome to Sk!p, where we make networking a breeze!"}</p>
      </div>
      <div className="recent_event_data">
        <img src={EventImage} className="recent_img" />
        <div className="recent_text_holder">
        <p className="rth_desc">{sampleText}</p>
        <p className="rth_desc">{sampleText}</p>

        </div>
      </div>
      <div className="recent_event_data">
      <div className="recent_text_holder">
        <p className="rth_desc">{sampleText}</p>
        <p className="rth_desc">{sampleText}</p>

        </div>
        <img src={EventImage2} className="recent_img" />
        
      </div>
      <div className="recent_event_data">
        <img src={EventImage3} className="recent_img" />
        <div className="recent_text_holder">
        <p className="rth_desc">{sampleText}</p>
        <p className="rth_desc">{sampleText}</p>

        </div>
      </div>
      <div className="readMore_section">
<button className="readmore_btn">Read More</button>

      </div>
    </div>
  );
}

export default Recents;
