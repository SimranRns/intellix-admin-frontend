import React from "react";
// import "../src/App.css";
import Login from "./component/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./component/Login/AdminLogin";
import Settings from "./component/Admin/Setting/Change_pass";
import Dashboard from "./component/Admin/Dashboard/Dashboard";
import StudentHeader from "./component/Admin/Student/StudentPage";
import Advertisment from "./component/Admin/Advertisment/Advertisment";
import Attendance from "./component/Admin/Attendance/Attendance";
import Support from "./component/Admin/Support/Support";
import AddStudentModal from "./component/Admin/Student/AddStudentModal";
import Team from "./component/Admin/Team/Team";
// import 'react-notifications/lib/notifications.css';
import StudentSelectionPage from "./component/Admin/Student/StudentSelectionPage";
import ParentDetails from "./component/Admin/Student/ParentDetails";
import SuccessMessage from "./component/Admin/Student/SuccessMessage";
// import Leads from "./component/Admin/Leads/Leads";
import ViewProfile from "./component/Admin/Team/ViewProfile";

import Manage_sallery from "./component/Admin/Team/Manage_sallery";
import ProceedModal from "./component/Admin/Student/ProceedModel";
import Leads from "./component/Admin/Leads/Leads";
import ExEmployees from "./component/Admin/Team/ExEmployees";
import Department_access from "./component/Admin/Team/Department_access";
import MyLeads from "./component/Admin/Leads/MyLeads/MyLeads";

import Departments from "./component/Admin/Team/Departments";
import Profile from "./component/Admin/Student/Action/Profile";
import Payment_History from "./component/Admin/Student/Action/Payment_History";
import Account from "./component/Admin/Accounts/Account";
import View_User from "./component/Admin/Team/View_User";
// import { Route } from "lucide-react";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/Adminlogin" element={<AdminLogin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentHeader />} />
          <Route path="/accounts" element={<Account/>} />
          <Route path="/Access" element={<Department_access />} />
          <Route path="/Departments" element={<Departments />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/Advertisment" element={<Advertisment />} />
          <Route path="/team" element={<Team />} />
          {/* <Route path="/support" element={<div>Support </div>} /> */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />

          <Route path="/add_student_model" element={<AddStudentModal />} />
          <Route path="/ProceedModal" element={<ProceedModal />} />
          <Route
            path="/StudentSelectionPage"
            element={<StudentSelectionPage />}
          />
          <Route path="/ParentDetails" element={<ParentDetails />} />
          <Route path="/add" element={<SuccessMessage />} />
          <Route path="/view/profile" element={<Profile />} />
          <Route path="/student-payment-history" element={<Payment_History />} />

          <Route path="/View-Profile" element={<ViewProfile />} />
          <Route path="/View_User" element={<View_User />} />
          <Route path="/Ex-Employee" element={<ExEmployees />} />
          <Route path="/manage_salary" element={<Manage_sallery />} />
          <Route path="/Leads" element={<Leads />} />
          <Route path="/MyLeads" element={<MyLeads/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
