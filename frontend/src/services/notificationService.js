// services/notificationService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/notifications/';

const getNotifications = async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
};

export default { getNotifications };
