import React from "react";
import Dashboard from "./component/Admin/Dashboard";
import Login from "./component/Login/Login";
import Header from "./component/Admin/Dashboard/Header";
import Sidebar from "./component/Admin/Dashboard/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./component/Login/AdminLogin";
import Settings from "./component/Admin/Settings";

import '../src/App.css'
// import { Route } from "lucide-react";
const App = () => {
  return (
    <div>
     
      <BrowserRouter>
        <Routes>
          {/* <Route path="/side" element={<Sidebar />}></Route> */}
          <Route path="/" element={<Login />}>
            {" "}
          </Route>
          <Route path="/header" element={<Header />}>
            {" "}
          </Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Adminlogin" element={<AdminLogin />}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/Settings" element={<Settings/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
