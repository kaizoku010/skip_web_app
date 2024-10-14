import React from "react";
import "./current_event.css";
import Nice from "../assets/nice.png"
import { Collapse, Divider } from "antd";
import profileImg from "../assets/bree.png"; // Replace with your local image
import QR from "../assets/qr.png"
import { Space,QRCode } from "antd";

function CurrentEvent({user, events}) {
  
  const userEvent = events.find(event => 
    event.attendees.some(attendee => attendee.userEmail === user.userEmail)
  );

  // console.log("user is attending this event", userEvent)

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
        <h4 className="active_event_title">{userEvent?.eventName}</h4>
        <p className="aet_location noMargins"><span className="event-details-span">Organizer :</span>{userEvent?.eventHost}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Time & Date : </span>{userEvent?.eventDate}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Location :</span>{userEvent?.eventLocation}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Status :</span>{userEvent?.eventStatus}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Price :</span>{userEvent?.eventPrice}{" UGX"}</p>

<div className="event_pass_holder">
<h4 className="event_pass">YOUR EVENT PASS</h4>
<div className="qr-code-div"></div>
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
