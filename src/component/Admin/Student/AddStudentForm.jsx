import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux"; // Import useDispatch
import { updateNewStudent } from "../../../Redux_store/slices/StudentSlice"; // Adjust the import path to your studentSlice
import { Button } from "../../src/components/ui/Button";
import {
  ArrowLeft,
  Calendar,
  Phone,
  User,
  UserCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/ui/select";
import "./Student.css";

// Zod schema for form validation
const addSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .regex(/^[A-Za-z\s]+$/, "Only alphabets (A-Z, a-z) and spaces are allowed"),
  gender: z.string().min(1, "Gender selection is required"),
  contact_no: z
    .string()
    .length(10, "Contact number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Only numbers are allowed"),
  dob: z.string().min(1, "Date of Birth is required"),
});

const AddStudentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addSchema),
    defaultValues: {
      name: "",
      gender: "",
      contact_no: "",
      dob: "",
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    try {
      // Prepare data to match newStudent fields
      const payload = {
        name: data.name,
        contact_no: data.contact_no,
        gender: data.gender.charAt(0).toUpperCase() + data.gender.slice(1).toLowerCase(), // Capitalize first letter (e.g., "male" -> "Male")
        dob: new Date(data.dob).toISOString(), // Convert to ISO format
      };

      // Dispatch the form data to update newStudent in Redux store
      dispatch(updateNewStudent(payload));
      navigate("/ProceedModal", { state: { formData: payload } });
      // Log the data for debugging (optional)
      console.log("Dispatched newStudent data:", payload);

      // Reset the form after submission
      reset();

      // Optionally navigate back or to another page
      // navigate(-1); // Uncomment if you want to navigate back
    } catch (err) {
      console.error("Error processing form data:", err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6 mt-5">
        <Button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 shadow-md"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline">Back to Student</span>
        </Button>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 shadow-md shadow-blue-200 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Add Student Details</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="relative">
            <label className="font-semibold text-lg mb-2 flex items-center gap-2">
              <User size={18} /> Name *
            </label>
            <input
              {...register("name")}
              className={`w-full border border-gray-300 bg-transparent rounded-xl p-3 shadow-lg ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Gender */}
          <div className="relative">
            <label className="font-semibold text-lg mb-2 flex items-center gap-2">
              <UserCircle size={18} /> Select Gender *
            </label>
            <Select
              onValueChange={(value) => {
                setValue("gender", value);
                clearErrors("gender");
              }}
            >
              <SelectTrigger className={`w-full border border-gray-300 rounded-xl h-12 p-3 shadow-lg ${errors.gender ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
          </div>

          {/* Contact */}
          <div className="relative">
            <label className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Phone size={18} /> Enter Contact No. *
            </label>
            <input
              type="text" // Changed to text to prevent number input issues with leading zeros
              {...register("contact_no")}
              className={`w-full border border-gray-300 bg-transparent rounded-xl p-3 shadow-lg ${errors.contact_no ? 'border-red-500' : ''}`}
              placeholder="Phone number"
            />
            {errors.contact_no && <p className="text-red-500">{errors.contact_no.message}</p>}
          </div>

          {/* DOB */}
          <div className="relative">
            <label className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Calendar size={18} /> Enter DOB *
            </label>
            <input
              type="date"
              {...register("dob")}
              className={`w-full border border-gray-300 bg-transparent rounded-xl p-3 shadow-lg ${errors.dob ? 'border-red-500' : ''}`}
              placeholder="Enter DOB"
            />
            {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
          </div>

          <div className="col-span-1 sm:col-span-2 flex justify-center">
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 px-10 py-3 rounded-lg text-white"
            >
              Proceed
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;