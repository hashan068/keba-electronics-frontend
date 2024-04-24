// routes/protectedRoutes.js

import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import ProductDetails from "../pages/ProductDetails";
import SalesOrder from '../pages/SalesOrder';
import SalesOrderForm from '../components/SalesOrderForm';
import SalesOrderDetails from '../pages/SalesOrderDetails';

const protectedRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/product",
    element: (
      <ProtectedRoute>
        <Layout>
          <Product />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/new",
    element: (
      <ProtectedRoute>
        <Layout>
          <ProductDetails />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <ProductDetails />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/salesorder",
    element: (
      <ProtectedRoute>
        <Layout>
          <SalesOrder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/salesorder/new",
    element: (
      <ProtectedRoute>
        <Layout>
          <SalesOrderForm />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default protectedRoutes;
