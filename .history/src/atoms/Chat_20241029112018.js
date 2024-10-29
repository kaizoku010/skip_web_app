import { Avatar, Collapse } from "antd";
import { useContext, useState } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";
import TestImg from "../assets/pp.jpg";

const Chat = () => {
  const { all_attended=[], chatRooms=[], user } = useContext(AuthContext);
  const [chatMembers, setChatMembers] = useState();
  // Assuming currentUser contains the current user's email
  // console.log("chat rooms: ", chatRooms);
  // console.log("all attendees: ", all_attended);

  const { Panel } = Collapse;

  // Function to get user details from attendee list based on participant's email
  const getAttendeeInfo = (email) => {
    return all_attended?.find((attendee) => attendee.userEmail === email);
  
  
  };


  console.log("friend list")

  return (
    <div className="chat-div">
      <Collapse
        items={[
          {
            key: "1",
            label: "Sk!p Friends",
            children: (
              <div>
                {chatRooms.length > 0 ? (
                  chatRooms.map((room) => {
                    // Filter participants, excluding the current user
                    const otherParticipants = room.participants.filter(
                      (email) => email !== user.userEmail
                    );

                    // Map the other participants to display their info
                    return otherParticipants.map((participantEmail) => {
                      const participantInfo = getAttendeeInfo(participantEmail);
                      // setChatMembers(participantInfo)
                      if (!participantInfo) {
                        return null; // If no attendee info is found, skip rendering
                      }

                      return (
                        <div key={room.chatRoomId} className="chat-room-item">
                          <Avatar
                            className="sf-image"
                            src={participantInfo?.userImage || TestImg} // You can replace this with participantInfo's image if available
                          />
                          <div className="chat-preview-content">
                            <p className="userName">
                              {participantInfo.username || "Unknown User"}
                            </p>
                            {/* <p className="msg-excpt">
                              Contact: {participantInfo.contact}
                            </p> */}
                          </div>
                        </div>
                      );
                    });
                  })
                ) : (
                  <p>No Friends Yet :'(</p>
                )}
              </div>
            ),
          },
        ]}
      ></Collapse>
    </div>
  );
};

export default Chat;
