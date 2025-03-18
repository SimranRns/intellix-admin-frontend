// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Input } from "../../src/components/ui/input";
// import { Button } from "../../src/components/ui/button";
// import { Label } from "../../src/components/ui/label";
// import { Card, CardContent } from "../../src/components/ui/card";
// import { UploadCloud } from "lucide-react";
// import { FaArrowLeftLong } from "react-icons/fa6";

// const ParentDetails = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setIsModalOpen(true);
//   }, []);

//   const handleClose = () => {
//     setIsModalOpen(false);
//     navigate("/add_student_model2"); 
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
      
//       <FaArrowLeftLong
//         onClick={handleClose}
//         style={{ cursor: "pointer" }}
//         className="fixed top-5 left-5 text-3xl z-[9999] bg-white p-2 rounded-full shadow-lg"
//       />

    
//       <Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
//         <CardContent>
//           <div className="grid gap-4">
//             <div>
//               <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//                 Enter Father's Name
//               </Label>
//               <Input
//                 className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
//                 placeholder="Enter Father's Name"
//               />
//             </div>

//             <div>
//               <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//                 Enter Mother's Name
//               </Label>
//               <Input
//                 className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
//                 placeholder="Enter Mother's Name"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//                   Enter Guardian's Aadhar No.
//                 </Label>
//                 <Input
//                   className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
//                   placeholder="Enter Guardian’s Aadhar No."
//                 />
//               </div>
             
//               <div>
//     <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//         Upload Pan photo <span className="text-red-500">(pdf)</span>
//     </Label>

//     <label htmlFor="pan-upload" className="flex items-center gap-2 w-full border border-gray-300 rounded-xl p-3 sm:p-2 cursor-pointer text-gray-600 focus:ring-4 focus:ring-blue-500 shadow-lg">
//         <UploadCloud size={20} />
//         <span>Upload pdf</span>
//     </label>
    
//     <Input type="file" id="pan-upload" className="hidden" />
// </div>

//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//                   Enter Guardian Bank Account No.
//                 </Label>
//                 <Input
//                   className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
//                   placeholder="Enter Guardian Bank Account No."
//                 />
//               </div>
//               <div>
//                 <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//                   Enter IFSC Code
//                 </Label>
//                 <Input
//                   className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
//                   placeholder="Enter IFSC Code."
//                 />
//               </div>
//             </div>

//             <div className="flex justify-center mt-4">
//   <Button onClick={()=>navigate("/addStudent")}
//    className="w-56 bg-blue-700 text-white text-lg py-2 rounded-lg hover:bg-blue-600">
//     Add Student
//   </Button>
// </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ParentDetails;








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

  // ✅ Form State
  const [formData, setFormData] = useState({
    fatherName: "",
    motherName: "",
    guardianAadhaar: "",
    guardianPan: null,
    guardianBankAccount: "",
    ifscCode: "",
  });

  // ✅ Father's & Mother's Name Validation (Only alphabets & spaces)
  const handleChangeName = (e) => {
    const { name, value } = e.target;
    const regex = /^[A-Za-z\s]+$/;
    if (value === "" || regex.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Guardian Aadhaar Number Validation (Only numbers, max 12 digits)
  const handleChangeAadhaar = (e) => {
    const { name, value } = e.target;
    const regex = /^[0-9]{0,12}$/; // 0-12 digits allowed
    if (value === "" || regex.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Guardian PAN Upload Handler (Only PDF)
  const handlePanUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, guardianPan: file }));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // ✅ Guardian Bank Account Number Validation (Only numbers)
  const handleChangeBankAccount = (e) => {
    const { name, value } = e.target;
    const regex = /^[0-9]*$/; // Only numbers allowed
    if (value === "" || regex.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ IFSC Code Validation (Alphanumeric, max 11 characters, uppercase)
  const handleChangeIFSC = (e) => {
    const { name, value } = e.target;
    const regex = /^[A-Z0-9]{0,11}$/i; // Only alphanumeric, max 11 characters
    if (value === "" || regex.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() })); // Convert to uppercase
    }
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
            {/* Father's Name */}
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                Enter Father's Name
              </Label>
              <Input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChangeName}
                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                placeholder="Enter Father's Name"
              />
            </div>

            {/* Mother's Name */}
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                Enter Mother's Name
              </Label>
              <Input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChangeName}
                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                placeholder="Enter Mother's Name"
              />
            </div>

            {/* Guardian Aadhaar Number */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Enter Guardian's Aadhaar No.
                </Label>
                <Input
                  type="text"
                  name="guardianAadhaar"
                  value={formData.guardianAadhaar}
                  onChange={handleChangeAadhaar}
                  className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                  placeholder="Enter Guardian’s Aadhaar No."
                />
              </div>

              {/* Guardian PAN Upload */}
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Upload PAN Photo <span className="text-red-500">(PDF)</span>
                </Label>

                <label
                  htmlFor="pan-upload"
                  className="flex items-center gap-2 w-full border border-gray-300 rounded-xl p-3 sm:p-2 cursor-pointer text-gray-600 focus:ring-4 focus:ring-blue-500 shadow-lg"
                >
                  <UploadCloud size={20} />
                  <span>Upload PDF</span>
                </label>

                <Input type="file" id="pan-upload" className="hidden" onChange={handlePanUpload} accept=".pdf" />
              </div>
            </div>

            {/* Guardian Bank Account & IFSC Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Enter Guardian Bank Account No.
                </Label>
                <Input
                  type="text"
                  name="guardianBankAccount"
                  value={formData.guardianBankAccount}
                  onChange={handleChangeBankAccount}
                  className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                  placeholder="Enter Guardian Bank Account No."
                />
              </div>
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Enter IFSC Code
                </Label>
                <Input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChangeIFSC}
                  className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                  placeholder="Enter IFSC Code."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => navigate("/addStudent")}
                className="w-56 bg-blue-700 text-white text-lg py-2 rounded-lg hover:bg-blue-600"
              >
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

