import React from "react";

const SalesOrder = ({ salesOrder, onDelete }) => {
  const handleDelete = () => {
    onDelete(salesOrder.id);
  };

  return (
    <div>
      <h3>ID: {salesOrder.id}</h3>
      <p>Total Amount: {salesOrder.total_amount}</p>
      <p>Status: {salesOrder.status}</p>
      <p>Customer: {salesOrder.customer}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default SalesOrder;
