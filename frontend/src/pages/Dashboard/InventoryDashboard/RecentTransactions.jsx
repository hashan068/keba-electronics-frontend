import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Stepper, Step, StepLabel, Avatar } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import api from '../../../api';

const RecentTransactions = () => {
  const [consumptionTransactions, setConsumptionTransactions] = useState([]);
  const [replenishTransactions, setReplenishTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsumptionTransactions = api.get('/api/inventory/consumption-transactions/');
    const fetchReplenishTransactions = api.get('/api/inventory/replenish-transactions/');

    Promise.all([fetchConsumptionTransactions, fetchReplenishTransactions])
      .then(([consumptionResponse, replenishResponse]) => {
        setConsumptionTransactions(consumptionResponse.data);
        setReplenishTransactions(replenishResponse.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const transactions = [...consumptionTransactions, ...replenishTransactions].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Recent Transactions
      </Typography>
      <Stepper orientation="vertical" sx={{ py: 2 }}>
        {transactions.length > 0 ? (
          transactions.map(transaction => (
            <Step key={transaction.id}>
              <StepLabel
                icon={
                  transaction.type === 'consumption' ? (
                    <Avatar sx={{ bgcolor: 'red' }}>
                      <RemoveCircleOutlineIcon />
                    </Avatar>
                  ) : (
                    <Avatar sx={{ bgcolor: 'green' }}>
                      <AddCircleOutlineIcon />
                    </Avatar>
                  )
                }
              >
                {new Date(transaction.timestamp).toLocaleTimeString()}
              </StepLabel>
              <Box sx={{ p: 1, border: '1px solid #ccc', borderRadius: '4px', mb: 1 }}>
                <Typography variant="subtitle1">{`Component: ${transaction.component_name}`}</Typography>
                <Typography variant="body2">{`Quantity: ${transaction.quantity}`}</Typography>
                <Typography variant="body2">{`User: ${transaction.user_name}`}</Typography>
                <Typography variant="body2">{`Timestamp: ${new Date(transaction.timestamp).toLocaleString()}`}</Typography>
              </Box>
            </Step>
          ))
        ) : (
          <Typography>No transactions found.</Typography>
        )}
      </Stepper>
    </Box>
  );
};

export default RecentTransactions;