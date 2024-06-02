import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../api';

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSalesData = () => {
    setLoading(true);
    api
      .get('/api/sales/orders/')
      .then((res) => {
        const transformedData = res.data.flatMap((order) =>
          order.order_items.map((item) => ({
            date: order.created_at_date,
            sales: parseFloat(item.price) * item.quantity,
          }))
        );

        // Group data by date and sum sales for each day
        const groupedData = transformedData.reduce((acc, current) => {
          const existingDate = acc.find((item) => item.date === current.date);
          if (existingDate) {
            existingDate.sales += current.sales;
          } else {
            acc.push(current);
          }
          return acc;
        }, []);

        setSalesData(groupedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSalesData();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Sales Over Time
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default SalesChart;
