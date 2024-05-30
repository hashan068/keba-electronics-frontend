
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "../src/pages/Dashbord/Dashboard"
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import LoginLayout from './components/LoginLayout';
import SalesRoutes from './routes/SalesRoutes';
import ManufacturingRoutes from './routes/ManufacturingRoutes';
import InventoryRoutes from './routes/InventoryRoutes';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#263238",
    },
    secondary: {
      main: "#494c7d",
    },
  },
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
          <Route path="/" element={<Navigate to="/dashboard" />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<LoginLayout><Login /></LoginLayout>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/*" element={<ProtectedRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function ProtectedRoutes() {
  const userRole = localStorage.getItem('userrole');

  return (
    <Layout userRole={userRole}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sales/*" element={<SalesRoutes />} />
        <Route path="mfg/*" element={<ManufacturingRoutes />} />
        <Route path="inventory/*" element={<InventoryRoutes />} />
      </Routes>
    </Layout>
  );
}

export default App;
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NotFound from "./pages/NotFound";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Layout from "./components/Layout";
// import SalesRoutes from './routes/SalesRoutes';
// import ManufacturingRoutes from './routes/ManufacturingRoutes';
// import InventoryRoutes from './routes/InventoryRoutes';

// import { ThemeProvider, createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#263238",
//     },
//     secondary: {
//       main: "#494c7d",
//     },
//   },
// });

// function Logout() {
//   localStorage.clear();
//   return <Navigate to="/login" />;
// }

// function RegisterAndLogout() {
//   localStorage.clear();
//   return <Register />;
// }

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/logout" element={<Logout />} />
//           <Route path="/register" element={<RegisterAndLogout />} />
//           <Route path="/*" element={<MainRoutes />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </ThemeProvider>
//   );
// }

// function MainRoutes() {
//   return (
//     <ProtectedRoute>
//       <Layout>
//         <Routes>
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="sales/*" element={<SalesRoutes />} />
//           <Route path="mfg/*" element={<ManufacturingRoutes />} />
//           <Route path="inventory/*" element={<InventoryRoutes />} />
//         </Routes>
//       </Layout>
//     </ProtectedRoute>
//   );
// }

// export default App;
