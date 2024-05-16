import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import ManufacturingOrder from "../pages/Manufacturing/ManufacturingOrder";
import MfgOrderDetails from "../pages/Manufacturing/MfgOrderDetails";
import MaterialReq from "../pages/Manufacturing/MaterialReq/MaterialReq";
import MaterialReqDetails from "../pages/Manufacturing/MaterialReq/MaterialReqDetails";
import BOMs from '../pages/Manufacturing/BOMS/BOMs';
import AddBOMForm from '../pages/Manufacturing/BOMS/AddBOMForm';

const ManufacturingRoutes = () => (
  <Routes>
    <Route path="/mfgorder" element={
      <ProtectedRoute>
        <Layout>
          <ManufacturingOrder />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/mfgorder/:id" element={
      <ProtectedRoute>
        <Layout>
          <MfgOrderDetails />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/bom" element={
      <ProtectedRoute>
        <Layout>
          <BOMs />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/bom/new" element={
      <ProtectedRoute>
        <Layout>
          <AddBOMForm />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/materialreq" element={
      <ProtectedRoute>
        <Layout>
          <MaterialReq />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/materialreq/:id" element={
      <ProtectedRoute>
        <Layout>
          <MaterialReqDetails />
        </Layout>
      </ProtectedRoute>
    } />
    {/* Add other sales-related routes here */}
  </Routes>
);

export default ManufacturingRoutes;