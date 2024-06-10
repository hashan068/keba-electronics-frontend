// PulseSales.jsx
import React from 'react';
import { TableauEmbed } from '@stoddabr/react-tableau-embed-live';

const PulseSales = () => {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Pulse Sales</h1>
      <TableauEmbed 
        sourceUrl='https://prod-apnortheast-a.online.tableau.com/pulse/site/dhananjim20068d4e922f96c/metrics/b2c8ca5f-d649-40aa-a2e5-0a4b9a0aa961?activeDimension=name+%28Sales_product%29'
        width='1000px'
        height='840px'
        hide-tabs
        toolbar='hidden'
      />
    </div>
  );
};

export default PulseSales;
