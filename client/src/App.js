import React from "react";
import { Button } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import TeamManagement from "./pages/TeamManagement";
import Profile from "./pages/Doctor/Profile";
import CompaniesList from "./pages/admin/CompaniesList";
import CreateCompany from "./pages/admin/CreateCompany";
import CompanyProfile from "./pages/admin/CompanyProfile";
import BusinessPartners from "./pages/BusinessPartners";
import AddBusinessPartner from "./pages/AddBusinessPartner";
import CreateUser from "./pages/admin/CreateUser";
import UserProfile from "./pages/admin/UserProfile";
import AddNewProperty from "./pages/property-management/AddNewProperty";
import Portfolio from "./pages/property-management/Portfolio";
import AgGrid from "./components/AgGrid";
import Tasks from "./pages/Tasks";
import ClientManagement from "./pages/ClientManagement";
import AddClient from "./pages/AddClient";
import BpProfile from "./pages/BusPartnerProfile";
import BusPartnerProfile from "./pages/BusPartnerProfile";
import TenantManagement from "./pages/property-management/TenantManagement";
import AddTenant from "./pages/property-management/AddTenant";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status">
            {/* <span class="sr-only">Loading...</span> */}
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}></Route>
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}></Route>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/admin/user-profile/:userId" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}></Route>
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>}></Route>
        <Route path="/admin/create-user/:companyId" element={<ProtectedRoute><CreateUser/></ProtectedRoute>}></Route>
        <Route path="/admin/company-profile/:companyId" element={<ProtectedRoute><CompanyProfile/></ProtectedRoute>}></Route>
        <Route path="/admin/companies-list" element={<ProtectedRoute><CompaniesList/></ProtectedRoute>}></Route>
        <Route path="/admin/create-company" element={<ProtectedRoute><CreateCompany/></ProtectedRoute>}></Route>
        <Route path="/add-business-partner" element={<ProtectedRoute><AddBusinessPartner/></ProtectedRoute>}></Route>
        <Route path="/business-partners" element={<ProtectedRoute><BusinessPartners/></ProtectedRoute>}></Route>
        <Route path="/team-management/" element={<ProtectedRoute><TeamManagement/></ProtectedRoute>}></Route>
        <Route path="/property-management/portfolio" element={<ProtectedRoute><Portfolio/></ProtectedRoute>}></Route>
        <Route path="/property-management/portfolio/add-new-property" element={<ProtectedRoute><AddNewProperty/></ProtectedRoute>}></Route>
        <Route path="/client-management" element={<ProtectedRoute><ClientManagement/></ProtectedRoute>}></Route>
        <Route path="/add-client" element={<ProtectedRoute><AddClient/></ProtectedRoute>}></Route>
        <Route path="bp-profile/:bpId" element={<ProtectedRoute><BusPartnerProfile /></ProtectedRoute>}></Route>
        <Route path="/tasks" element={<ProtectedRoute><Tasks/></ProtectedRoute>}></Route>
        <Route path="/property-management/tenant-management" element={<ProtectedRoute><TenantManagement /></ProtectedRoute>}></Route>
        <Route path="/property-management/add-tenant" element={<ProtectedRoute><AddTenant /></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
