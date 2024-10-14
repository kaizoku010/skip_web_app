import React from "react";
import "./recent.css";
import { Typography, Text } from "antd";
import EventImage from "../assets/eyes.png";
import EventImage2 from "../assets/man.png";
import EventImage3 from "../assets/ute.png";



function Recents() {
  const { Title } = Typography;
  const sampleText = "In the process of internal desktop applications development, many different design specs and implementations would be involved, In the process of internal desktop applications development, many different design specs and implementations would be involved"

  return (
    <div className="recents">
      <div className="recents_title">
        <Title level={1}>Our Recent Events</Title>
        <p className="our_recent_desc">{sampleText}</p>
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
        <img src={EventImage} className="recent_img" />
        <div className="recent_text_holder">
        <p className="rth_desc">{sampleText}</p>
        <p className="rth_desc">{sampleText}</p>

        </div>
      </div>
    </div>
  );
}

export default Recents;
