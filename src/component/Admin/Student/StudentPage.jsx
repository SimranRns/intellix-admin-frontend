import React, { useState, useRef } from "react";
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
    setSelected(type);
    // setError(false);
  };


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

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className=" min-h-screen flex flex-col">

            <div className="w-full  shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 mt-5">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
                <Search size={18} />
                <input
                  type="text"
                  style={{ backgroundColor: "transparent " }}
                  placeholder="Search here..."
                  className="ml-2"
                />
              </div>

              <div className="flex items-center space-x-1 sm:space-x-3 mt-3 md:mt-0">
                <Button onClick={() => navigate("/ExStudents")}
                  className="bg-[#2563eb] text-white font-semibold px-1 sm:px-5 py-2
               rounded-lg hover:bg-[#3d3690] hover:opacity-90">
                  Ex-Student</Button>
                <Button onClick={() => navigate("/Marksheet")}
                  className="bg-[#2563eb] text-white font-semibold px-1 sm:px-5 py-2
               rounded-lg hover:bg-[#3d3690] hover:opacity-90">
                  Marksheet</Button>
                <Button onClick={() => navigate("/StudentUploadModal")}
                  className="bg-[#2563eb] text-white font-semibold px-1 sm:px-5 py-2
               rounded-lg hover:bg-[#3d3690] hover:opacity-90">
                  + Add Excel</Button>
                <Button onClick={() => navigate("/add_student_model")}
                  className="bg-[#2563eb] text-white font-semibold px-1 sm:px-5 py-2
               rounded-lg hover:bg-[#3d3690] hover:opacity-90">
                  + Add Student</Button>

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
                  {displayedStudents.map((student, index) => (
                    <TableRow key={index} className="hover:bg-transparent">
                      <TableCell className="text-blue-600 font-medium">
                        {student.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                          <img src={student.image} alt={student.name} className="w-10 h-10 object-cover rounded-full border-2 border-gray-300 shadow-sm" />
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="block md:inline">{student.fatherName}</span>
                      </TableCell>

                      <TableCell>{student.batch}</TableCell>
                      <TableCell>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="bg-green-500 text-white px-3 sm:py-1 md:py-2 rounded-lg">+ Add Payment</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] p-6 rounded-lg" onPointerDownOutside={(e) => e.preventDefault()}
                            onEscapeKeyDown={(e) => e.preventDefault()}>
                            <DialogHeader>
                              <DialogTitle className="text-3xl font-semibold"> Setup Payment</DialogTitle>

                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <label className="block text-2xl font-medium ">Grand Total :</label>
                              <Input type="text" placeholder="₹" className="mt-1 w-64 h-24" />
                              <div className="flex space-x-4">
                                {["Pay in EMIs", "Pay in One Shot"].map((type) => (
                                  <div
                                    key={type}
                                    className={`flex items-center space-x-3 p-3 rounded-md border transition cursor-pointer `}
                                    onClick={() => handleCheckboxChange(type)}
                                  >
                                    <Checkbox
                                      id={type}
                                      checked={selected === type}
                                      onCheckedChange={() => handleCheckboxChange(type)}
                                    />
                                    <label htmlFor={type} className="text-sm font-medium cursor-pointer">
                                      {type}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <div>
                                {selected === "Pay in EMIs" ? (
                                  <div className="mt-4 grid grid-cols-2 gap-7">
                                    <div>
                                      <label className="block text-2xl font-medium">Discount Amount</label>
                                      <Input type="text" placeholder="Enter Amount" className="mt-1" />
                                    </div>
                                    <div>
                                      <label className="block text-2xl font-medium">EMI Count *</label>
                                      <Input type="text" placeholder="Number of EMIs" className="mt-1" />
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-2xl font-medium">Start Date *</label>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full flex justify-between">
                                              {format(startDate, "dd/MM/yyyy")}
                                              <CalendarIcon className="w-4 h-4" />
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent>
                                            <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                                          </PopoverContent>
                                        </Popover>
                                      </div>
                                      <div>
                                        <label className="block text-2xl font-medium">End Date *</label>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full flex justify-between">
                                              {format(endDate, "dd/MM/yyyy")}
                                              <CalendarIcon className="w-4 h-4" />
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent>
                                            <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                                          </PopoverContent>
                                        </Popover>
                                      </div>
                                    </div>

                                  </div>
                                ) : (
                                  <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-2xl font-medium">Start Date *</label>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Button variant="outline" className="w-full flex justify-between">
                                            {format(startDate, "dd/MM/yyyy")}
                                            <CalendarIcon className="w-4 h-4" />
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                          <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                    <div>

                                      <Popover>``
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            className={cn(
                                              "w-[280px] justify-start text-left shadow-sm border border-2 border-blue-200 shadow-blue-500/50 font-normal m-5",
                                              !date && "text-muted-foreground"
                                            )}
                                          >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                        </PopoverContent>
                                      </Popover>
                                    </div>

                                  </div>
                                )}
                              </div>




                            </div>
                            <DialogFooter >
                              <Button className="w-40  mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg">
                                Proceed To Payment
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
                              <DropdownMenuItem>
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






