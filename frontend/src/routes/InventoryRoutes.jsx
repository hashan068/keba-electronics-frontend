import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';


import Components from '../pages/Inventory/Components';
import ComponentForm from '../pages/Inventory/ComponentForm';



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
    {/* <Route
      path="/inventory/component/:id"
      element={
        <ProtectedRoute>
          <Layout>
            <ProductDetails />
          </Layout>
        </ProtectedRoute>
      }
    /> */}

    
  </Routes>
);

export default InventoryRoutes;