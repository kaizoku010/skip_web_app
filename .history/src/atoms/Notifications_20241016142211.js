import React from "react";
import "./notifications.css";
import FriendsAndChat from "./FriendsAndChat";

function Notifications() {
  return (
    <div className="notifications">
      <p className="nt_text">New friend request..</p>{" "}
      <p className="nt_text">New  messgae</p>
    </div>
  );
}

export default Notifications;
