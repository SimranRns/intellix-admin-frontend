import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button
} from "../../src/components/ui/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Calendar,
  Hash,
  HashIcon,
  ListChecks,
  Mail,
  Phone,
  School,
  User,
  UserCircle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/ui/select";
import "./Student.css";

const addSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .regex(/^[A-Za-z\s]+$/, "Only alphabets (A-Z, a-z) and spaces are allowed"),

  school: z
    .string()
    .min(3, "School name must be at least 3 characters long")
    .regex(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),

  email: z.string().email("Enter a valid email"),

  gender: z.string().min(1, "Gender selection is required"),

  contact: z
    .string()
    .length(10, "Contact number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Only numbers are allowed"),

  category: z.string().min(1, "Category selection is required"),

  serialNo: z.string().min(1, "Serial number is required"),

  dob: z.string().min(1, "Date of Birth is required"),
});

const AddStudentForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(addSchema),
    defaultValues: {
      name: "",
      school: "",
      email: "",
      gender: "",
      contact: "",
      category: "",
      serialNo: "",
      dob: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Validation successful:", data);
    navigate("/ProceedModal");
    reset();
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
          <label className="block font-semibold text-lg mb-2 flex items-center gap-2">
            <User size={18} /> Name *
          </label>
          <input
            {...register("name")}
            className={`w-full border border-gray-300 bg-transparent rounded-xl p-3 shadow-lg ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* School */}
        <div className="relative">
          <label className="block font-semibold text-lg mb-2 flex items-center gap-2">
            <School size={18} /> Previous School *
          </label>
          <input
            {...register("school")}
            className={`w-full border border-gray-300 bg-transparent rounded-xl p-3 shadow-lg ${errors.school ? 'border-red-500' : ''}`}
            placeholder="Previous School Name"
          />
          {errors.school && <p className="text-red-500">{errors.school.message}</p>}
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block font-semibold text-lg mb-2 flex items-center gap-2">
            <Mail size={18} /> Enter Email *
          </label>
          <input
            type="email"
            {...register("email")}
            className={`w-full border border-gray-300 bg-transparent rounded-xl p-3 shadow-lg ${errors.email ? 'border-red-500' : ''}`}
            placeholder="example@gmail.com"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Gender */}
        <div className="relative">
          <label className="block font-semibold text-lg mb-2 flex items-center gap-2">
            <UserCircle size={18} /> Select Gender *
          </label>
          <Select onValueChange={(value) => {
            setValue("gender", value);
            clearErrors("gender");
          }}>
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
          <label className="block font-semibold text-lg mb-2 flex items-center gap-2">
            <Phone size={18} /> Enter Contact No. *
          </label>
          <input
            type="number"
            {...register("contact")}
            className={`w-full border border-gray-300 bg-transparent rounded-xl p-3 shadow-lg ${errors.contact ? 'border-red-500' : ''}`}
            placeholder="Phone number"
          />
          {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
        </div>

        {/* Category */}
        <div className="relative">
          <label className="block font-semibold text-lg mb-2 flex items-center gap-2">
            <ListChecks size={18} /> Select Category *
          </label>
          <Select onValueChange={(value) => {
            setValue("category", value);
            clearErrors("category");
          }}>
            <SelectTrigger className={`w-full border border-gray-300 rounded-xl h-12 p-3 shadow-lg ${errors.category ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="obc">OBC</SelectItem>
              <SelectItem value="sc">SC</SelectItem>
              <SelectItem value="st">ST</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>

        {/* Serial No */}
        <div className="relative">
          <label className="block font-semibold text-lg mb-2 flex items-center gap-2">
            <Hash size={18} /> Enter Serial No. *
          </label>
          <input
            type="number"
            {...register("serialNo")}
            className={`w-full border border-gray-300 bg-transparent rounded-xl p-3 shadow-lg ${errors.serialNo ? 'border-red-500' : ''}`}
            placeholder="Serial number"
          />
          {errors.serialNo && <p className="text-red-500">{errors.serialNo.message}</p>}
        </div>

        {/* DOB */}
        <div className="relative">
          <label className="block font-semibold text-lg mb-2 flex items-center gap-2">
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
          <Button type="submit" className="bg-blue-700 hover:bg-blue-500 px-10 py-3 rounded-lg text-white">
            Proceed
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddStudentForm;
