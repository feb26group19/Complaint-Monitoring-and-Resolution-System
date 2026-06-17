import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginComp from './components/LoginComp';
import HomeComp from './pages/Home';
import Register from './pages/Register'; // Added import for the Register component
import ProtectedRoute from './components/ProtectedRoutes';
import LogoutComp from './pages/LogOutComp';

import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import NgoDashboard from './pages/NgoDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public Landing & Auth Overlay Routes */}
        <Route path="/" element={<HomeComp />}>
          <Route path="login" element={<LoginComp />} />
          <Route path="register" element={<Register />} /> {/* Updated with your Register component */}
        </Route>

        {/* Admin Portal (Role 1) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role={1}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<h1>Admin Overview & Metrics</h1>} />
          <Route path="departments" element={<h1>Manage Departments</h1>} />
          <Route path="officers" element={<h1>Manage Department Officers</h1>} />
          <Route path="citizens" element={<h1>Manage Citizens</h1>} />
          <Route path="complaints" element={<h1>View & Assign Complaints</h1>} />
          <Route path="notices" element={<h1>Manage Notice Board</h1>} />
          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* Citizen Portal (Role 2) */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role={2}>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<h1>Citizen Welcome Panel</h1>} />
          <Route path="submit" element={<h1>Submit New Complaint Form</h1>} />
          <Route path="status" element={<h1>Track Complaint Status</h1>} />
          <Route path="history" element={<h1>View Complaint History</h1>} />
          <Route path="rewards" element={<h1>Earned Reward Points & Certificates</h1>} />
          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* Department Officer Portal (Role 3) */}
        <Route
          path="/officer"
          element={
            <ProtectedRoute role={3}>
              <OfficerDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<h1>Officer Overview</h1>} />
          <Route path="assigned" element={<h1>Assigned Complaints List</h1>} />
          <Route path="status" element={<h1>Update Complaint Status</h1>} />
          <Route path="remarks" element={<h1>Add Officer Remarks</h1>} />
          <Route path="statistics" element={<h1>Performance Statistics</h1>} />
          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* NGO / Community Portal (Role 4) */}
        <Route
          path="/ngo"
          element={
            <ProtectedRoute role={4}>
              <NgoDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<h1>NGO Portal Overview</h1>} />
          <Route path="create-event" element={<h1>Create & Schedule Community Events</h1>} />
          <Route path="schedule" element={<h1>Schedule Events Calendar</h1>} />
          <Route path="reports" element={<h1>Upload Event Reports</h1>} />
          <Route path="promote" element={<h1>Promote Activities & Outreach</h1>} />
          <Route path="stats" element={<h1>Participation Statistics</h1>} />
          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* Access Fallbacks */}
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;