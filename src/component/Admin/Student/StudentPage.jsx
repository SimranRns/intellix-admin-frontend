import React, { useState, useRef, useEffect } from "react";
import './Student.css';
import {
  Search,
  ChevronDown,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  Delete,
  CalendarIcon,

  Calendar1Icon,
  Calendar,

} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/ui/table";

import { DropdownMenuContent, DropdownMenuTrigger } from "../../src/components/ui/dropdown-menu";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,

} from "../../src/components/ui/dropdown-menu"


import { Button } from "../../src/components/ui/Button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../src/components/ui/sidebar";
import { cn } from "../../src/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../src/components/ui/breadcrumb";



import { z } from "zod";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog"
import { Input } from "../../src/components/ui/input"
import { Label } from "../../src/components/ui/label"
import Header from "../Dashboard/Header";
import AppSidebar from "../../src/components/ui/app-sidebar";
import { RadioGroup, RadioGroupItem } from "../../src/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../../src/components/ui/popover";
import { Checkbox } from "../../src/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../src/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Add_Payment from "./Add_Payment";
// import GetStudent from "@/Redux_store/Api/Student_AddStudent";
import GetStudent from "../../../Redux_store/Api/Student_AddStudent";
import { useDispatch, useSelector } from "react-redux";

import logo from '../../../assets/Image/intellix.png'

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
const studentGroups = [
  {
    id: "123456789",
    name: "Emily Clarke",
    fatherName: "Mana William",
    batch: "Batch A",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
  {
    id: "678912345",
    name: "Emily Clarke",
    fatherName: "John Clarke",
    batch: "Batch E",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
  {
    id: "678912345",
    name: "Emily Clarke",
    fatherName: "John Clarke",
    batch: "Batch E",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
  {
    id: "678912345",
    name: "Emily Clarke",
    fatherName: "John Clarke",
    batch: "Batch E",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
  {
    id: "678912345",
    name: "Emily Clarke",
    fatherName: "John Clarke",
    batch: "Batch E",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
  {
    id: "678912345",
    name: "Emily Clarke",
    fatherName: "John Clarke",
    batch: "Batch E",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
  {
    id: "678912345",
    name: "Emily Clarke",
    fatherName: "John Clarke",
    batch: "Batch E",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
  {
    id: "678912345",
    name: "Emily Clarke",
    fatherName: "John Clarke",
    batch: "Batch E",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
];

const PAGE_SIZE = 5;





const StudentHeader = () => {

  const dueInputRef = useRef(null);
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  const [date, setDate] = useState(null); // Define date state
  const [startDate, setStartDate] = useState(new Date("2025-03-04"));
  const [endDate, setEndDate] = useState(new Date("2025-03-04"));
  const [paymentType, setPaymentType] = useState("emi");
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedialog, setdeletedialog] = useState(false);
  const inputRef = useRef(null)

  let totalPages = Math.ceil(studentGroups.length / PAGE_SIZE);

  const displayedStudents = studentGroups.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const handleCheckboxChange = (type) => {
    setSelected((prev) => (prev === type ? "" : type));
    // setError(false);
  };
  const { get_student, loading, error } = useSelector((state) => state.student)


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
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetStudent())
  },[dispatch])

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        <div className="relative flex  justify-center items-center">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
          <img
            src={logo}
            alt="Loading"
            className="rounded-full h-28 w-28"
          />
        </div>
      </div>
    );
  }
    return (
      <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-auto">
            <div className=" min-h-screen flex flex-col">
              {error && (
                <p className="text-red-500">{error}</p>
              )}

              <div className="w-full  shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 mt-5">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
                  <Search size={18} />
                  <input
                    type="text"
                    style={{ backgroundColor: "transparent" }}
                    placeholder="Search here..."
                    className="ml-2 w-full focus:outline-none focus:ring-0"
                  />
                </div>

                <div className="flex items-center space-x-1 sm:space-x-3 mt-3 md:mt-0">
                  <Button onClick={() => navigate("/ExStudents")}
                    className="bg-blue-500 text-white font-semibold px-1 sm:px-5 py-2
               rounded-lg hover:bg-blue-700 hover:opacity-90">
                    Ex-Student</Button>
                  <Button onClick={() => navigate("/Marksheet")}
                    className="bg-blue-500 text-white font-semibold px-1 sm:px-5 py-2
               rounded-lg  hover:bg-blue-700  hover:opacity-90">
                    Marksheet</Button>
                  <Button onClick={() => navigate("/StudentUploadModal")}
                    className="bg-blue-500 text-white font-semibold px-1 sm:px-5 py-2
               rounded-lg  hover:bg-blue-700  hover:opacity-90">
                    + Add Excel</Button>
                  <Button onClick={() => navigate("/add_student_model")}
                    className="bg-blue-500 text-white font-semibold px-1 sm:px-5 py-2
               rounded-lg  hover:bg-blue-700 hover:opacity-90">
                    + Add Student</Button>

                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    RT
                  </label>

                </div>
              </div>


              <div className="w-full overflow-x-auto">
                <Table className="w-full border rounded-lg shadow-md mt-5">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>ID</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Father Name</TableHead>
                      <TableHead>Batch Name</TableHead>
                      <TableHead>+ Add Payment</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>



                  <TableBody>
                    {get_student?.students?.data?.map((student, index) => (
                      <TableRow key={index} className="hover:bg-transparent">
                        <TableCell className="text-blue-600 font-medium">
                          {student.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                            {/* <img src={student.image} alt={student.name} className="w-10 h-10 object-cover rounded-full border-2 border-gray-300 shadow-sm" /> */}
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="block md:inline">{student.father_name}</span>
                        </TableCell>

                        <TableCell>{student.Batch}</TableCell>


                        <TableCell>

                          <Add_Payment />
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <MoreVertical className="cursor-pointer" size={20} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                              <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => navigate("/view/profile")}>
                                  Profile
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate("/student-payment-history")}>
                                  Payment_History
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate("/student_attendance")}>
                                  Attendance
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  View_Marksheet
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Mark as RT
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Dialog open={deletedialog} onOpenChange={setdeletedialog}>
                                    <DialogTrigger >
                                      Delete
                                    </DialogTrigger>
                                    <DialogContent onPointerDownOutside={(e) => e.preventDefault()}
                                      onEscapeKeyDown={(e) => e.preventDefault()} className="sm:max-w-[425px]">
                                      <DialogHeader >
                                        <DialogTitle className="text-center mb-3">Delete Sudent</DialogTitle>
                                        <DialogDescription className="text-center">
                                          Are you sure you want to delete student?
                                        </DialogDescription>
                                      </DialogHeader>

                                      <DialogFooter className="flex justify-between">
                                        <Button
                                          onClick={() => { setdeletedialog(false) }}
                                          variant="outline"
                                        >
                                          Cancel
                                        </Button>
                                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                                          Confirm
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </DropdownMenuItem>


                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>


                </Table>
              </div>




              <div className="flex items-center justify-center md:justify-end space-x-3 mt-5 w-full pr-8">
                <Button
                  variant="ghost"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="hover:bg-transparent hover:text-inherit"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                {[1, 2].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 ${currentPage === page ? "bg-[#3d3690] text-white" : "bg-gray-100 text-gray-700"} rounded-lg hover:bg-transparent hover:text-inherit`}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="ghost"
                  disabled={currentPage === 2}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 2))}
                  className="hover:bg-transparent hover:text-inherit"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  };

  export default StudentHeader;







