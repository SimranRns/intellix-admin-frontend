import React, { useState, useEffect, useRef } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import Header from "../Dashboard/Header";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
// import { Button } from "../../src/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/ui/select";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { Button } from "../../src/components/ui/Button";
import { Calendar } from "../../src/components/ui/calendar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../src/components/ui/popover";
import { cn } from "../../src/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../src/components/ui/pagination";
// import { setSearchFilters, setPage } from '../../../Redux_store/Slices/AttendanceSlice';

import { useDispatch, useSelector } from "react-redux";
import { fetchAttendance } from "../../../Redux_store/Api/Attendance";
import { useParams } from "react-router";
export const exportSchema = z
  .object({
    startDate: z
      .string()
      .min(1, "Start date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date",
      }),
    endDate: z
      .string()
      .min(1, "End date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid end date",
      }),
    course: z.string().min(1, "Course is required"),
    batch: z.string().min(1, "Batch is required"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date (not the same)",
    path: ["endDate"],
  });
const Attendance = () => {
  const [date, setDate] = React.useState();
  // Top counters
  const [totalStudents, setTotalStudents] = useState(0);
  const [outsideCampus, setOutsideCampus] = useState(0);
  const [insideCampus, setInsideCampus] = useState(0);
  const [onLeave, setOnLeave] = useState(0);

  // Tab selection: All, In, Out, Absent
  const [selectedTab, setSelectedTab] = useState("All");

  // Search fields
  const [searchEnrollmentId, setSearchEnrollmentId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchBatchName, setSearchBatchName] = useState("");
  const [fromDate, setFromDate] = useState(new Date(2025, 0, 30)); // Default Date
  const [toDate, setToDate] = useState(new Date(2025, 0, 30));
  // Table data
  const [attendanceData, setAttendanceData] = useState([]);
  const [loadingg, setLoading] = useState(false);
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch()
  const { id } = useParams()








  const { data, total, page, limit, search, sessionId, loading, error } = useSelector(state => state.attendance);
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setAttendanceData(data);
      setTotalStudents(data.length);
      setOutsideCampus(data.filter((d) => d.status === "Out").length);
      setInsideCampus(data.filter((d) => d.status === "In").length);
      setOnLeave(data.filter((d) => d.status === "On Leave").length);
    }
  }, [data]);

  useEffect(() => {
    dispatch(fetchAttendance({ sessionId, ...search, page, limit }));
  }, [dispatch, sessionId, search, page, limit]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchFilters({
      name: searchName,
      batch: searchBatchName,
      enrollment_id: searchEnrollmentId
    }));
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(setPage(newPage));
  };
  // const totalPages = Math.ceil(filteredData.length / attendancePerPage);
  const totalPages = Math.ceil(total / limit);



  // Filter data by selected tab
  const filteredData = attendanceData.filter((student) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "In") return student.status === "In";
    if (selectedTab === "Out") return student.status === "Out";
    if (selectedTab === "Absent") return student.status === "Absent";
    return true;
  });



  // Handlers


  const handleExportData = () => {
    // Implement export logic
    console.log("Exporting data...");
  };

  const handleSetAttendance = () => {
    // Implement attendance update logic
    console.log("Setting attendance...");
  };

  const handleExportReport = () => {
    // Implement report export logic
    console.log("Exporting report...");
  };
  const handleProceed = () => {
    const values = getValues();

    const result = exportSchema.safeParse(values);

    if (!result.success) {
      // Show Zod validation errors manually
      Object.entries(result.error.flatten().fieldErrors).forEach(([key, val]) => {
        if (val?.[0]) {
          // Set error manually if needed, or rely on react-hook-form's built-in error handling
          console.warn(`${key}: ${val[0]}`);
        }
      });
      return; // Stop here, don't proceed
    }

    // If validation passed
    setOpenFirstModal(false);
    setTimeout(() => setOpenSecondModal(true), 300);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(exportSchema),
    defaultValues: {
      fromDate: new Date(),
      toDate: new Date(),
      course: "",
      batch: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Exporting report with:", data);
    setOpenFirstModal(false);
    setTimeout(() => setOpenSecondModal(true), 300);
  };
  const [currentPage, setCurrentPage] = useState(1);

  const attendancePerPage = 8; // You can change to 5 or 8 as needed

  const startIndex = (currentPage - 1) * attendancePerPage;
  const selectedAttendance = filteredData.slice(startIndex, startIndex + attendancePerPage);



  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      {/* Pass setActivePage to Sidebar */}
      <AppSidebar />
      <SidebarInset>
        <Header />

        {/* Main container */}
        <main className="flex-1 overflow-auto">
          <div className=" container  rounded-lg shadow-sm shadow-blue-500/50" >
            {/* Top counters */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 m-5">
              <div className="text-center border p-3 rounded-lg shadow-md shadow-blue-500/50">
                <p className="text-2xl font-bold">{totalStudents}</p>
                <p>Total Students</p>
              </div>
              <div className="text-center border p-3 rounded-lg shadow-md shadow-blue-500/50">
                <p className="text-2xl font-bold">{outsideCampus}</p>
                <p>Outside Campus</p>
              </div>
              <div className="text-center border p-3 rounded-lg shadow-md shadow-blue-500/50">
                <p className="text-2xl font-bold">{insideCampus}</p>
                <p>Inside Campus</p>
              </div>
              <div className="text-center border p-3 rounded-lg shadow-md shadow-blue-500/50">
                <p className="text-2xl font-bold">{onLeave}</p>
                <p>On Leave</p>
              </div>
            </div>


            {/* Tab buttons */}
            <div className="flex flex-wrap gap-4 mb-6 m-2 items-center">
              {/* Tabs */}
              <div className="flex gap-4">
                {["All", "In", "Out", "Absent"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`rounded-md px-4 py-2 text-[12px] font-medium ${selectedTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search fields + export button */}
              <div className="flex flex-wrap gap-4 mb-6 m-5 w-full sm:w-auto justify-between sm:justify-start items-center">
                <input
                  type="text"
                  placeholder="Search By Enrollment Id"
                  value={searchEnrollmentId}
                  onChange={(e) => setSearchEnrollmentId(e.target.value)}
                  className="border border-blue-500 rounded-md text-sm text-gray-700 px-2 py-2 h-10 shadow-sm w-full sm:w-auto"
                />

                <input
                  type="text"
                  placeholder="Search By Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="border border-blue-500 px-2 py-2 h-10 text-sm rounded-lg text-gray-700 shadow-md w-full sm:w-auto"
                />

                <input
                  type="text"
                  placeholder="Search By Batch Name"
                  value={searchBatchName}
                  onChange={(e) => setSearchBatchName(e.target.value)}
                  className="border border-blue-500 px-2 py-2 h-10 text-sm rounded-lg text-gray-700 shadow-md w-full sm:w-auto"
                />
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}

                <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 h-10 rounded-lg border border-blue-500 shadow-md shadow-blue-500/50"
                >
                  Search
                </button>

                <button
                  onClick={handleExportData}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 h-10 rounded-lg border border-blue-500 shadow-md shadow-blue-500/50"
                >
                  Export Data
                </button>
              </div>


            </div>

            <div className="flex items-center justify-between gap-4 mb-6 w-full sm:w-auto">
              {/* Date Picker */}
              <div className="flex-1 sm:w-auto">
                <Button
                  variant="outline"
                  className="w-[250px] flex items-center text-left justify-between shadow-sm border border-blue-400 rounded-xl px-4 py-2 shadow-blue-500/50 font-normal mb-5"
                  onClick={(e) => {
                    e.preventDefault();
                    inputRef.current?.showPicker();
                  }}
                >
                  {date ? format(new Date(date), "yyyy-MM-dd") : "Pick a date"}
                  <CalendarIcon className="h-5 w-5" />
                </Button>

                <Input
                  ref={inputRef}
                  type="date"
                  className="opacity-0 absolute -z-10"
                  value={date || ""}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Dialog open={openFirstModal} onOpenChange={setOpenFirstModal}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setOpenFirstModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg border border-blue-500 shadow-md shadow-blue-500/50"
                    >
                      Export Report
                    </Button>
                  </DialogTrigger>
                </Dialog>

                <Dialog open={openSecondModal} onOpenChange={setOpenSecondModal}>
                  <DialogContent className="sm:max-w-[400px]" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                    <DialogHeader>
                      <DialogTitle className="text-center text-lg font-semibold">
                        Confirm Export
                      </DialogTitle>
                    </DialogHeader>

                    <p className="text-center text-gray-600">
                      Are you sure you want to export the report from{" "}
                      <b>{fromDate.toLocaleDateString()}</b> to{" "}
                      <b>{toDate.toLocaleDateString()}</b>?
                    </p>

                    <DialogFooter className="flex justify-between">
                      <Button onClick={() => setOpenSecondModal(false)} variant="outline">
                        Cancel
                      </Button>
                      <Button onClick={() => setOpenSecondModal(false)} className="bg-green-600 hover:bg-green-700 text-white">
                        Export Report
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>


            {/* Table or "No Data Available" */}
            <div className="overflow-x-auto max-h-[300px] overflow-y-auto border rounded-md">
              {loading ? (
                <p className="text-center py-4">Loading...</p>
              ) : error ? (
                <p className="text-center py-4 text-red-500">{error}</p>
              ) : filteredData.length > 0 ? (
                <table className="w-full border-collapse border">
                  <thead className="bg-gray-200 text-gray-800 sticky top-0 z-10">
                    <tr>
                      <th className="border px-4 py-2">Enrollment ID</th>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Batch Name</th>
                      <th className="border px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((student) => (
                      <tr key={student.id}>
                        <td className="border text-md px-4 py-2">{student.enrollment_id}</td>
                        <td className="border text-md px-4 py-2">{student.Student.name}</td>
                        <td className="border text-md px-4 py-2">{student.Student.Batch.BatchesName}</td>
                        <td className="border text-md px-4 py-2">{student.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center py-4">No data available</p>
              )}
            </div>


            <Pagination className="mt-4 justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious

                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink

                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-md ${currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                        }`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Attendance;


