// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Sales/Product";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // Import the Layout component
import ProductDetails from "./pages/ProductDetails";
import SalesOrder from './pages/Sales/SalesOrder';
import SalesOrderForm from './components/SalesOrderForm';

import Quotations from './pages/Sales/Quotations';
import QuotationDetail from './pages/Sales/QuotationDetail';
import QuotationForm from './components/QuotationForm';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SalesOrderDetails from "./pages/Sales/SalesOrderDetails";
import ManufacturingOrder from "./pages/Manufacturing/ManufacturingOrder";

const theme = createTheme({
  palette: {
    primary: {
      main: "#263238"
    },
    secondary: {
      main: "#494c7d"
    }
  }
});
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
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
                  <SalesOrder /> {/* render the SalesOrder component */}
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/salesorder/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <SalesOrderDetails /> {/* render the SalesOrder component */}
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

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
