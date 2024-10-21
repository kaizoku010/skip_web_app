import React, { useContext, useState } from "react";
import "./current_event.css";
import { Collapse, Divider } from "antd";
import { Space,QRCode } from "antd";
import NO_EVENT from "../assets/opps.png" 
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { AuthContext } from "../logic/AuthContext";

function CurrentEvent({user, events}) {
  const { sendChatRequest } = useContext(AuthContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);

  const handleAttendeeClick = (attendee) => {
 console.log("Reciever Id: ", attendee)
    setSelectedAttendee(attendee);
    setIsModalVisible(true);
  };


  const handleSendChatRequest = () => {
    // Function to send the chat request here
    sendChatRequest(selectedAttendee);
    setIsModalVisible(false);
  };



  const userEvent = events.find(event => 
    event.attendees.some(attendee => attendee.userEmail === user.userEmail)
  );
  
  if (!userEvent) {
    return (
      <div className="user_current_event">
        <div style={{color:"gray"}} className="no_event_found">
        <img className="no_data_image" src={NO_EVENT}/>
          <p className="no_event_found_txt">
            Please regesiter for one of our events to unlock the app!</p>
            <Link className="start_here" to="/">Start Here</Link>
          </div>
      </div>
    );
  }


  let agenda = [];
  try {
    agenda = JSON.parse(userEvent.agenda);
  } catch (error) {
    console.error("Failed to parse agenda:", error);
  }

  // console.log("user event id:", userEvent)


  return (
    <div className="user_current_event2">
        <p>Active Event</p>
      <div className="event_found">
        <img className="event_image"  src={userEvent?.eventImage}/>
        <h4 className="active_event_title">{userEvent?.eventName}</h4>
        <p className="aet_location noMargins"><span className="event-details-span">Organizer :</span>{userEvent?.eventHost}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Time & Date : </span>{userEvent?.eventDate}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Location :</span>{userEvent?.eventLocation}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Status :</span>{userEvent?.eventStatus}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Price :</span>{userEvent?.eventPrice}{" UGX"}</p>
        
        <div className="collapse-me">
            <Divider orientation="left">Event Agenda, Sessions & Speakers</Divider>
            <Collapse
            items={agenda.map((session, index) => ({
              key: index,
              label: `Session: ${session.session}`,
              children: (
                <div key={index}>
                  <div className="current-user-section">
                    {/* <img className="current-user-details" src={profileImg} alt="Profile" /> */}
                    <div className="cu-text">
                      <p className="cu-username no-type">Speaker: {session.speaker}</p>
                      <p className="cu_user_email no-type">Title: {session.title}</p>
                      <p className="cu_user_job no-type">Time: {session.time}</p>
                    </div>
                  </div>
                </div>
              ),
            }))}
            
            defaultActiveKey={['1']} 
            />
          </div>

          {/* attendee collapse */}
          <div className="collapse-me">
            <Divider orientation="left">All Attendees</Divider>
            <Collapse
            
              items={[
                {
                  key: "1",
                  label: "Click to show a list of your fellow attendees",
                  children: (
                    <div>
                      {userEvent?.attendees.map((attendee, index) => (
                        <div key={index}
                        onClick={() => handleAttendeeClick(attendee)}
                        className="current-user-section attendee">
                          <img className="current-user-details" src={attendee?.userImage} alt="Profile" />
                          <div className="cu-text">
                            <p className="cu-username no-type">{attendee.username}</p>
                            <p className="cu_user_email no-type">{attendee.userEmail}</p>
                            <p className="cu_user_job no-type">{attendee.job}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
              
              defaultActiveKey={['1']} 
            />
          </div>
          
<div className="event_pass_holder">
<h4 className="event_pass">YOUR EVENT PASS</h4>
<div className="qr-code-div"></div>

<Space direction="vertical" align="center">
      <QRCode value={`${userEvent?.attendeeId} ${userEvent?.userEmail}`} />
 
    </Space>
    
</div>
      </div>
    
    {/* Modal to show attendee details */}
    <Modal
        title="User Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
        
          <Button
            key="submit"
            type="primary"
            onClick={handleSendChatRequest}
            disabled={selectedAttendee?.isFriend} // Disable if already friends
          >
            {selectedAttendee?.isFriend ? "Already a Friend" : "Send Friend Request"}
          </Button>,
            <Button danger  key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
        ]}
      >
        <div className="sa-clicked-user">
        <img className="sa-userImage" src={selectedAttendee?.userImage}/>
          <div className="sacu-text">
                 <p className="sa-userName"><span className="sc-span">Name :</span> {selectedAttendee?.username}</p>
        <p className="sa-userEmail" ><span className="sc-span">Email :</span> {selectedAttendee?.userEmail}</p>
        <p className="sa-userJob"><span className="sc-span">Phone :</span>  {selectedAttendee?.contact}</p>
        <p className="sa-userJob"><span className="sc-span">Job :</span> {selectedAttendee?.job}</p>

          </div>
   
        </div>
      
        {/* Add more details as needed */}
      </Modal>
    </div>
  );
}

export default CurrentEvent;
