// routes/LoginRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';

const DashboardRoutes = () => (
  <ProtectedRoute>
    <Layout>
      <Dashboard />
    </Layout>
  </ProtectedRoute>
);

export default (
  <Route path="/" element={<DashboardRoutes />} />
);
