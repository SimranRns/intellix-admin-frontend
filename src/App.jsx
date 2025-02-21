import React from "react";
import Dashboard from "./component/Dashboard/Dashboard";

import Header from "./component/Dashboard/Header";
import Sidebar from "./component/Dashboard/Sidebar";
import { BrowserRouter, Routes , Route } from "react-router-dom";
// import { Route } from "lucide-react";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/side" element={<Sidebar/>}>
            
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Dashboard /> */}
      {/* <Sidebar /> */}
      {/* <Header /> */}
    </div>
  );
};

export default App;
