import React from "react";
import "../src/App.css";
import Login from "./component/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./component/Login/AdminLogin";
import Settings from "./component/Admin/Setting/Change_pass";
import Dashboard from "./component/Admin/Dashboard/Dashboard";
// import Teacher from "./component/Admin/Teacher/Teacher";
import StudentHeader from "./component/Admin/Student/StudentPage";
// import { Route } from "lucide-react";
const App = () => {
  return (
    <div>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Adminlogin" element={<AdminLogin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/inbox" element={<div>Inbox </div>} />
          {/* <Route path="/teacher" element={<Teacher/>} /> */}
          <Route path="/students" element={<StudentHeader />} />
          <Route path="/accounts" element={<div>Accounts </div>} />
          <Route path="/attendance" element={<div>Attendance </div>} />
          <Route path="/team" element={<div>Team </div>} />
          <Route path="/support" element={<div>Support </div>} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
      {/* <StudentHeader/> */}
    </div>
  );
};

export default App;
