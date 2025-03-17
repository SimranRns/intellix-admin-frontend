import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { Label } from "../../src/components/ui/label";
import { Card, CardContent } from "../../src/components/ui/card";
import { UploadCloud } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";

const ParentDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/add_student_model2"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      
      <FaArrowLeftLong
        onClick={handleClose}
        style={{ cursor: "pointer" }}
        className="fixed top-5 left-5 text-3xl z-[9999] bg-white p-2 rounded-full shadow-lg"
      />

    
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                Enter Father's Name
              </Label>
              <Input
                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                placeholder="Enter Father's Name"
              />
            </div>

            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                Enter Mother's Name
              </Label>
              <Input
                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                placeholder="Enter Mother's Name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Enter Guardian's Aadhar No.
                </Label>
                <Input
                  className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                  placeholder="Enter Guardian’s Aadhar No."
                />
              </div>
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Upload Aadhar photo <span className="text-red-500">(pdf)</span>
                </Label>
               
                <div className="flex items-center gap-2 w-full border border-gray-300 rounded-xl p-3 sm:p-2 cursor-pointer text-gray-600 focus:ring-4 focus:ring-blue-500 shadow-lg">
  <UploadCloud size={20} />
  <span>Upload pdf</span>
</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Enter Guardian Bank Account No.
                </Label>
                <Input
                  className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                  placeholder="Enter Guardian Bank Account No."
                />
              </div>
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Enter IFSC Code
                </Label>
                <Input
                  className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                  placeholder="Enter IFSC Code."
                />
              </div>
            </div>

            <div className="flex justify-center mt-4">
  <Button onClick={()=>navigate("/addStudent")}
   className="w-56 bg-blue-700 text-white text-lg py-2 rounded-lg hover:bg-blue-600">
    Add Student
  </Button>
</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDetails;
