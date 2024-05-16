// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // Import the Layout component

import SalesRoutes from './routes/salesRoutes';
import ManufacturingRoutes from './routes/ManufacturingRoutes';
import InventoryRoutes from './routes/InventoryRoutes';

import { ThemeProvider, createTheme } from "@mui/material/styles";



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

          <Route path="/sales/*" element={<SalesRoutes />} /> {/* Render sales routes */}
          <Route path="/mfg/*" element={<ManufacturingRoutes />} /> {/* Render manufacturing routes */}
          {/* Add other route sections here */}
          <Route path="/inventory/*" element={<InventoryRoutes />} />

          

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
