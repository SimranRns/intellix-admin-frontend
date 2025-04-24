import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { Label } from "../../src/components/ui/label";
import { Card, CardContent } from "../../src/components/ui/card";
import { ArrowLeft, CreditCard, FileText, Landmark, UploadCloud, User } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";

//  Zod Validation Schema 
const zodSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  // guardianAadhaar: z.string().length(12, { message: "Enter a valid 12-digit Aadhaar number" }),
  // guardianPan: z
  //   .instanceof(File, { message: "PAN photo (PDF) is required" })
  //   .refine((file) => file.type === "application/pdf", { message: "Only PDF format is allowed" }),
  // guardianBankAccount: z.string().min(10, { message: "Enter valid Bank Account number" }),
  // ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Enter valid IFSC Code" }),
});



const ParentDetails = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      fatherName: "",
      motherName: "",
      guardianAadhaar: "",
      guardianBankAccount: "",
      ifscCode: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    navigate("/add");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file.name);
    setValue("guardianPan", file);
    if (file) {
      setFileName(file.name);
    }
  };
  const goback = ()=>{
    window.history.back()
  }

  return (
    <div>

        <Button 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 shadow-md mt-3"  
 onClick={goback}
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline">Back to Student</span>
        </Button>
    <div className="flex items-center justify-center min-h-screen">
     

      <div>
        {/* Form Card */}
        <Card className="w-full max-w-4xl rounded-2xl shadow-md shadow-blue-500/50 p-8 mt-5">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 ">

              {/* Father's Name */}
              <div className="relative ">
                <Label className="font-semibold text-lg sm:text-xl mb-4 flex items-center gap-2">
                  <User size={20} /> Enter Father's Name
                </Label>
                <Input
                  {...register("fatherName")}
                  className={`w-full pl-10 border ${errors.fatherName ? "border-red-500" : "border-gray-300"} rounded-xl p-3 sm:p-5`}
                  placeholder="Enter Father's Name"
                />
               
                {errors.fatherName && <p className="text-red-500">{errors.fatherName.message}</p>}
              </div>

              {/* Mother's Name */}
              <div className="relative">
                <Label className="font-semibold text-lg sm:text-xl mb-4 flex items-center gap-2">
                  <User size={20} /> Enter Mother's Name
                </Label>
                <Input
                  {...register("motherName")}
                  className={`w-full pl-10 border ${errors.motherName ? "border-red-500" : "border-gray-300"} rounded-xl p-3 sm:p-5`}
                  placeholder="Enter Mother's Name"
                />
               
                {errors.motherName && <p className="text-red-500">{errors.motherName.message}</p>}
              </div>

              {/* Aadhaar & PAN Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div className="relative">
                  <Label className=" font-semibold text-lg sm:text-xl mb-4 flex items-center gap-2">
                    <CreditCard size={20} /> Guardian's Aadhaar No.
                  </Label>
                  <Input
                    {...register("guardianAadhaar")}
                    className={`w-full pl-10 border ${errors.guardianAadhaar ? "border-red-500" : "border-gray-300"} rounded-xl p-3 sm:p-5`}
                    placeholder="Enter Guardian’s Aadhaar No."
                  />
         
                  {errors.guardianAadhaar && <p className="text-red-500">{errors.guardianAadhaar.message}</p>}
                </div> */}

                {/* <div>
                  <Label className="font-semibold text-lg sm:text-xl mb-4 flex items-center gap-2">
                    <FileText size={20} /> Upload PAN Photo <span className="text-red-500">(PDF)</span>
                  </Label>
                  <label
                    htmlFor="pan-upload"
                    className="flex items-center gap-2 w-full border border-gray-300 rounded-xl p-3 cursor-pointertransition"
                  >
                
                    <span>{fileName || "Upload PDF"}</span>
                  </label>
                  <Input
                    type="file"
                    id="pan-upload"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "guardianPan")}
                    accept=".pdf"
                  />
                  {errors.guardianPan && <p className="text-red-500">{errors.guardianPan.message}</p>}
                </div> */}
              </div>

              {/* Bank Details */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Label className=" font-semibold text-lg sm:text-xl mb-4 flex items-center gap-2">
                    <Landmark size={20} /> Guardian Bank Account No.
                  </Label>
                  <Input
                    {...register("guardianBankAccount")}
                    className={`w-full pl-10 border ${errors.guardianBankAccount ? "border-red-500" : "border-gray-300"} rounded-xl p-3 sm:p-5`}
                    placeholder="Enter Guardian Bank Account No."
                  />
            
                  {errors.guardianBankAccount && <p className="text-red-500">{errors.guardianBankAccount.message}</p>}
                </div>

                <div className="relative">
                  <Label className=" font-semibold text-lg sm:text-xl mb-4 flex items-center gap-2">
                    <Landmark size={20} /> IFSC Code
                  </Label>
                  <Input
                    {...register("ifscCode")}
                    className={`w-full pl-10 border ${errors.ifscCode ? "border-red-500" : "border-gray-300"} rounded-xl p-3 sm:p-5`}
                    placeholder="Enter IFSC Code"
                  />
                  
                  {errors.ifscCode && <p className="text-red-500">{errors.ifscCode.message}</p>}
                </div>
              </div> */}

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <Button type="submit" className="w-56 bg-blue-700 text-white text-lg py-2 rounded-lg hover:bg-blue-600">
                  Add Student
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

    </div>
    </div>
  );
};

export default ParentDetails;
