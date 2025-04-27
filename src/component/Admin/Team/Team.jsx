import React, { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  UserPlus,
  CheckCircle,
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
} from "../../src/components/ui/dropdown-menu";
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
  first_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email").min(1, "Email is required"),
  contact_number: z.string().min(10, "Contact Number must be 10 digits"),
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

  // departmentSelection: z.string().min(1, "Department selection is required."),
});

const bankDetailsSchema = z.object({
  accountNumber: z
    .string()
    .min(10, "Account Number must be at least 10 digits"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),
  accountHolderName: z.string().min(3, "Name should be at least 3 characters"),
});

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";
import { Popover, PopoverTrigger } from "../../src/components/ui/popover";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ThankYouCard from "../Dashboard/ThankYouCard";
import AppSidebar from "../../src/components/ui/app-sidebar";
import Header from "../Dashboard/Header";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../src/components/ui/sheet";
import {
  update_Employee_Status,
  GetTeam,
  Update_Employee,
  Update_Time,
  create_employee,
} from "../../../Redux_store/Api/TeamApi";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/Image/intellix.png";
import { get_Deparment } from "../../../Redux_store/Api/Department";
// import alert from "react-hot-alert";

const Team = ({ teacherData }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Newest");
  const [selectedDepartment, setSelectedDepartment] =
    useState("Select Department");
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage, setTeachersPerPage] = useState(10);
  const [profileImg, setProfileImg] = useState("https://github.com/shadcn.png");
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [Addteacher, setTeacher] = useState(false); //first
  const [AddDetails, setAddDetails] = useState(false); //secondd
  const [AddBankDetails, setAddBankDetails] = useState(false); //third
  const [AddConfrom, setAddConfrom] = useState(false); //fourth
  const [Deleteteacher, setDelete] = useState(false);
  const [ChangeTime, setChangeTime] = useState(false);
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [InputName, setInputName] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { Teachers, loading, error } = useSelector((state) => state.team || {});
  const { Department } = useSelector((state) => state.Department || {});
  console.log(Department.data);

  const [date, setDate] = useState("");
  const [activePage, setActivePage] = useState("Team");
  const { id } = useParams();
  const [deleteemployee, setdeleteemployee] = useState(null);
  const [first_name, setEmployeeName] = useState("");
  const [updatetime, setupdatetimetime] = useState({
    start_time: "",
    end_time: "",
    id: null,
  });

  // console.log(updatetime);

  // const [joining_date, setJoiningDate] = useState("");
  const [addemployee, setemployee] = useState({
    first_name: "",
    highest_qualification: "",
    institution_name: "",
    contact_number: "",
    emergency_number: "",
    email: "",
    date_of_birth: "2025-05-21",
    residential_address: "",
    district: "",
    state: "",
    status: "Active",
    pincode: "",
    permanent_address: "",
    permanent_district: "",
    permanent_state: "",
    permanent_pincode: "",
    department: [],
    salary: "",
    joining_date: "",
    account_number: "",
    ifsc_code: "",
    account_holder_name: "",
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);



  const departmentList = Department.data
  console.log(departmentList)
  departmentList?.map((value) => {
    console.log(value.name, "**********************************************")
  })

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

  // Form instances
  const basicForm = useForm({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      first_name: '',
      email: '',
      contact_number: '',
    },
  });


  useEffect(() => {
    if (open && Teachers) {
      basicForm.reset({
        first_name: Teachers.first_name || '',
        email: Teachers.email || '',
        contact_number: Teachers.contact_number || '',
      });
    }
  }, [open, Teachers, basicForm]);


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

      Object.entries(validationResult.error.format()).forEach(
        ([key, value]) => {
          additionalForm.setError(key, {
            type: "manual",
            message: value._errors?.[0] || "Invalid field",
          });
        }
      );
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
      setAddDetails("");
      setAddDetails(false);
      setAddBankDetails(true);
    } else {
      console.log("Validation errors:", validationResult.error.format());

      Object.entries(validationResult.error.format()).forEach(
        ([key, value]) => {
          additionalForm2.setError(key, {
            type: "manual",
            message: value._errors?.[0] || "Invalid field",
          });
        }
      );
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
      setAddBankDetails("");
      setAddBankDetails(false);
      setAddConfrom(true);
    } else {
      console.log("Validation errors:", validationResult.error.format());

      Object.entries(validationResult.error.format()).forEach(
        ([key, value]) => {
          additionalForm3.setError(key, {
            type: "manual",
            message: value._errors?.[0] || "Invalid field",
          });
        }
      );
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

  const handleTimeUpdate = () => {
    if (!updatetime.id || !updatetime.start_time || !updatetime.end_time) {
      alert.error("Please select both In and Out times.");
      return;
    }

    dispatch(Update_Time(updatetime))
      .then(() => {
        alert.success("Timing updated successfully!");
        setChangeTime(false); // ✅ CLOSES the dialog
        setupdatetimetime({ id: null, start_time: "", end_time: "" }); // reset
        setInTime("");
        setOutTime("");
      })
      .catch(() => {
        alert.error("Failed to update timing.");
      });
  };

  const handleBasicFormSubmit = (data) => {
    if (!selectedEmployee?.id) return;

    const payload = {
      id: selectedEmployee.id,
      ...data,
    };

    dispatch(Update_Employee(payload))
      .then(() => {
        setOpen(false);
        setSelectedEmployee(null);
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  const handleAdditionalFormSubmit = (e) => {
    e.preventDefault();
    dispatch(create_employee());
    // console.log("Additional Form Data:", data);
  };
  const handleAdditionalFormSubmit2 = (data) => {
    console.log("Additional Form Data:", data);
  };
  const handleAdditionalFormSubmit3 = (data) => {
    console.log("Submitted Data:", data);
  };

  // const handleConfirm = async () => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     console.log("Data Submitted Successfully!");
  //     setAddConfrom(false);
  //     await dispatch(GetTeam());
  //   } catch (error) {
  //     console.error("Submission failed:", error);
  //   }
  // };

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

  //GetEmployee
  useEffect(() => {
    dispatch(GetTeam({ first_name: first_name }));
  }, [first_name]);

  useEffect(() => {
    dispatch(get_Deparment());
  }, [dispatch]);
  const handleDelete = async () => {
    try {
      if (deleteemployee) {
        // Delete the employee
        await dispatch(update_Employee_Status({ id: deleteemployee }));
        console.log("Employee deleted successfully:", deleteemployee);

        // Refresh the team list
        // await dispatch(GetTeam({ first_name: first_name }));
        window.location.reload();

        // Close dialog and reset state
        setdeleteemployee(null);
        setActive(false); // Close the dialog if it's open
      } else {
        console.warn("No employee ID selected for deletion");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  console.log(addemployee);
  // if (loading) {
  //   return (
  //     <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
  //       <div className="relative flex  justify-center items-center">
  //         <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
  //         <img
  //           src={logo}
  //           alt="Loading"
  //           className="rounded-full h-28 w-28"
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {

  //   return <div>
  //     Error: = {error}
  //   </div>
  // }

  const TeachersPerPage = 9;
  const teachersData = Teachers?.result?.employees || [];
  const totalPages = Math.ceil(teachersData.length / TeachersPerPage);
  const startIndex = (currentPage - 1) * TeachersPerPage;
  const paginatedTeachers = teachersData.slice(
    startIndex,
    startIndex + TeachersPerPage
  );

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      {/* Pass setActivePage to Sidebar */}
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="w-full shadow-md shadow-blue-300/30 rounded-lg px-4 sm:px-6 md:px-8 py-4">
            {/* Container flexes on lg+ screens */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Bar */}
              <div className="w-full lg:max-w-md">
                <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full">
                  <Search size={18} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="By Employee Name..."
                    className="ml-2 w-full outline-none bg-transparent text-sm"
                    value={first_name}
                    onChange={(e) => setEmployeeName(e.target.value)}
                  />
                </div>
              </div>

              {/* Buttons Grid - 3 cols on sm & md, flex on lg+ */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:flex lg:items-center lg:justify-end lg:gap-4">
                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full lg:w-auto border border-blue-300 hover:bg-blue-500 hover:text-white flex justify-between items-center px-4 py-2 text-sm font-medium rounded-md">
                      <span>{selectedOption}</span>
                      <ChevronDown size={16} className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-white z-[50] dark:bg-gray-800 text-gray-900 dark:text-white w-40 shadow-md rounded-md mt-2 border border-blue-300"
                  >
                    {["Newest", "Oldest", "Recent"].map((item) => (
                      <DropdownMenuItem
                        key={item}
                        onClick={() => setSelectedOption(item)}
                        className="cursor-pointer hover:bg-blue-600 hover:text-white px-4 py-2 text-center"
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Departments Button */}
                <Button
                  onClick={() => Navigate("/Departments")}
                  className="w-full lg:w-auto bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm"
                >
                  Departments
                </Button>

                {/* Ex-Employee Button */}
                <Button
                  onClick={() => Navigate("/Ex-Employee")}
                  className="w-full lg:w-auto bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm"
                >
                  Ex-Employee
                </Button>

                {/* Add Employee Button */}
                <Button
                  onClick={() => setTeacher(true)}
                  className="w-full lg:w-auto bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm"
                >
                  + Add Employee
                </Button>
              </div>

              {/* //First dilog */}
              <Dialog open={Addteacher} onOpenChange={setTeacher}>
                <DialogContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                  className="sm:max-w-[800px] shadow-lg p-6 rounded-lg h-[90%] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
                >
                  {/* Back Arrow & Title */}
                  <div className="flex items-center mb-4">
                    <DialogTitle className="text-center flex-1">
                      Add Employee
                    </DialogTitle>
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
                                    // value={InputName}
                                    {...field}
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        first_name: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
                                    placeholder="John Doe"
                                    // Agar ye issue create kar raha hai to hata kar dekho
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />

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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        highest_qualification: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        institution_name: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        contact_number: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        emergency_number: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        email: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        salary: parseInt(e.target.value),
                                      });
                                      field.onChange(e);
                                    }}
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
                                          format(
                                            new Date(field.value),
                                            "yyyy-MM-dd"
                                          )
                                        ) : (
                                          <span className="text-gray-500">
                                            Select Joining Date
                                          </span>
                                        )}
                                        <CalendarIcon className="h-5 w-5" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>

                                  {/* Hidden native date input */}
                                  <Input
                                    ref={inputRef}
                                    type="date"
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        joining_date: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
                                    className="opacity-0 cursor-pointer"
                                    value={
                                      field.value
                                        ? format(
                                          new Date(field.value),
                                          "yyyy-MM-dd"
                                        )
                                        : ""
                                    }
                                  // onChange={(e) => field.onChange(e.target.value)}
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
                  className="sm:max-w-[800px] shadow-lg p-6 rounded-lg h-[90%] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
                >
                  {/* Back Arrow & Title */}
                  <div className="flex items-center mb-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering parent dialogs
                        setAddDetails(false);
                        setTeacher(true);
                      }}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <DialogTitle className="text-center flex-1">
                      Access Control Details
                    </DialogTitle>
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        residential_address: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        district: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        state: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        pincode: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                        {/* <FormField
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
                        /> */}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        permanent_address: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        permanent_district: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        permanent_state: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        permanent_pincode: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
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
                                          {selectedDepartment?.name || "Select Department"}
                                        </span>
                                        <ChevronDown size={16} className="ml-2" />
                                      </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                      align="start"
                                      className="max-h-[20vh] overflow-y-auto w-[44vh] shadow-md rounded-md mt-2 border border-gray-300"
                                    >
                                      {departmentList?.map((dept, index) => (
                                        <DropdownMenuItem
                                          key={index}
                                          onClick={() => {
                                            // Remove the department if already selected
                                            setemployee({
                                              ...addemployee,
                                              department: addemployee.department.includes(dept.id.toString())
                                                ? addemployee.department.filter(d => d !== dept.id.toString()) // Remove department
                                                : [...addemployee.department, parseInt(dept.id)], // Add department
                                            });
                                            setSelectedDepartment(dept);
                                          }}

                                          className="cursor-pointer px-4 py-2 hover:bg-blue-600 hover:text-white border-b border-gray-300 text-gray-500 font-bold"
                                        >
                                          {dept.name}
                                        </DropdownMenuItem>
                                      ))}
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
                                Add as a Teacher, Professor, or Academic Staff
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
                                  Add as a Teacher/Professor or Academic Staff
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
                  className="sm:max-w-[800px] shadow-lg p-6 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
                >
                  {/* Back Arrow & Title */}
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => {
                        setAddBankDetails(false);
                        setAddDetails(true);
                      }}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <DialogTitle className="text-center flex-1">
                      Bank Account Details
                    </DialogTitle>
                  </div>

                  <hr />

                  <Form {...additionalForm3}>
                    <form
                      onSubmit={additionalForm3.handleSubmit(
                        handleAdditionalFormSubmit3
                      )}
                      className="space-y-6"
                    >
                      {/* Two-Column Grid Layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                        {/* Account Number */}
                        <FormField
                          control={additionalForm3.control}
                          name="accountNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Enter Bank Account Number</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter Account Number"
                                    {...field}
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        account_number: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
                                    type="text"
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* IFSC Code */}
                        <FormField
                          control={additionalForm3.control}
                          name="ifscCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Enter IFSC Code</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter Bank IFSC Code"
                                    {...field}
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        ifsc_code: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Account Holder Name */}
                        <FormField
                          control={additionalForm3.control}
                          name="accountHolderName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Enter Account Holder Name</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    placeholder="Enter Bank Account Holder Name"
                                    {...field}
                                    onChange={(e) => {
                                      setemployee({
                                        ...addemployee,
                                        account_holder_name: e.target.value,
                                      });
                                      field.onChange(e);
                                    }}
                                    className="w-full border border-blue-300 rounded-xl p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <Button
                          onClick={(e) => {
                            mainthird(e),
                              dispatch(create_employee(addemployee));
                          }}
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
            </div>
          </div>

          {/* Teacher Cards Grid */}
          {loading ? (
            <div className="h-screen w-full flex items-center justify-center text-white">
              <div className="relative flex justify-center items-center">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
                <img
                  src={logo}
                  alt="Loading"
                  className="rounded-full h-28 w-28"
                />
              </div>
            </div>
          ) : error ? (
            <div>Error: {error?.message ? (
              <div className="text-red-700"> {error.message}</div>
            ) : ""}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
              {paginatedTeachers?.map((teacher) => (


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
                        onClick={() => {
                          setOpen(true);
                          setSelectedEmployee(teacher); // full data object
                        }}
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
                        onClick={() => {
                          setChangeTime(true);

                          // Pre-fill the timing values from teacher data
                          setupdatetimetime({
                            id: teacher.id,
                            start_time: teacher.start_time || "",
                            end_time: teacher.end_time || "",
                          });

                          // Set the TimePicker values
                          setInTime(teacher.start_time || "");
                          setOutTime(teacher.end_time || "");
                        }}
                      >
                        Change Timing
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setdeleteemployee(teacher.id), setDelete(true);
                        }}
                        className="cursor-pointer text-red-500 hover:bg-gray-200 px-4 py-2 text-center"
                      >
                        Deactivated
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Change Timing Dialog */}
                  <Dialog open={ChangeTime} onOpenChange={setChangeTime}>
                    <DialogContent
                      onPointerDownOutside={(e) => e.preventDefault()}
                      onEscapeKeyDown={(e) => e.preventDefault()}
                      className="sm:max-w-[425px] shadow-lg p-6 rounded-lg"
                    >
                      <DialogHeader>
                        <DialogTitle className="text-center text-[29px]">
                          Change Time
                        </DialogTitle>
                        <DialogDescription className="text-center text-md">
                          Are you sure you want to change this employee's
                          timing?
                        </DialogDescription>
                      </DialogHeader>

                      <hr className="mt-5" />
                      <div className="flex justify-center">
                        <form
                          onSubmit={handleTimeUpdate}
                          className="space-y-4 w-full"
                        >
                          <div className="flex justify-between items-center w-full">
                            <div className="w-1/2">
                              <TimePicker
                                label="In Time"
                                selectedTime={inTime}
                                setSelectedTime={(val) => {
                                  setInTime(val);
                                  setupdatetimetime((prev) => ({
                                    ...prev,
                                    start_time: val,
                                  }));
                                }}
                              />
                            </div>
                            <div className="w-1/2">
                              <TimePicker
                                label="Out Time"
                                selectedTime={outTime}
                                setSelectedTime={(val) => {
                                  setOutTime(val);
                                  setupdatetimetime((prev) => ({
                                    ...prev,
                                    end_time: val,
                                  }));
                                }}
                              />
                            </div>
                          </div>

                          {/* ✅ This button submits the form */}
                          <Button
                            onClick={() => {
                              setChangeTime(false), setAddConfrom(true);
                            }}
                            disabled={!inTime || !outTime}
                            className="bg-indigo-500 text-white px-5 w-full py-2 rounded-lg hover:bg-indigo-600 disabled:opacity-50"
                          >
                            Proceed
                          </Button>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Delete Dialog */}
                  <Dialog open={Deleteteacher} onOpenChange={setDelete}>
                    <DialogContent
                      onPointerDownOutside={(e) => e.preventDefault()}
                      onEscapeKeyDown={(e) => e.preventDefault()}
                      className="sm:max-w-[425px] shadow-lg p-6 rounded-lg"
                    >
                      <DialogHeader>
                        <DialogTitle className="text-center text-[29px]">
                          Deactivate Employee
                        </DialogTitle>
                        <DialogDescription className="text-center text-md">
                          Are you sure you want to deactivate this employee?
                        </DialogDescription>
                      </DialogHeader>
                      <hr className="mt-5" />
                      <div className="flex justify-center">
                        <Button
                          onClick={handleDelete}
                          type="submit"
                          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                        >
                          Deactivate Employee
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Edit Dialog */}
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent
                      onPointerDownOutside={(e) => e.preventDefault()}
                      onEscapeKeyDown={(e) => e.preventDefault()}
                      className="sm:max-w-[425px] shadow-lg p-6 rounded-lg"
                    >
                      <DialogHeader>
                        <DialogTitle>Edit Employee</DialogTitle>
                      </DialogHeader>
                      <hr />
                      <Form {...basicForm}>
                        <form
                          onSubmit={basicForm.handleSubmit(
                            handleBasicFormSubmit
                          )}
                          className="space-y-6"
                        >

                          {/* First Name Field */}
                          <FormField
                            control={basicForm.control}
                            name="first_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={basicForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter Email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={basicForm.control}
                            name="contact_number"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter Contact Number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />



                          <div className="flex justify-between">
                            <Button
                              onClick={() => {
                                setAddConfrom(true);
                              }}
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
                        className="rounded-full border-4 border-blue-600"
                        src={teacher.image || "https://img.freepik.com/premium-vector/man-profile_1083548-15963.jpg"}
                        alt={teacher.first_name || "teacher"}
                      />
                    </Avatar>
                    <CardTitle className="mt-4 text-xl font-bold">
                      {teacher.first_name}
                    </CardTitle>
                    <CardDescription>
                      {teacher.department_names}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="bg-blue-100 px-2 p-1 rounded-lg text-sm text-blue-500 font-semibold flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(teacher?.joining_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="bg-blue-100 px-3 p-1 rounded-lg text-sm text-blue-500 font-semibold flex items-center gap-1">
                        <UserPlus className="w-4 h-4" />
                        Assigned {teacher?.assigned_count ?? "10"}
                      </span>

                      <span className="bg-blue-100 px-3 p-1 rounded-lg text-sm text-blue-500 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Completed {teacher?.completed_count ?? "10"}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-center gap-3 mt-5">
                    <Button
                      className="bg-indigo-600 text-xs text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-indigo-700 transition-all"
                      onClick={() => Navigate(`/View-Profile/${teacher.id}`)}
                    >
                      <User size={18} /> Profile
                    </Button>
                    <Button
                      onClick={() => Navigate("/manage_salary")}
                      className="bg-orange-500 text-xs text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-orange-600 transition-all"
                    >
                      <HandCoins size={18} /> Manage Salary
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* confirm dilog */}
          <Dialog open={AddConfrom} onOpenChange={setAddConfrom}>
            <DialogContent className="w-full max-w-[90vw] sm:max-w-[400px] p-6 rounded-lg">
              <ThankYouCard />
              {/* Dialog Footer */}
              <DialogFooter className="flex justify-end gap-3">
                <Button
                  onClick={() => setAddConfrom(false)}
                  variant="outline"
                  className="w-full sm:w-auto text-black mt-4 hover:text-black bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-md flex items-center transition-all"
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    await dispatch(GetTeam({ first_name: first_name })); // Fetch updated department list after confirmation
                    setAddConfrom(false); // Close the dialog after confirmation
                  }}
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
