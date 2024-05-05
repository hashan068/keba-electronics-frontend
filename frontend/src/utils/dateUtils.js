// src/utils/dateUtils.js

// Assuming the date values from the API are in the format "YYYY-MM-DD"
export const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }

  const dateValue = new Date(dateString);

  if (isNaN(dateValue.getTime())) {
    // Handle invalid date format
    console.error('Invalid date format:', dateString);
    return '';
  }

  const year = dateValue.getFullYear();
  const month = String(dateValue.getMonth() + 1).padStart(2, '0');
  const day = String(dateValue.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};