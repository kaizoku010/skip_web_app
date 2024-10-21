import React, { useContext, useState } from "react"; 
import "./current_event.css";
import { Collapse, Divider, Modal, Button, notification } from "antd";
import NO_EVENT from "../assets/opps.png"; 
import { Link } from "react-router-dom";
import { AuthContext } from "../logic/AuthContext";

function CurrentEvent({ user, events }) {
  const { sendChatRequest } = useContext(AuthContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);

  const handleAttendeeClick = (attendee) => {
    setSelectedAttendee(attendee);
    setIsModalVisible(true);
  };

  const handleSendChatRequest = async () => {
    const senderId = user?.userId;
    const receiverId = selectedAttendee?.userId;

    // Prevent sending to self
    if (receiverId === senderId) {
      notification.error({
        message: "Cannot Send Request",
        description: "You cannot send a chat request to yourself.",
      });
      return;
    }

    try {
      const result = await sendChatRequest(receiverId);
      notification.success({
        message: "Chat Request Sent",
        description: "Your chat request has been sent successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Request Failed",
        description: "There was an error sending the chat request.",
      });
    }

    setIsModalVisible(false); // Close the modal
  };

  const userEvent = events.find(event =>
    event.attendees.some(attendee => attendee.userEmail === user.userEmail)
  );
  
  if (!userEvent) {
    return (
      <div className="user_current_event">
        <div style={{ color: "gray" }} className="no_event_found">
          <img className="no_data_image" src={NO_EVENT} alt="No event"/>
          <p className="no_event_found_txt">
            Please register for one of our events to unlock the app!
          </p>
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

  return (
    <div className="user_current_event2">
      <p>Active Event</p>
      <div className="event_found">
        <img className="event_image" src={userEvent?.eventImage} alt="Event"/>
        <h4 className="active_event_title">{userEvent?.eventName}</h4>
        <p className="aet_location noMargins"><span className="event-details-span">Organizer :</span>{userEvent?.eventHost}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Time & Date : </span>{userEvent?.eventDate}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Location :</span>{userEvent?.eventLocation}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Status :</span>{userEvent?.eventStatus}</p>
        <p className="aet_location noMargins"><span className="event-details-span">Price :</span>{userEvent?.eventPrice}{" UGX"}</p>
        
        {/* Attendees Section */}
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
                        <img className="current-user-details" src={attendee?.userImage} alt="Profile"/>
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

        {/* Event Pass Section */}
        <div className="event_pass_holder">
          <h4 className="event_pass">YOUR EVENT PASS</h4>
          {/* Add QRCode logic here */}
        </div>
      </div>

      {/* Modal for attendee details */}
      <Modal
        title="User Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleSendChatRequest}
            disabled={selectedAttendee?.isFriend || selectedAttendee?.userId === user?.userId}
          >
            {selectedAttendee?.isFriend ? "Already a Friend" : "Send Friend Request"}
          </Button>,
          <Button key="back" type="primary" danger onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
        ]}
      >
        <div className="sa-clicked-user">
          <img className="sa-userImage" src={selectedAttendee?.userImage} alt="Profile"/>
          <div className="sacu-text">
            <p className="sa-userName"><span className="sc-span">Name :</span> {selectedAttendee?.username}</p>
            <p className="sa-userEmail"><span className="sc-span">Email :</span> {selectedAttendee?.userEmail}</p>
            <p className="sa-userJob"><span className="sc-span">Phone :</span> {selectedAttendee?.contact}</p>
            <p className="sa-userJob"><span className="sc-span">Job :</span> {selectedAttendee?.job}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CurrentEvent;
