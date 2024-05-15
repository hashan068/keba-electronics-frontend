import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';

import Product from '../pages/Sales/Product';
import ProductDetails from '../pages/ProductDetails';
import SalesOrder from '../pages/Sales/SalesOrder';
import SalesOrderForm from '../components/SalesOrderForm';
import SalesOrderDetails from '../pages/Sales/SalesOrderDetails';
import Quotations from '../pages/Sales/Quotations';
import QuotationDetail from '../pages/Sales/QuotationDetail';
import QuotationForm from '../components/QuotationForm';

const SalesRoutes = () => (
  <Routes>
    <Route
      path="/product"
      element={
        <ProtectedRoute>
          <Layout>
            <Product />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/product/new"
      element={
        <ProtectedRoute>
          <Layout>
            <ProductDetails />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/product/:id"
      element={
        <ProtectedRoute>
          <Layout>
            <ProductDetails />
          </Layout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/quotations/"
      element={
        <ProtectedRoute>
          <Layout>
            <Quotations />
          </Layout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/quotations/new"
      element={
        <ProtectedRoute>
          <Layout>
            <QuotationForm />
          </Layout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/quotation/:id"
      element={
        <ProtectedRoute>
          <Layout>
            <QuotationDetail />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/salesorder"
      element={
        <ProtectedRoute>
          <Layout>
            <SalesOrder />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/salesorder/:id"
      element={
        <ProtectedRoute>
          <Layout>
            <SalesOrderDetails />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/salesorder/new"
      element={
        <ProtectedRoute>
          <Layout>
            <SalesOrderForm />
          </Layout>
        </ProtectedRoute>
      }
    />

    {/* Add other sales-related routes here */}
  </Routes>
);

export default SalesRoutes;