import React from "react";
import "./current_event.css";
import Nice from "../assets/nice.png"
import { Collapse, Divider } from "antd";
import profileImg from "../assets/bree.png"; // Replace with your local image
import QR from "../assets/qr.png"


function CurrentEvent({user, events}) {
  
  console.log("passed events: ", events)
  const existingAttendee = event.attendees.find(attendee => attendee.userEmail === email);

  
  let event = 1;
  if (event === 0) {
    return (
      <div className="user_current_event">
        <div className="no_event_found">🥺 No Event Data found....</div>
      </div>
    );
  }
  return (
    <div className="user_current_event2">
        <p>Active Event</p>
      <div className="event_found">
        <img className="event_image"  src={Nice}/>
        <h4 className="active_event_title">UHI Event</h4>
        <p className="aet_location noMargins"><span className="event-details-span">Organizer :</span>Mubende</p>
        <p className="aet_location noMargins"><span className="event-details-span">Time & Date : </span>22:00PM 12/33/2024</p>
        <p className="aet_location noMargins"><span className="event-details-span">Location :</span>Mubende</p>
        <p className="aet_location noMargins"><span className="event-details-span">Status :</span>Ongoing</p>
        <p className="aet_location noMargins"><span className="event-details-span">Price :</span>300,000ugx</p>

<div className="event_pass_holder">
<h4 className="event_pass">YOUR EVENT PASS</h4>
<img className="qr_code" src={QR}/>
</div>
       
        
        <div className="collapse-me">
            <Divider orientation="left">Event Speakers</Divider>
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Click to show a list of all current event speakers",
                  children: (
                    <div>
                      <div className="current-user-section">
                        <img
                          className="current-user-details"
                          src={profileImg}
                          alt="Profile"
                        />
                        <div className="cu-text">
                          <p className="cu-username no-type">Muneza Dixon</p>
                          <p className="cu_user_email no-type">
                            dixonvstheworld@gmail.com
                          </p>
                          <p className="cu_user_job no-type">Moxie5 Agency</p>
                        </div>
                      </div>
                      <div className="current-user-section">
                        <img
                          className="current-user-details"
                          src={profileImg}
                          alt="Profile"
                        />
                        <div className="cu-text">
                          <p className="cu-username no-type">Muneza Dixon</p>
                          <p className="cu_user_email no-type">
                            dixonvstheworld@gmail.com
                          </p>
                          <p className="cu_user_job no-type">Moxie5 Agency</p>
                        </div>
                      </div>
                      <div className="current-user-section">
                        <img
                          className="current-user-details"
                          src={profileImg}
                          alt="Profile"
                        />
                        <div className="cu-text">
                          <p className="cu-username no-type">Muneza Dixon</p>
                          <p className="cu_user_email no-type">
                            dixonvstheworld@gmail.com
                          </p>
                          <p className="cu_user_job no-type">Moxie5 Agency</p>
                        </div>
                      </div>
                      <div className="current-user-section">
                        <img
                          className="current-user-details"
                          src={profileImg}
                          alt="Profile"
                        />
                        <div className="cu-text">
                          <p className="cu-username no-type">Muneza Dixon</p>
                          <p className="cu_user_email no-type">
                            dixonvstheworld@gmail.com
                          </p>
                          <p className="cu_user_job no-type">Moxie5 Agency</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}

              defaultActiveKey={['1']} 
            />
          </div>
          <div className="collapse-me">
            <Divider orientation="left">All Attendees</Divider>
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Click to show a list of your fellow attendees",
                  children: (
                    <div>
                      <div className="current-user-section">
                        <img
                          className="current-user-details"
                          src={profileImg}
                          alt="Profile"
                        />
                        <div className="cu-text">
                          <p className="cu-username no-type">Muneza Dixon</p>
                          <p className="cu_user_email no-type">
                            dixonvstheworld@gmail.com
                          </p>
                          <p className="cu_user_job no-type">Moxie5 Agency</p>
                        </div>
                      </div>
                      <div className="current-user-section">
                        <img
                          className="current-user-details"
                          src={profileImg}
                          alt="Profile"
                        />
                        <div className="cu-text">
                          <p className="cu-username no-type">Muneza Dixon</p>
                          <p className="cu_user_email no-type">
                            dixonvstheworld@gmail.com
                          </p>
                          <p className="cu_user_job no-type">Moxie5 Agency</p>
                        </div>
                      </div>
                      <div className="current-user-section">
                        <img
                          className="current-user-details"
                          src={profileImg}
                          alt="Profile"
                        />
                        <div className="cu-text">
                          <p className="cu-username no-type">Muneza Dixon</p>
                          <p className="cu_user_email no-type">
                            dixonvstheworld@gmail.com
                          </p>
                          <p className="cu_user_job no-type">Moxie5 Agency</p>
                        </div>
                      </div>
                      <div className="current-user-section">
                        <img
                          className="current-user-details"
                          src={profileImg}
                          alt="Profile"
                        />
                        <div className="cu-text">
                          <p className="cu-username no-type">Muneza Dixon</p>
                          <p className="cu_user_email no-type">
                            dixonvstheworld@gmail.com
                          </p>
                          <p className="cu_user_job no-type">Moxie5 Agency</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}

              defaultActiveKey={['1']} 
            />
          </div>
      </div>
    </div>
  );
}

export default CurrentEvent;
