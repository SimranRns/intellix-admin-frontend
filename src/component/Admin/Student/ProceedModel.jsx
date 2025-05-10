import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { ArrowLeft, Hash, IdCard } from "lucide-react";
import { Button } from "../../src/components/ui/button";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";
import { updateNewStudent } from "../../../Redux_store/slices/StudentSlice"; // Adjust path to your studentSlice

// Zod schema for validation (only for adhar_no and address)
const schema = z.object({
  adhar_no: z
    .string()
    .length(12, "Aadhaar must be 12 digits")
    .regex(/\d+$/, "Only numbers allowed"),
  address: z.string().min(5, "Address is required"),
});

const ProceedModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newStudent = useSelector((state) => state.students.newStudent);

  // Initialize formData with Redux newStudent state for adhar_no and address
  const [formData, setFormData] = useState({
    adhar_no: newStudent.adhar_no || "",
    address: newStudent.address || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // Dispatch updated field to Redux store
    dispatch(updateNewStudent({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Validate form data using Zod
      const validatedData = schema.parse({
        adhar_no: formData.adhar_no,
        address: formData.address,
      });

      // Combine validated data with existing newStudent data from Redux
      const completeData = {
        ...newStudent,
        ...validatedData,
      };

      // Navigate to the next page with complete data
      navigate("/StudentSelectionPage", { state: { formData: completeData } });

      console.log("Dispatched newStudent data:", completeData);
      
    } catch (error) {
      const formattedErrors = {};
      if (error.errors) {
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
      } else {
        formattedErrors.api = error.message || "Something went wrong";
      }
      setErrors(formattedErrors);
    }
  };

  const goback = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="flex items-center gap-4 p-4">
        <Button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 shadow-md"
          onClick={goback}
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline">Back</span>
        </Button>
      </div>
      <div className="mx-auto border rounded-2xl h-auto min-h-[320px] max-w-4xl shadow-md shadow-blue-500/50 p-8 mt-5">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">
          Enter Additional Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address Field */}
          <div>
            <Label className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Hash size={18} /> Enter Address
            </Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full h-12 border rounded-xl p-3 bg-transparent ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Aadhaar Number */}
          <div>
            <Label className="font-semibold text-lg mb-2 flex items-center gap-2">
              <IdCard size={18} /> Enter Aadhaar Number
            </Label>
            <Input
              type="text"
              name="adhar_no"
              value={formData.adhar_no}
              onChange={handleChange}
              maxLength={12} // Restrict to 12 digits
              className={`w-full  h-12 border rounded-xl p-3 bg-transparent ${
                errors.aadhaarNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Aadhaar number (12 digits)"
            />
            {errors.adhar_no && (
              <p className="text-red-500 text-sm mt-1">
                {errors.adhar_no}
              </p>
            )}
          </div>

          {/* API Error */}
          {errors.api && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {errors.api}
            </p>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg w-full sm:w-[200px] text-lg"
            >
              Proceed
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProceedModal;
