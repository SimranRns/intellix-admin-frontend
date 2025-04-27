import React, { useEffect, useState } from "react";
// import "../src/App.css";
import Login from "./component/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./component/Login/AdminLogin";
import Settings from "./component/Admin/Setting/Change_pass";
import Dashboard from "./component/Admin/Dashboard/Dashboard";
import StudentHeader from "./component/Admin/Student/StudentHeader";
import Advertisment from "./component/Admin/Advertisment/Advertisment";
import Attendance from "./component/Admin/Attendance/Attendance";
import Support from "./component/Admin/Support/Support";
import AddStudentModal from "./component/Admin/Student/AddStudentForm";
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
import StudentUploadModal from "./component/Admin/Student/Add_Excel/StudentUploadModal";
import Academics from "./component/Admin/Academics/Academics";
import logo from './assets/Image/intellix.png'
import Received from "./component/Admin/Accounts/Received";
import Upcoming from "./component/Admin/Accounts/Upcoming";
import Missed from "./component/Admin/Accounts/Missed";
import MarksheetForm from "./component/Admin/Student/Marksheet/MarksheetForm";
import Department_list_Employee from "./component/Admin/Accounts/Department_list_Employee";
import Batches from "./component/Admin/Academics/Academics_data/Batches";
import Courses from "./component/Admin/Academics/Academics_data/Courses";
import Sessions from "./component/Admin/Academics/Academics_data/Sessions";
import Subjects from "./component/Admin/Academics/Academics_data/Subjects";
import ThankYouCard from "./component/Admin/Dashboard/ThankYouCard";
import ExStudentsData from "./component/Admin/Student/Ex-Students/ExStudentsData";
import Stu_Attendance from "./component/Admin/Student/Action/Stu_Attendance";
import Add_Payment from "./component/Admin/Student/Add_Payment";
import ProtectedRoute from "./Protect_Rotues";
import Notification from "./component/Admin/Advertisment/Notification";
// import { Toaster } from "react-hot-toast";
// import { Route } from "lucide-react";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating site load time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show loader while loading
    if (loading) {
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
          <div className="relative flex  justify-center items-center">
            <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            <img
              src={logo}
              alt="Loading"
              className="rounded-full h-28 w-28"
            />
          </div>
        </div>
  );
  }
  <>
    {/* <Toaster position="top-right" reverseOrder={false} /> */}
    {/* ...rest of your app */}
  </>
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Adminlogin" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route path="/Academics" element={<Academics />} />
            <Route path="/students" element={<StudentHeader />} />
            <Route path="/Accounts" element={<Account />} />
            <Route path="/Access" element={<Department_access />} />
            <Route path="/Departments" element={<Departments />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/Advertisement" element={<Advertisment />} />
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
            <Route path="/view/profile/:id" element={<Profile />} />
            <Route path="/student-payment-history/:id" element={<Payment_History />} />
            <Route path="/StudentUploadModal/:id" element={<StudentUploadModal />} />
            <Route path="/Marksheet/:id" element={<MarksheetForm />} />
            <Route path="/ExStudents" element={<ExStudentsData />} />
            <Route path="/student_attendance" element={<Stu_Attendance />} />
            <Route path="/View-Profile/:id" element={<ViewProfile />} />
            <Route path="/View_User/:id" element={<View_User />} />

            <Route path="/Ex-Employee" element={<ExEmployees />} />
            <Route path="/manage_salary" element={<Manage_sallery />} />
            <Route path="/Leads" element={<Leads />} />
            <Route path="/MyLeads" element={<MyLeads />} />
            <Route path="/Received" element={<Received />} />
            <Route path="/Upcoming" element={<Upcoming />} />1
            <Route path="/Missed" element={<Missed />} />
            <Route path="/Department_list_Employee" element={<Department_list_Employee />} />
            <Route path="/Batches" element={<Batches />} />
            <Route path="/Courses" element={<Courses />} />
            <Route path="/Sessions" element={<Sessions />} />
            <Route path="/Subjects" element={<Subjects />} />
            <Route path="/ThankYouCard" element={<ThankYouCard />} />
            <Route path="/add-payment" element={<Add_Payment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
