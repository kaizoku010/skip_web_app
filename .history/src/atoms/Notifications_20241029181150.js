// Notification.js
import React from 'react';
import { AuthContext } from "../logic/AuthContext";
import { Tooltip } from 'antd'; // Assuming you're using Ant Design
import notificationSound from '../assets/sound/ss.pm3';


const Notification = () => {
  const { notifications } = AuthContext();

  return (
    <Tooltip title={
      <div>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notifications.map((note, index) => (
            <p key={index}>{note}</p>
          ))
        )}
      </div>
    }>
      <span style={{ cursor: 'pointer' }}>
        <i className="notification-icon">🔔</i> {/* Replace with your icon */}
      </span>
    </Tooltip>
  );
};

export default Notification;
