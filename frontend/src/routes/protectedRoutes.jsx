// protectedRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';

const protectedRoutes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  // Add other protected routes here
];

export default protectedRoutes;