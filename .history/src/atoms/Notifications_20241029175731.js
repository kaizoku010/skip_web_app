// Notification.js
import React from 'react';
import { useNotifications } from './NotificationsContext';
import { Tooltip } from 'antd'; // Assuming you're using Ant Design

const Notification = () => {
  const { notifications } = useNotifications();

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
