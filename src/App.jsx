import React from "react";
import Dashboard from "./component/Dashboard/Dashboard";
import Login from "./component/Login/Login"
import Header from "./component/Dashboard/Header";
import Sidebar from "./component/Dashboard/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./component/Login/AdminLogin";
// import { Route } from "lucide-react";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/side" element={<Sidebar />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Adminlogin" element={<AdminLogin />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Dashboard /> */}
      {/* <Sidebar /> */}
      {/* <Header /> */}
    </div>
  );
};

export default App;
