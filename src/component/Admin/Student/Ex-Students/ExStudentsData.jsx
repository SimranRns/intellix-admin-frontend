import React, { useState, useRef, useEffect } from "react";

import {
  Search,
  MoreVertical,
  ChevronRight,
  ChevronLeft,


} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../src/components/ui/table";

import { DropdownMenuContent, DropdownMenuTrigger } from "../../../src/components/ui/dropdown-menu";


import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,

} from "../../../src/components/ui/dropdown-menu"


import { Button } from "../../../src/components/ui/Button";
import { SidebarInset, SidebarProvider } from "../../../src/components/ui/sidebar";



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
} from "../../../src/components/ui/dialog"


import { Checkbox } from "../../../src/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { useDispatch, useSelector } from "react-redux";

import logo from '../../../../assets/Image/intellix.png'

import Header from "../../Dashboard/Header";
import AppSidebar from "../../../src/components/ui/app-sidebar";
import { GetExStudent } from "../../../../Redux_store/Api/Student_ExStudent";
import Add_Payment from "../Add_Payment";
import { getSingleStudent } from "../../../../Redux_store/Api/StudentsApiStore";

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

const PAGE_SIZE = 5;



const ExStudentsData = () => {

  const dueInputRef = useRef(null);
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(new Date("2025-03-04"));
  const [endDate, setEndDate] = useState(new Date("2025-03-04"));
  const [paymentType, setPaymentType] = useState("emi");
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedialog, setdeletedialog] = useState(false);
  const inputRef = useRef(null)
  const [searchText, setSearchText] = useState("");


  const handleCheckboxChange = (type) => {
    setSelected((prev) => (prev === type ? "" : type));
  };


  const { get_Exstudent, loading, singleLoading, error } = useSelector((state) => state.Exstudent || {});
  const dispatch = useDispatch()
  const displayedExStudents = get_Exstudent?.students;
  const totalPages = Math.ceil((get_Exstudent?.totalRecords || 0) / PAGE_SIZE);

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




  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(GetExStudent({
        page: currentPage,
        pageSize: PAGE_SIZE,
        email: searchText,
        name: searchText,
        contact_no: searchText,
        sessionId: searchText,
      }));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, currentPage, dispatch]);

  const goback = () => {
    window.history.back();
  };
  const handleViewProfile = (id) => {
    console.log("View Profile ID:", id); // 👈 ye daal do dekhne ke liye
    dispatch(getSingleStudent({ id }))
      .unwrap()
      .then(() => {
        navigate(`/view/profile/${id}`);
      })
      .catch((err) => {
        console.error("Failed to fetch single student:", err);
      });
  };
  return (
    <div>
      <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-auto">
            <div className=" min-h-screen flex flex-col">

              <div className="w-full  shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 mt-5">


                <div className="flex items-center space-x-1 sm:space-x-3 mt-3 md:mt-0">
                  <Button onClick={goback}
                    className="bg-[#2563eb] text-white font-semibold px-1 sm:px-5 py-2
               rounded-lg hover:bg-[#3d3690] hover:opacity-90">
                    Back to Students</Button>

                </div>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
                  <Search size={18} />
                  <input
                    type="text"
                    style={{ backgroundColor: "transparent" }}
                    placeholder="Search By EX-Students Name..."
                    className="ml-2 w-full focus:outline-none focus:ring-0"
                    ref={inputRef}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </div>

              {

              }
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
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-red-500 py-8">
                          Error: {error}
                        </TableCell>
                      </TableRow>
                    ) : displayedExStudents?.length > 0 ? (
                      get_Exstudent?.students?.map((student) => (
                        <TableRow key={student.id} className="hover:bg-transparent">
                          <TableCell className="text-blue-600 font-medium">
                            {student.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                              <span className="font-medium">{student.name || "No Name"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span>{student.father_name || "N/A"}</span>
                          </TableCell>
                          <TableCell>
                            {student.Batch?.BatchesName || "No Batch"}
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button>_Add Payment</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[825px] ">
                                <DialogHeader>
                                  <DialogDescription>
                                    <Add_Payment />
                                  </DialogDescription>
                                </DialogHeader>
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
                                  <DropdownMenuItem
                                    onClick={() => handleViewProfile(student.id)}
                                  >
                                    {singleLoading ? "Loading..." : "Profile"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      navigate(
                                        `/student-payment-history/${student.id}`
                                      )
                                    }
                                  >
                                    Payment History
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      navigate(
                                        `/student_attendance/${student.id}`
                                      )
                                    }
                                  >
                                    Attendance
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    View Marksheet
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Mark as RT
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Dialog open={deletedialog} onOpenChange={setdeletedialog}>
                                      <DialogTrigger>Delete</DialogTrigger>
                                      <DialogContent
                                        onPointerDownOutside={(e) => e.preventDefault()}
                                        onEscapeKeyDown={(e) => e.preventDefault()}
                                        className="sm:max-w-[425px]"
                                      >
                                        <DialogHeader>
                                          <DialogTitle className="text-center mb-3">Delete Student</DialogTitle>
                                          <DialogDescription className="text-center">
                                            Are you sure you want to delete student?
                                          </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="flex justify-between">
                                          <Button
                                            onClick={() => setdeletedialog(false)}
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No Students Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>




            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default ExStudentsData

