import React from 'react';
import notificationService from '../services/notificationService';

const NotificationWindow = ({ onClose }) => {
  const [notifications, setNotifications] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setError("Failed to load notifications. Please try again later.");
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification-window">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button onClick={onClose}>Close</button>
      </div>
      {error && <p className="error">{error}</p>}
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            {notification.message} - {new Date(notification.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationWindow;