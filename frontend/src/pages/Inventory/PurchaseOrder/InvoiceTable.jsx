import React, { useState } from 'react';
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Paper, TextField, Button
} from '@mui/material';
import { ccyFormat, priceRow, createRow } from './utils';

const InvoiceTable = ({ rows, editable, onPriceChange }) => {
  const [editedPrice, setEditedPrice] = useState(rows[0].price);

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value);
    onPriceChange(e.target.value);
  };

  const invoiceSubtotal = rows.map(({ price }) => price).reduce((sum, i) => sum + i, 0);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">
                {editable ? (
                  <TextField
                    value={editedPrice}
                    onChange={handlePriceChange}
                    type="number"
                    inputProps={{ min: 0, step: 0.01 }}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  ccyFormat(row.price)
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;