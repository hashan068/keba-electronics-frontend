import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import ManufacturingOrder from "../pages/Manufacturing/ManufacturingOrder"; // Corrected import path
import MfgOrderDetails from "../pages/Manufacturing/MfgOrderDetails";

const ManufacturingRoutes = () => (
  <Routes>
    <Route
      path="/mfgorder"
      element={
        <ProtectedRoute>
          <Layout>
            <ManufacturingOrder />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/mfgorder/:id"
      element={
        <ProtectedRoute>
          <Layout>
            <MfgOrderDetails />
          </Layout>
        </ProtectedRoute>
      }
    />
    {/* Add other sales-related routes here */}
  </Routes>
);

export default ManufacturingRoutes;