import React from "react";
import Login from "./component/Login/Login";
import Header from "./component/Admin/Dashboard/Header";
// import Sidebar from "./component/Admin/Dashboard/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./component/Login/AdminLogin";
import Settings from "./component/Admin/Setting/Change_pass";

import "../src/App.css";
import Dashboard from "./component/Admin/Dashboard/Dashboard";
// import { Route } from "lucide-react";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inbox" element={<div>Inbox </div>} />
          <Route path="/teacher" element={<div>Teacher </div>} />
          <Route path="/students" element={<div>Students </div>} />
          <Route path="/accounts" element={<div>Accounts </div>} />
          <Route path="/attendance" element={<div>Attendance </div>} />
          <Route path="/team" element={<div>Team </div>} />
          <Route path="/support" element={<div>Support </div>} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
