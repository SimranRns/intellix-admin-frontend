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
import Leads from "./component/Admin/Leads/Leads";
import ViewProfile from "./component/Admin/Team/ViewProfile";
import Department from "./component/Admin/Team/Manage_sallery";
import Manage_sallery from "./component/Admin/Team/Manage_sallery";
import ProceedModal from "./component/Admin/Student/ProceedModel";
// import { Route } from "lucide-react";
const App = () => {
  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Adminlogin" element={<AdminLogin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/inbox" element={<div>inbox</div>} />
          <Route path="/students" element={<StudentHeader />} />
          <Route path="/accounts" element={<Manage_sallery />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/Advertisment" element={<Advertisment />} />
          <Route path="/team" element={<Team />} />
          {/* <Route path="/support" element={<div>Support </div>} /> */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />


          <Route path="/add_student_model" element={<AddStudentModal />} />
          <Route path="/ProceedModal" element={<ProceedModal />} />
          <Route path="/StudentSelectionPage" element={<StudentSelectionPage />} />
          <Route path="/ParentDetails" element={<ParentDetails />} />
          <Route path="/add" element={<SuccessMessage />} />


          <Route path="/View-Profile" element={<ViewProfile />} />
          <Route path="/Leads" element={<Leads />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
