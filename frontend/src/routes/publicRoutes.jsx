// routes/publicRoutes.js

import { Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Login />;
}

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/register", element: <RegisterAndLogout /> },
  { path: "*", element: <NotFound /> },
];

export default publicRoutes;
