import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div>
      <div class="grid grid-flow-col grid-cols-3  ">
        <div class="row-span-1 ..."><Sidebar/></div>
        <div className="col-span-2 ...">
        <div class=""><Header/></div>
        <div class="">03</div>
        
        </div>
       
      </div>
      
    </div>
    
  );
};

export default Dashboard;
