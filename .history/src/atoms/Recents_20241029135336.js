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
        <p className="our_recent_desc">{"Imagine walking into a conference, skipping the long registration lines, and instantly connecting with like-minded professionals—all with just a tap on your phone. Sounds like a dream? Welcome to Sk!p, where we make networking a breeze!"}</p>
      </div>
      <div className="recent_event_data">
        <img src={EventImage} className="recent_img" />
        <div className="recent_text_holder">
        <p className="rth_desc">{"With Sk!p, you can wave goodbye to awkward introductions and say hello to meaningful connections. Our app is like your personal networking assistant, matching you with the right people and providing ice-breakers to get the conversation flowing. No more fumbling for business cards—Sk!p’s got you covered with virtual ones!"}</p>
        <p className="rth_desc">{"Need a front-row seat? No problem! Sk!p’s venue diagramming tool lets you pre-book your seat, so you’re always in the perfect spot. Whether you want to be close to the action or need a quick escape route, you choose where you sit. This means less stress and more focus on making those valuable connections."}</p>

        </div>
      </div>
      <div className="recent_event_data">
      <div className="recent_text_holder">
        <p className="rth_desc">{"Welcome to the future of networking with Sk!p, a cutting-edge conference management tool designed to make connecting easier than ever before. Developed by Moxie5 Marketing Agency, Sk!p is here to transform how you engage, network, and grow at events. Say goodbye to the awkwardness of manual check-ins and missed connections; Sk!p is here to ensure you make the most of every event you attend."}</p>
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
