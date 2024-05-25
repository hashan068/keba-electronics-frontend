// services/notificationService.js
import api from '../api';

const getNotifications = async () => {
  try {
    const response = await api.get('/api/notifications/notifications/');

    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export default { getNotifications };

