import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // Import the Layout component
import ProductDetails from "./pages/ProductDetails";
import SalesOrder from './pages/SalesOrder';
import SalesOrderForm from './components/SalesOrderForm';
// import SalesOrderDetails from './pages/SalesOrderDetails'
import MfgOrder from './pages/ManufacturingOrder';


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
                <MfgOrder />
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
  );
}

export default App;
