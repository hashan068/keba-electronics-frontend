// Import necessary hooks and components from React and React Router
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ComponentForm from './ComponentForm';
import api from '../../../api';

// Create a functional component to display the component details
const ComponentDetails = () => {
  // Use the useParams hook to access the id from the URL
  const { id } = useParams();

  // Use the useEffect hook to fetch data when the component mounts or the id changes
  useEffect(() => {
    if (id) {
      // Make a GET request to the API to fetch the component details
      api
        .get(`/api/inventory/components/${id}/`)
        .then((response) => {
          // Destructure the reorder_level and unit_of_measure from the response data
          const { reorder_level, unit_of_measure } = response.data;
          // Update the state with the new values
          setReorderLevel(reorder_level);
          setUnitOfMeasure(unit_of_measure);
        })
        // Log any errors to the console
        .catch((error) => console.error(error));
    }
  }, [id]);

  // Render the ComponentForm component and pass the id as a prop
  return (
    <div>
      <ComponentForm id={id} />
    </div>
  );
};

export default ComponentDetails;
