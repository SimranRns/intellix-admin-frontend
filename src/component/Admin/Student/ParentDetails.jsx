import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { Label } from "../../src/components/ui/label";
import { Card, CardContent } from "../../src/components/ui/card";
import { UploadCloud } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";

//  Zod Validation Schema 
const zodSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  guardianAadhaar: z.string().length(12, { message: "Enter a valid 12-digit Aadhaar number" }),
  guardianPan: z
    .instanceof(File, { message: "PAN photo (PDF) is required" })
    .refine((file) => file.type === "application/pdf", { message: "Only PDF format is allowed" }),
  guardianBankAccount: z.string().min(10, { message: "Enter valid Bank Account number" }),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Enter valid IFSC Code" }),
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <FaArrowLeftLong
        onClick={() => navigate("/StudentSelectionPage")}
        style={{ cursor: "pointer", outline: "none", border: "none" }}
        className="fixed top-5 left-5 text-3xl z-[999]"
      />

      {/* Form Card */}
      <Card className="w-full max-w-3xl shadow-lg rounded-lg p-6">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/*  Father's Name */}
            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">
                Enter Father's Name
              </Label>
              <Input {...register("fatherName")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5" placeholder="Enter Father's Name" />
              {errors.fatherName && <p className="text-red-500">{errors.fatherName.message}</p>}
            </div>

            {/*  Mother's Name */}
            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">
                Enter Mother's Name
              </Label>
              <Input {...register("motherName")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5" placeholder="Enter Mother's Name" />
              {errors.motherName && <p className="text-red-500">{errors.motherName.message}</p>}
            </div>

            {/*  Aadhaar & PAN Upload */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block font-semibold text-lg sm:text-xl mb-4">
                  Enter Guardian's Aadhaar No.
                </Label>
                <Input {...register("guardianAadhaar")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5" placeholder="Enter Guardian’s Aadhaar No." />
                {errors.guardianAadhaar && <p className="text-red-500">{errors.guardianAadhaar.message}</p>}
              </div>

            
<div>
  <Label className="block font-semibold text-lg sm:text-xl mb-4">
    Upload PAN Photo <span className="text-red-500">(PDF)</span>
  </Label>

  <label htmlFor="pan-upload" className="flex items-center gap-2 w-full border border-gray-300 rounded-xl p-3 cursor-pointer">
    <UploadCloud size={20} />
    <span> <span>{fileName || "Upload PDF"}</span></span>
  </label>

  <Input
    type="file"
    id="pan-upload"
    className="hidden"
    onChange={(e) => handleFileUpload(e, "guardianPan")}
    accept=".pdf"
  />

  {errors.guardianPan && <p className="text-red-500">{errors.guardianPan.message}</p>}
</div>

            </div>

            {/*  Bank Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block font-semibold text-lg sm:text-xl mb-4">
                  Enter Guardian Bank Account No.
                </Label>
                <Input {...register("guardianBankAccount")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5" placeholder="Enter Guardian Bank Account No." />
                {errors.guardianBankAccount && <p className="text-red-500">{errors.guardianBankAccount.message}</p>}
              </div>
              <div>
                <Label className="block font-semibold text-lg sm:text-xl mb-4">
                  Enter IFSC Code
                </Label>
                <Input {...register("ifscCode")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5" placeholder="Enter IFSC Code" />
                {errors.ifscCode && <p className="text-red-500">{errors.ifscCode.message}</p>}
              </div>
            </div>

            {/*  Submit Button */}
            <div className="flex justify-center mt-4">
              <Button type="submit" className="w-56 bg-blue-700 text-white text-lg py-2 rounded-lg hover:bg-blue-600">
                Add Student
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDetails;
