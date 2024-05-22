import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';


import Components from '../pages/Inventory/Components';
import ComponentForm from '../pages/Inventory/ComponentForm';
import ComponentDetails from '../pages/Inventory/ComponentDetails';
import PRs from '../pages/Inventory/PRs';
import POs from '../pages/Inventory/POs';
import PRForm from '../pages/Inventory/PRForm';
import POForm from '../pages/Inventory/POForm';
import PRView from '../pages/Inventory/PRView';
import POView from '../pages/Inventory/POView';



const InventoryRoutes = () => (
  <Routes>
    <Route
      path="/component"
      element={
        <ProtectedRoute>
          <Layout>
            <Components />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/component/new"
      element={
        <ProtectedRoute>
          <Layout>
            <ComponentForm />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/component/:id"
      element={
        <ProtectedRoute>
          <Layout>
            <ComponentDetails />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/purchas-req"
      element={
        <ProtectedRoute>
          <Layout>
            <PRs />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/po"
      element={
        <ProtectedRoute>
          <Layout>
            <POs />
          </Layout>
        </ProtectedRoute>
      }
    />
     <Route
      path="/purchase-requisition/new"
      element={
        <ProtectedRoute>
          <Layout>
            <PRForm />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="purchase-order/new"
      element={
        <ProtectedRoute>
          <Layout>
            <POForm />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/purchase-requisition/:id"
      element={
        <ProtectedRoute>
          <Layout>
            <PRView />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="purchase-order/:id"
      element={
        <ProtectedRoute>
          <Layout>
            <POView />
          </Layout>
        </ProtectedRoute>
      }
    />


  </Routes>
);

export default InventoryRoutes;