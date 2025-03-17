import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

import React, { useState } from "react"; 

const StudentSelectionPage = () => {
  const navigate = useNavigate();


  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  return (
    <div>
      <FaArrowLeftLong
        onClick={() => navigate("/add_student_model")}
        style={{ cursor: "pointer" }}
        className="fixed top-5 left-5 text-3xl z-[9999] bg-white p-2 rounded-full shadow-lg"
      />
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-lg z-10 w-[90%] md:w-[580px] h-auto min-h-[320px]">
          

          <h2 className="text-lg font-semibold mb-2">
            Select Course<span className="text-red-500">*</span>
          </h2>
          <select
            className="w-full p-2 border rounded-lg mb-4"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">--Select Course--</option>
            <option value="RGB">RGB</option>
            <option value="HSC">HSC</option>
          </select>

       
          <h2 className="text-lg font-semibold mb-2">
            Select Batch<span className="text-red-500">*</span>
          </h2>
          <select
            className="w-full p-2 border rounded-lg mb-4"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">--Select Batch--</option>
            <option value="Batch A">Batch A</option>
            <option value="Batch B">Batch B</option>
          </select>


          <div className="flex justify-center">
            <button
              onClick={() => {
                if (!selectedCourse || !selectedBatch) {
                  toast.warning("Please fill all required fields!"); 
                } else {
                  navigate("/add_student_model3"); 
                }
              }}
              className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 mt-5 rounded-lg min-w-[250px] w-full sm:w-[300px] h-[40px] text-lg"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default StudentSelectionPage;
