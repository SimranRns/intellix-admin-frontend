import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../src/components/ui/dialog";
import { Button } from "../../src/components/ui/button";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";

import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, FileUp, Hash, IdCard, Landmark } from "lucide-react";


const schema = z.object({
  address: z.string().min(5, "Address is required"),
  aadhaarNumber: z.string().length(12, "Aadhaar must be 12 digits").regex(/\d+$/, "Only numbers allowed"),
  panNumber: z.string().length(10, "PAN must be 10 characters").regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format"),
  aadhaarDocument: z.any().refine((file) => file && file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  }),
  panDocument: z.any().refine((file) => file && file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  }),
});

const ProceedModal = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [formData, setFormData] = useState({
    address: "",
    aadhaarNumber: "",
    panNumber: "",
    aadhaarDocument: null,
    panDocument: null,
    aadhaarFileName: "Click to Upload",
    panFileName: "Click to Upload",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [field]: file,
      [`${field}FileName`]: file ? file.name : "Click to Upload",
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleSubmit = () => {
    try {
      schema.parse(formData);
      navigate("/StudentSelectionPage");
    } catch (error) {
      const formattedErrors = {};
      error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
    }
  };
  const goback = () => {
    window.history.back();
  }
  return (
    <div>
      <div className="flex items-center gap-4 p-4 ">
        <Button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 shadow-md"
          onClick={goback}
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline">Back</span>
        </Button>

      </div>
      <div className=" mx-auto border rounded-2xl  h-auto min-h-[320px] max-w-4xl shadow-md shadow-blue-500/50 p-8 mt-5">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">Enter Your Details</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address Field */}
          <div>
  <label className=" font-semibold text-lg mb-2 flex items-center gap-2">
    <Hash size={18} /> Enter Address
  </label>
  <input
    type="text"
    name="address"
    value={formData.address}
    onChange={handleChange}
    className={`w-full border rounded-xl p-3 bg-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
    placeholder="Enter your address"
  />
  {errors.address && (
    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
  )}
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {/* Aadhaar Number */}
  <div>
    <label className=" font-semibold text-lg mb-2 flex items-center gap-2">
      <IdCard size={18} /> Enter Aadhaar Number
    </label>
    <input
      type="text"
      name="aadhaarNumber"
      value={formData.aadhaarNumber}
      onChange={handleChange}
      className={`w-full border rounded-xl p-3 bg-transparent ${errors.aadhaarNumber ? 'border-red-500' : 'border-gray-300'}`}
      placeholder="Aadhaar number (12 digits)"
    />
    {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber}</p>}
  </div>

  {/* PAN Number */}
  <div>
    <label className=" font-semibold text-lg mb-2 flex items-center gap-2">
      <Landmark size={18} /> Enter PAN No.
    </label>
    <input
      type="text"
      name="panNumber"
      value={formData.panNumber}
      onChange={handleChange}
      className={`w-full border rounded-xl p-3 bg-transparent ${errors.panNumber ? 'border-red-500' : 'border-gray-300'}`}
      placeholder="PAN number (10 characters)"
    />
    {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>}
  </div>
</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Aadhaar Document */}
            <div>
              <label className="font-semibold text-lg mb-1 flex items-center gap-2">
                <FileUp size={18} /> Upload Aadhaar Document
              </label>
              <p className="text-sm mb-2 ml-7">(Upload front and back in PDF)</p>
              <input
                type="file"
                id="aadhaar-upload"
                onChange={(e) => handleFileUpload(e, "aadhaarDocument")}
                accept=".pdf"
                className={`w-full border rounded-xl p-3 ${errors.aadhaarDocument ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.aadhaarDocument && <p className="text-red-500 text-sm mt-1">{errors.aadhaarDocument}</p>}
            </div>

            {/* PAN Document */}
            <div>
              <label className=" font-semibold text-lg mb-1 flex items-center gap-2">
                <FileUp size={18} /> Upload PAN Document
              </label>
              <p className="text-sm mb-2 ml-7">(Upload front and back in PDF)</p>
              <input
                type="file"
                id="pan-upload"
                onChange={(e) => handleFileUpload(e, "panDocument")}
                accept=".pdf"
                className={`w-full border rounded-xl p-3 ${errors.panDocument ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.panDocument && <p className="text-red-500 text-sm mt-1">{errors.panDocument}</p>}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg w-full sm:w-[200px] text-lg"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default ProceedModal;
