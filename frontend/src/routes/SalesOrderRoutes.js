
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import SalesOrder from '../pages/SalesOrder';
import SalesOrderForm from '../components/SalesOrderForm';

const SalesOrderRoutes = () => (
  <ProtectedRoute>
    <Layout>
      <SalesOrder />
    </Layout>
  </ProtectedRoute>
);

const SalesOrderFormRoutes = () => (
  <ProtectedRoute>
    <Layout>
      <SalesOrderForm />
    </Layout>
  </ProtectedRoute>
);

export {
  SalesOrderRoutes,
  SalesOrderFormRoutes
};
