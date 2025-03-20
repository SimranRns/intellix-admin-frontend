import React from "react";
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

// ✅ Zod Validation Schema
const schema = z.object({
  fatherName: z.string().min(2, "Father's name is required").regex(/^[A-Za-z\s]+$/, "Only alphabets allowed"),
  motherName: z.string().min(2, "Mother's name is required").regex(/^[A-Za-z\s]+$/, "Only alphabets allowed"),
  guardianAadhaar: z.string().length(12, "Aadhaar must be 12 digits").regex(/^\d+$/, "Only numbers allowed"),
  guardianBankAccount: z.string().min(8, "Account number must be at least 8 digits").regex(/^\d+$/, "Only numbers allowed"),
  ifscCode: z.string().length(11, "IFSC must be 11 characters").regex(/^[A-Z0-9]+$/, "Invalid IFSC format"),
  guardianPan: z.any().refine((file) => file && file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  }),
});

const ParentDetails = () => {
  const navigate = useNavigate();

  // ✅ React Hook Form Integration
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // alert("Form submitted successfully!");
    navigate("/add_student_model2");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setValue("guardianPan", file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <FaArrowLeftLong
        onClick={() => navigate("/add_student_model2")}
        style={{ cursor: "pointer" }}
        className="fixed top-5 left-5 text-3xl z-[9999] bg-white p-2 rounded-full shadow-lg"
      />

      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                Enter Father's Name
              </Label>
              <Input {...register("fatherName")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5" placeholder="Enter Father's Name" />
              {errors.fatherName && <p className="text-red-500">{errors.fatherName.message}</p>}
            </div>

            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                Enter Mother's Name
              </Label>
              <Input {...register("motherName")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5" placeholder="Enter Mother's Name" />
              {errors.motherName && <p className="text-red-500">{errors.motherName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Enter Guardian's Aadhaar No.
                </Label>
                <Input {...register("guardianAadhaar")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5" placeholder="Enter Guardian’s Aadhaar No." />
                {errors.guardianAadhaar && <p className="text-red-500">{errors.guardianAadhaar.message}</p>}
              </div>

              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Upload PAN Photo <span className="text-red-500">(PDF)</span>
                </Label>
                <label htmlFor="pan-upload" className="flex items-center gap-2 w-full border border-gray-300 rounded-xl p-3 cursor-pointer">
                  <UploadCloud size={20} />
                  <span>Upload PDF</span>
                </label>
                <Input type="file" id="pan-upload" className="hidden" onChange={handleFileUpload} accept=".pdf" />
                {errors.guardianPan && <p className="text-red-500">{errors.guardianPan.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Enter Guardian Bank Account No.
                </Label>
                <Input {...register("guardianBankAccount")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5" placeholder="Enter Guardian Bank Account No." />
                {errors.guardianBankAccount && <p className="text-red-500">{errors.guardianBankAccount.message}</p>}
              </div>
              <div>
                <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                  Enter IFSC Code
                </Label>
                <Input {...register("ifscCode")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5" placeholder="Enter IFSC Code." />
                {errors.ifscCode && <p className="text-red-500">
                  {errors.ifscCode.message}
                  </p>}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <Button     onClick={ navigate("/addStudent")} type="submit" className="w-56 bg-blue-700 text-white text-lg py-2 rounded-lg hover:bg-blue-600">
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
