import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { CreatePatient } from "./pages/registration/CreatePatient";
import ProviderRegistration from "./pages/registration/ProviderRegistration";
import UserRegistration from "./pages/registration/UserRegistration";
import Settings from "./pages/Settings";
import SinglePatient from "./pages/SinglePatient";
import { admin, clinician, loggedIn } from "./store/authSlice";

const RoutesWithAuth = () => {
  const isAdmin = useSelector(admin);
  const isClinician = useSelector(clinician);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to={"/admin"} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/registration" element={<ProviderRegistration />} />
      </Routes>
    );
  }

  if (isClinician) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/registration" element={<ProviderRegistration />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/patient/:id"
          element={
            <Layout>
              <SinglePatient />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
        <Route
          path="/create_patient"
          element={
            <Layout>
              <CreatePatient />
            </Layout>
          }
        />
      </Routes>
    );
  }

  return null;
};

function App() {
  const isLoggedIn = useSelector(loggedIn);

  return isLoggedIn ? (
    <RoutesWithAuth />
  ) : (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/registration" element={<UserRegistration />} />
      <Route path="/complete-profile" element={<ProviderRegistration />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
