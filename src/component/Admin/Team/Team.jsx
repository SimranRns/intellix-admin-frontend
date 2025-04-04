import React, { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Header from "../Dashboard/Header";
import "./Team.css";
import TimePicker from "../../src/components/ui/time-picker";
import { format } from "date-fns";
import { Calendar } from "../../src/components/ui/calendar";
import { cn } from "../../src/lib/utils";
import { Button } from "@headlessui/react";
import { z } from "zod";
import { Icon } from "@radix-ui/react-select";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { Checkbox } from "../../src/components/ui/checkbox";
import {
  ChevronDown,
  Mail,
  Search,
  User,
  Ellipsis,
  Camera,
  HandCoins,
  Clock,
  Logs,
  GraduationCap,
  Phone,
  CalendarIcon,
  MapPinHouse,
  Banknote,
  ArrowLeft,
} from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "../../src/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../src/components/ui/pagination";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";

// Schema for the first form (Basic Details)
const basicDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  post: z.string().min(2, "Post must be at least 2 characters"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
});

// Schema for the second form (Additional Details)
const additionalDetailsSchema = z.object({
  Teachername: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  highestQualification: z.string().min(1, "Qualification is required"),
  institution: z.string().min(1, "Institution is required"),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, "Enter a valid 10-digit contact number"),
  emergencyContact: z
    .string()
    .regex(/^\d{10}$/, "Enter a valid 10-digit emergency number"),
  Salary: z.string().min(4, "Enter a valid amount"),
  JoiningDate: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date format",
  }),
});

const additionalDetailsSchema2 = z.object({
  ResidentialAddress: z
    .string()
    .min(5, "Residential Address must be at least 5 characters."),
  District: z.string().min(2, "District name is required."),
  State: z.string().min(2, "State name is required."),
  Pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits."),

  terms: z.boolean().optional(),

  PermanentAddress: z
    .string()
    .min(5, "Permanent Address must be at least 5 characters.")
    .optional(),
  PermanentDistrict: z
    .string()
    .min(2, "Permanent District is required.")
    .optional(),
  PermanentState: z.string().min(2, "Permanent State is required.").optional(),
  PermanentPincode: z
    .string()
    .regex(/^\d{6}$/, "Permanent Pincode must be exactly 6 digits.")
    .optional(),

  departmentSelection: z.string().min(1, "Department selection is required."),
});

const bankDetailsSchema = z.object({
  accountNumber: z.string().min(10, "Account Number must be at least 10 digits"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),
  accountHolderName: z.string().min(3, "Name should be at least 3 characters"),
});

// Mock teacher data
// const Teachers = Array.from({ length: 1 }, (_, i) => ({
//   id: i + 1,
//   name: "Munaroh Steffani",
//   username: `munaroh_${i + 1}`,
//   // subject: ["Joined 01-01-2024", "Assigned 13", "Completed 3"],
//   subject: "Joined 01-01-2024",
//   icon: Clock,
//   subject: "Assigned 13",
//   icon: Logs,
//   subject: "Assigned 13",
//   icon: Logs,

//   image: "https://github.com/shadcn.png",
//   // icon: [Clock, Logs, Logs],
// }));
const Teachers = [
  {
    id: 1,
    name: "Munaroh Steffani",
    post: "Math Teacher",
    subjects: [
      { subject: "Joined 01-01-2024", icon: Clock },
      { subject: "Assigned 13", icon: Logs },
      { subject: "Completed 3", icon: Logs },
    ],
    image: "https://github.com/shadcn.png",
  },
  {
    id: 1,
    name: "Munaroh Steffani",
    post: "Math Teacher",
    subjects: [
      { subject: "Joined 01-01-2024", icon: Clock },
      { subject: "Assigned 13", icon: Logs },
      { subject: "Completed 3", icon: Logs },
    ],
    image: "https://github.com/shadcn.png",
  },
  {
    id: 1,
    name: "Munaroh Steffani",
    post: "Math Teacher",
    subjects: [
      { subject: "Joined 01-01-2024", icon: Clock },
      { subject: "Assigned 13", icon: Logs },
      { subject: "Completed 3", icon: Logs },
    ],
    image: "https://github.com/shadcn.png",
  },
  {
    id: 1,
    name: "Munaroh Steffani",
    post: "Math Teacher",
    subjects: [
      { subject: "Joined 01-01-2024", icon: Clock },
      { subject: "Assigned 13", icon: Logs },
      { subject: "Completed 3", icon: Logs },
    ],
    image: "https://github.com/shadcn.png",
  },
];

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";
import {
  Popover,
  PopoverTrigger,
} from "../../src/components/ui/popover";
import { Navigate, useNavigate } from "react-router-dom";
import AppSidebar from "../../src/components/ui/app-sidebar";
import ThankYouCard from "../Dashboard/ThankYouCard";

const Team = ({ teacherData }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Newest");
  const [selectedDepartment, setSelectedDepartment] = useState("Select Department");
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage, setTeachersPerPage] = useState(10);
  const [profileImg, setProfileImg] = useState("https://github.com/shadcn.png");
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [Addteacher, setTeacher] = useState(false);//first
  const [AddDetails, setAddDetails] = useState(false);//secondd
  const [AddBankDetails, setAddBankDetails] = useState(false);//third
  const [AddConfrom, setAddConfrom] = useState(false);//fourth
  const [Deleteteacher, setDelete] = useState(false);
  const [ChangeTime, setChangeTime] = useState(false);
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [InputName, setInputName] = useState("");
  const fileInputRef = useRef(null);
  const [date, setDate] = useState("");
  const [activePage, setActivePage] = useState("Team");


  const departmentList = [
    "Science",
    "Mathematics",
    "History",
    "English",
    "Computer Science",
  ];

  const updateTeachersPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setTeachersPerPage(4); // Mobile
    } else if (width < 1024) {
      setTeachersPerPage(6); // Tablet
    } else {
      setTeachersPerPage(6); // Desktop
    }
  };

  // Update on window resize
  useEffect(() => {
    updateTeachersPerPage();
    window.addEventListener("resize", updateTeachersPerPage);
    return () => window.removeEventListener("resize", updateTeachersPerPage);
  }, []);
  const totalPages = Math.ceil(Teachers.length / teachersPerPage);
  const startIndex = (currentPage - 1) * teachersPerPage;
  const selectedTeachers = Teachers.slice(
    startIndex,
    startIndex + teachersPerPage
  );
  // Initialize useForm
  // Form instances
  const basicForm = useForm({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      post: teacherData?.post || "",
      name: teacherData?.name || "",
      subject: teacherData?.subject || "",
    },
  });


  const additionalForm = useForm({
    resolver: zodResolver(additionalDetailsSchema),
    defaultValues: {
      Teachername: "",
      email: "",
      highestQualification: "",
      institution: "",
      contactNumber: "",
      emergencyContact: "",
    },
  });
  const additionalForm2 = useForm({
    resolver: zodResolver(additionalDetailsSchema2),
    defaultValues: {
      ResidentialAddress: "",
      District: "",
      State: "",
      Pincode: "",
      terms: false,
      PermanentAddress: "",
      PermanentDistrict: "",
      PermanentState: "",
      PermanentPincode: "",
      departmentSelection: "",
    },
  });
  const additionalForm3 = useForm({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
    },
  });


  ///////dilog function
  const main = async (e) => {
    // e.preventDefault(); // Uncomment if inside a form submit handler

    const isValid = await additionalForm.trigger();
    if (!isValid) {
      console.log("Validation failed:", additionalForm.formState.errors);
      return;
    }

    const formData = additionalForm.getValues();
    const validationResult = additionalDetailsSchema.safeParse(formData);

    if (validationResult.success) {
      console.log("Data submitted:", formData);
      additionalForm.reset();
      setTeacher("");
      setTeacher(false);
      setAddDetails(true);
    } else {
      console.log("Validation errors:", validationResult.error.format());

      Object.entries(validationResult.error.format()).forEach(([key, value]) => {
        additionalForm.setError(key, {
          type: "manual",
          message: value._errors?.[0] || "Invalid field",
        });
      });
    }
  };

  //second dilog function
  const mainSecond = async (e) => {
    e.preventDefault();

    const isValid = await additionalForm2.trigger();

    if (!isValid) {
      console.log("Validation failed:", additionalForm2.formState.errors);
      return;
    }

    const formData = additionalForm2.getValues();
    const validationResult = additionalDetailsSchema2.safeParse(formData);

    if (validationResult.success) {
      console.log("Data submitted:", formData);
      additionalForm2.reset();
      setAddDetails("")
      setAddDetails(false);
      setAddBankDetails(true);
    } else {
      console.log("Validation errors:", validationResult.error.format());

      Object.entries(validationResult.error.format()).forEach(([key, value]) => {
        additionalForm2.setError(key, {
          type: "manual",
          message: value._errors?.[0] || "Invalid field",
        });
      });
    }
  };
  ///////////third dilog
  const mainthird = async (e) => {
    e.preventDefault();

    const isValid = await additionalForm3.trigger();
    if (!isValid) {
      console.log("Validation failed:", additionalForm3.formState.errors);
      return;
    }

    const formData = additionalForm3.getValues();
    const validationResult = bankDetailsSchema.safeParse(formData);

    if (validationResult.success) {
      console.log("Data submitted:", formData);
      additionalForm3.reset();
      setAddBankDetails("")
      setAddBankDetails(false);
      setAddConfrom(true);
    } else {
      console.log("Validation errors:", validationResult.error.format());

      Object.entries(validationResult.error.format()).forEach(([key, value]) => {
        additionalForm3.setError(key, {
          type: "manual",
          message: value._errors?.[0] || "Invalid field",
        });
      });
    }
  };

  // **Unique Function Name: handleTeacherFormSubmit**
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh

    console.log("Submitted Time:", { inTime, outTime });

    // Reset the time pickers
    setInTime(null);
    setOutTime(null);

    // Close the Change Time dialog
    setChangeTime(false);

    // Open the confirmation dialog
    setAddConfrom(true);
};


  const handleChange = (e) => {
    setInputName(e.target.value);
    console.log(InputName);
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setProfileImg(imageUrl);
  //   }
  // };
  // const onSubmit = (data) => {
  //   console.log("Form Submitted:", data);
  // };
  const handleBasicFormSubmit = (data) => {
    console.log("Basic Form Data:", data);

    // Reset form fields after submission
    basicForm.reset();

    // Close the dialog
    setOpen(false);
    setAddConfrom(true)
};


  const handleAdditionalFormSubmit = (data) => {
    console.log("Additional Form Data:", data);

  };
  const handleAdditionalFormSubmit2 = (data) => {
    console.log("Additional Form Data:", data);
  };
  const handleAdditionalFormSubmit3 = (data) => {
    console.log("Submitted Data:", data);
  };
  const handleConfirm = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("Data Submitted Successfully!");

      setAddConfrom(false);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const { watch, setValue } = additionalForm2;
  const isSameAddress = watch("terms");
  const residentialAddress = watch("ResidentialAddress");
  const district = watch("District");
  const state = watch("State");
  const pincode = watch("Pincode");

  useEffect(() => {
    if (isSameAddress) {
      setValue("PermanentAddress", residentialAddress);
      setValue("PermanentDistrict", district);
      setValue("PermanentState", state);
      setValue("PermanentPincode", pincode);
    }
  }, [isSameAddress, residentialAddress, district, state, pincode, setValue]);

  return (


    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      {/* Pass setActivePage to Sidebar */}
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="w-full  shadow-md shadow-blue-300/30 rounded-lg flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 space-y-4 sm:space-y-0">
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="By Employee Name..."
                className="ml-2 w-full outline-none bg-transparent"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-md border border-blue-300 px-6 sm:px-8 md:ms-5  hover:bg-blue-500 hover:text-white py-2 text-sm font-medium flex items-center">
                    <span>{selectedOption}</span>
                    <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="left"
                  align="start"
                  className="bg-white z-[50] text-black w-40 shadow-md rounded-md mt-2  border border-blue-300 "
                >
                  <DropdownMenuItem
                    onClick={() => setSelectedOption("Newest")}
                    className="cursor-pointer hover:bg-blue-600 hover:text-white  px-4 py-2 text-center"
                  >
                    Newest
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedOption("Oldest")}
                    className="cursor-pointer hover:bg-blue-600 hover:text-white px-4 py-2 text-center"
                  >
                    Oldest
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedOption("Recent")}
                    className="cursor-pointer hover:bg-blue-600 hover:text-white px-4 py-2 text-center"
                  >
                    Recent
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Department Button */}
              <Button
                onClick={() => { Navigate("/Departments") }}

                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm">

                Departments
              </Button>
              {/* Department Button */}
              <Button
                onClick={() => Navigate("/Ex-Employee")}

                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm">
                Ex-Employee
              </Button>

              {/* Add Teacher Button */}
              <Button
                onClick={() => setTeacher(true)}
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm"
              >
                + Add Employee
              </Button>

              {/* //First dilog */}
              <Dialog open={Addteacher} onOpenChange={setTeacher}>
                <DialogContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                  className="sm:max-w-[800px] shadow-lg p-6 rounded-lg h-[90%] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                  {/* Back Arrow & Title */}
                  <div className="flex items-center mb-4">
                    <DialogTitle className="text-center flex-1">Add Employee</DialogTitle>
                  </div>
                  <hr />

                  <Form {...additionalForm}>
                    <form
                      onSubmit={additionalForm.handleSubmit(
                        handleAdditionalFormSubmit
                      )}
                      className="space-y-6"
                    >
                      {/* Centered Profile Image */}
                      <div className="flex justify-center">
                        <div className="relative w-32 h-32">
                          <Avatar className="w-full h-full shadow-md rounded-full">
                            <AvatarImage
                              src={profileImg || "/default-avatar.png"}
                              alt="Profile Image"
                              className="rounded-full  border-4 border-blue-600"
                            />
                            <AvatarFallback className="rounded-full">
                              CN
                            </AvatarFallback>
                          </Avatar>
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-700 transition"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Camera className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Two-Column Grid Layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <FormField
                          control={additionalForm.control}
                          name="Teachername"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    value={InputName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    {...field} // Agar ye issue create kar raha hai to hata kar dekho
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />

                                  {/* <input type="text"  onChange={handleChange} /> */}
                                  <span className="absolute right-4 text-gray-500">
                                    <User size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Highest Qualification */}
                        <FormField
                          control={additionalForm.control}
                          name="highestQualification"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Highest Qualification</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Bachelor's / Master's"
                                    {...field}
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <GraduationCap size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Institution */}
                        <FormField
                          control={additionalForm.control}
                          name="institution"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution Name</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter Institution Name"
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                    {...field}
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <GraduationCap size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Contact Number */}
                        <FormField
                          control={additionalForm.control}
                          name="contactNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Number</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    type="number"
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                    placeholder="Enter Contact Number"
                                    {...field}
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <Phone size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Emergency Contact */}
                        <FormField
                          control={additionalForm.control}
                          name="emergencyContact"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emergency Contact</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    type="number"
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                    placeholder="Enter Emergency Number"
                                    {...field}
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <Phone size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Email */}
                        <FormField
                          control={additionalForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    type="email"
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                    placeholder="Enter Email"
                                    {...field}
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <Mail size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Salary  */}
                        <FormField
                          control={additionalForm.control}
                          name="Salary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Enter in Hand Salary* (Per month)
                              </FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    type="number"
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                    placeholder="In Hand Salary"
                                    {...field}
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <HandCoins size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Date (Date Picker) */}
                        <FormField
                          control={additionalForm.control}
                          name="JoiningDate"
                          render={({ field }) => {
                            const inputRef = useRef(null); // Ref for the hidden date input

                            return (
                              <FormItem className="flex flex-col mt-2">
                                <FormLabel>Joining Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className="w-[260px] flex items-center text-gray-500 justify-between border border-blue-400 rounded-xl px-4 py-2 shadow-lg"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          inputRef.current?.showPicker(); // Opens the date input
                                        }}
                                      >
                                        {field.value ? (
                                          format(new Date(field.value), "yyyy-MM-dd")
                                        ) : (
                                          <span className="text-gray-500">Select Joining Date</span>
                                        )}
                                        <CalendarIcon className="h-5 w-5" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>

                                  {/* Hidden native date input */}
                                  <Input
                                    ref={inputRef}
                                    type="date"
                                    className="opacity-0 cursor-pointer"
                                    value={field.value ? format(new Date(field.value), "yyyy-MM-dd") : ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                  />
                                </Popover>

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <Button
                          onClick={(e) => main(e)} // ✅ Pass event to function
                          type="button" // ✅ Prevent unwanted form submission
                          className="bg-indigo-600 text-white px-9 py-2 rounded-lg hover:bg-indigo-700"
                        >
                          Save
                        </Button>

                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              {/* //second dilog */}
              <Dialog open={AddDetails} onOpenChange={setAddDetails}>
                <DialogContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                  className="sm:max-w-[800px] shadow-lg p-6 rounded-lg h-[90%] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                  {/* Back Arrow & Title */}
                  <div className="flex items-center mb-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering parent dialogs
                        setAddDetails(false);
                        setTeacher(true)

                      }}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <DialogTitle className="text-center flex-1">Access Control Details</DialogTitle>
                  </div>
                  <hr />

                  <Form {...additionalForm2}>
                    <form
                      onSubmit={additionalForm2.handleSubmit(
                        handleAdditionalFormSubmit2
                      )}
                      className="space-y-6"
                    >
                      {/* Two-Column Grid Layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Residential Address Field */}
                        <FormField
                          control={additionalForm2.control}
                          name="ResidentialAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Residential Address</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter Residential Address"
                                    {...field}
                                    type="String"
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <MapPinHouse size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* District Field */}
                        <FormField
                          control={additionalForm2.control}
                          name="District"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>District</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter District Name"
                                    {...field}
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <MapPinHouse size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* State Field */}
                        <FormField
                          control={additionalForm2.control}
                          name="State"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter State Name"
                                    {...field}
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <MapPinHouse size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Pincode Field */}
                        <FormField
                          control={additionalForm2.control}
                          name="Pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pincode</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter Pincode "
                                    {...field}
                                    type="number"
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <MapPinHouse size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <hr className="border-gray-300 my-4" />
                        <FormField
                          control={additionalForm2.control}
                          name="terms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-semibold text-gray-500">
                                Permanent Address
                              </FormLabel>
                              <div className="flex items-center space-x-3 mt-2">
                                <Checkbox
                                  id="terms"
                                  className="w-4 sm:w-5 h-4 sm:h-5"
                                  checked={field.value}
                                  onCheckedChange={(checked) =>
                                    field.onChange(checked)
                                  }
                                />
                                <Label
                                  htmlFor="terms"
                                  className="text-gray-500 text-sm sm:text-sm"
                                >
                                  Use the same address as Residential
                                  Address
                                </Label>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/*  Permanent Address Fields */}
                        <FormField
                          control={additionalForm2.control}
                          name="PermanentAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Permanent Address</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter Permanent Address"
                                    {...field}
                                    disabled={isSameAddress} // Disable if checkbox is checked
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <MapPinHouse size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={additionalForm2.control}
                          name="PermanentDistrict"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>District</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter District Name"
                                    {...field}
                                    disabled={isSameAddress}
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <MapPinHouse size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={additionalForm2.control}
                          name="PermanentState"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter State Name"
                                    {...field}
                                    disabled={isSameAddress}
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <MapPinHouse size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={additionalForm2.control}
                          name="PermanentPincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel> Pincode</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter Pincode"
                                    {...field}
                                    disabled={isSameAddress}
                                    type="number"
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                  <span className="absolute right-4 text-gray-500">
                                    <MapPinHouse size={21} />
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Department Selection Dropdown */}
                        <FormField
                          control={additionalForm2.control}
                          name="departmentSelection"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select Department*</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        type="button"
                                        className="w-full border border-blue-300 rounded-xl p-5 shadow-lg py-2 focus:ring-1 focus:ring-blue-500 font-sm flex items-center justify-between"
                                      >
                                        <span className="text-gray-500">
                                          {field.value ||
                                            "Select Department"}
                                        </span>
                                        <ChevronDown
                                          size={16}
                                          className="ml-2"
                                        />
                                      </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                      align="start"
                                      className="max-h-[20vh] overflow-y-auto w-[44vh] shadow-md rounded-md mt-2 border border-gray-300 "
                                    >
                                      {departmentList?.map(
                                        (dept, index) => (
                                          <DropdownMenuItem
                                            key={index}
                                            onClick={() => {
                                              field.onChange(dept);
                                              setSelectedDepartment(
                                                dept
                                              );
                                            }}
                                            className="cursor-pointer px-4 py-2 hover:bg-blue-600 hover:text-white bg-white text-gray-800"
                                          >
                                            {dept}
                                          </DropdownMenuItem>
                                        )
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Teacher/Professor or Academics Staff*/}
                        <FormField
                          control={additionalForm2.control}
                          name="isTeacher"
                          render={({ field }) => (
                            <FormItem className="mt-1">
                              <FormLabel className="text-md font-semibold text-gray-800">
                                Add as a Teacher, Professor, or Academic
                                Staff
                              </FormLabel>
                              <div className="flex items-center space-x-3 mt-2 pt-2">
                                <Checkbox
                                  id="isTeacher"
                                  className="w-4 sm:w-5 h-4 sm:h-5"
                                  checked={field.value}
                                  onCheckedChange={(checked) =>
                                    field.onChange(checked)
                                  }
                                />
                                <Label
                                  htmlFor="isTeacher"
                                  className="text-gray-500 text-sm sm:text-sm"
                                >
                                  Add as a Teacher/Professor or Academic
                                  Staff
                                </Label>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <Button
                          onClick={(e) => mainSecond(e)}
                          // onClick={() => setAddBankDetails(true)}
                          type="submit"
                          className="bg-indigo-600 text-white px-9 py-2 rounded-lg hover:bg-indigo-700"
                        >
                          Save
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              {/* //third dilog */}
              <Dialog open={AddBankDetails} onOpenChange={setAddBankDetails}>
                <DialogContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                  className="sm:max-w-[800px] shadow-lg p-6 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">

                  {/* Back Arrow & Title */}
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => { setAddBankDetails(false); setAddDetails(true) }}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <DialogTitle className="text-center flex-1">Bank Account Details</DialogTitle>
                  </div>

                  <hr />

                  <Form {...additionalForm3}>
                    <form onSubmit={additionalForm3.handleSubmit(handleAdditionalFormSubmit3)} className="space-y-6">

                      {/* Two-Column Grid Layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">

                        {/* Account Number */}
                        <FormField control={additionalForm3.control} name="accountNumber" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter Bank Account Number</FormLabel>
                            <FormControl>
                              <div className="relative flex items-center">
                                <Input placeholder="Enter Account Number" {...field} type="text" className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        {/* IFSC Code */}
                        <FormField control={additionalForm3.control} name="ifscCode" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter IFSC Code</FormLabel>
                            <FormControl>
                              <div className="relative flex items-center">
                                <Input placeholder="Enter Bank IFSC Code" {...field} className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        {/* Account Holder Name */}
                        <FormField control={additionalForm3.control} name="accountHolderName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter Account Holder Name</FormLabel>
                            <FormControl>
                              <div className="relative flex items-center">
                                <Input placeholder="Enter Bank Account Holder Name" {...field} className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <Button
                          onClick={(e) => mainthird(e)}

                          type="submit" className="bg-indigo-600 text-white px-9 py-2 rounded-lg hover:bg-indigo-700">
                          Save
                        </Button>
                      </div>

                    </form>
                  </Form>

                </DialogContent>
              </Dialog>



            </div>
          </div>

          {/* Teacher Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {selectedTeachers.map((teacher) => (
              <Card
                key={teacher.id}
                className="w-full max-w-[350px] shadow-sm shadow-blue-500/50 rounded-xl p-6 relative mx-auto"
              >
                {/* Options Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="absolute top-4 right-4 bg-blue-100 p-2 rounded-lg shadow-sm hover:bg-gray-200">
                      <Ellipsis className="text-gray-500" size={24} />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-30 bg-gray-100 mt-1 shadow-md rounded-md"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer text-black hover:bg-gray-200 px-4 py-2 text-center"
                      onClick={() => setOpen(true)} // Open dialog on click
                    >
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer text-black hover:bg-gray-200 px-4 py-2 text-center">
                      Assigns
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-black hover:bg-gray-200 px-4 py-2 text-center">
                      +Assign Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-black hover:bg-gray-200 px-4 py-2 text-center"
                      onClick={() => setChangeTime(true)}
                    >
                      Change Timing
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDelete(true)}
                      className="cursor-pointer text-red-500 hover:bg-gray-200 px-4 py-2 text-center"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* dialog box change Time */}
                <Dialog open={ChangeTime} onOpenChange={setChangeTime}>
                  <DialogContent
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    className="sm:max-w-[425px]  shadow-lg p-6 rounded-lg">
                    <DialogHeader>
                      <DialogTitle className="text-center text-[29px]">
                        Change Time
                      </DialogTitle>
                      <DialogDescription className="text-center text-md">
                        Are you sure you want to change this employee's timing?
                      </DialogDescription>
                    </DialogHeader>
                    <hr className="mt-5"></hr>
                    <div className="flex justify-center">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-between items-center w-full text-center">
                          <div className="w-1/2">
                            <TimePicker
                              label="In Time"
                              selectedTime={inTime}
                              setSelectedTime={setInTime}
                            />
                          </div>
                          <div className="w-1/2">
                            <TimePicker
                              label="Out Time"
                              selectedTime={outTime}
                              setSelectedTime={setOutTime}
                            />
                          </div>
                        </div>
                        <Button
                        onClick={() => setChangeTime(false)}
                          type="submit"
                          className="bg-indigo-500 text-white px-5 w-full py-2 rounded-lg hover:bg-indigo-600"
                        >
                          Proceed
                        </Button>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* dialog box Delete */}
                <Dialog open={Deleteteacher} onOpenChange={setDelete}>
                  <DialogContent
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    className="sm:max-w-[425px]  shadow-lg p-6 rounded-lg">
                    <DialogHeader>
                      <DialogTitle className="text-center text-[29px]">
                        Deactivate Employee
                      </DialogTitle>
                      <DialogDescription className="text-center text-md">
                        Are you sure you want to deactivate this employee ?
                      </DialogDescription>
                    </DialogHeader>

                    <hr className="mt-5"></hr>
                    <div className="flex justify-center">
                      <Button
                      onClick={() => {setDelete(false),setAddConfrom(true)}}
                        type="submit"
                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                      >
                        Deactivate Employee
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* dialog box edit */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    className="sm:max-w-[425px]  shadow-lg p-6 rounded-lg">
                    <DialogHeader>
                      <DialogTitle className="text-">Edit Task</DialogTitle>
                    </DialogHeader>
                    <hr></hr>
                    <Form {...basicForm}>
                      <form
                        onSubmit={basicForm.handleSubmit(handleBasicFormSubmit)}
                        className="space-y-6"
                      >
                        {/* Post Field */}
                        <FormField
                          control={basicForm.control}
                          name="post"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Post</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Teacher"
                                  {...field}
                                  className="w-full border border-blue-300 rounded-xl p-4 sm:p-5 pr-10 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Name Field */}
                        <FormField
                          control={basicForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Munaroh Steffani"
                                  {...field}
                                  className="w-full border border-blue-300 rounded-xl p-4 sm:p-5 pr-10 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Subject Field */}
                        <FormField
                          control={basicForm.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Mathematics"
                                  {...field}
                                  className="w-full border border-blue-300 rounded-xl p-4 sm:p-5 pr-10 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Buttons */}
                        <div className="flex justify-between">
                          <Button
                          
                            type="submit"
                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
                          >
                            Save
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                {/* Card Content */}
                <CardHeader className="flex flex-col items-center text-center">
                  <Avatar className="shadow-md w-24 h-24 rounded-full">
                    <AvatarImage
                      className="rounded-full  border-4 border-blue-600"
                      src={teacher.image}
                      alt={teacher.name}
                    />
                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-xl font-bold Teacher_name">
                    {teacher.name}
                  </CardTitle>
                  <CardDescription>Teacher</CardDescription>
                </CardHeader>

                <CardContent className="text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    {teacher.subjects.map((item, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 px-3 p-1 rounded-lg text-sm text-blue-500 font-semibold flex items-center gap-1"
                      >
                        <item.icon size={16} />
                        {item.subject}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-center gap-3 mt-5">
                  <Button
                    className="bg-indigo-600 text-xs text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-indigo-700 transition-all"
                    onClick={() => Navigate("/View-Profile")}
                  >
                    <User size={18} /> Profile
                  </Button>
                  <Button
                    onClick={() => Navigate("/manage_salary")}
                    className="bg-orange-500 text-xs text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-orange-600 transition-all">
                    <HandCoins size={18} /> Manage Salary
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>


          {/* confirm dilog */}
          <Dialog open={AddConfrom} onOpenChange={setAddConfrom}>
            <DialogContent
              onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
              className="w-full max-w-[90vw] sm:max-w-[400px] p-6 rounded-lg">
              <ThankYouCard />
              {/* Dialog Footer */}
              <DialogFooter className="flex justify-end gap-3">
                <Button
                  onClick={() => setAddConfrom(false)}
                  variant="outline"
                  className="w-full sm:w-auto mt-4 bg-gray-100 hover:bg-gray-200 hover:text-black px-5 py-2 rounded-md text-black flex items-center transition-all"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm} // Handle form submission & dialog close
                  className="w-full sm:w-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md flex items-center shadow-md transition-all"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500  hover:text-white"
                      }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

        </main>

      </SidebarInset>
    </SidebarProvider>

  );
};

export default Team;
