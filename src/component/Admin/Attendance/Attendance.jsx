import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  // For the date/time display at the bottom
  // const currentDateTime = new Date().toLocaleString();

  // Mock fetching data (replace with real API if needed)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Example data
      const data = [
        {
          id: 1,
          enrollmentId: "E001",
          name: "John Doe",
          batchName: "Batch A",
          status: "In",
        },
        {
          id: 2,
          enrollmentId: "E002",
          name: "Jane Smith",
          batchName: "Batch B",
          status: "Out",
        },
        // Add more data as needed
      ];

      // Update states based on fetched data
      setAttendanceData(data);
      setTotalStudents(data.length);
      setOutsideCampus(data.filter((d) => d.status === "Out").length);
      setInsideCampus(data.filter((d) => d.status === "In").length);
      setOnLeave(data.filter((d) => d.status === "On Leave").length);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter data by selected tab
  const filteredData = attendanceData.filter((student) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "In") return student.status === "In";
    if (selectedTab === "Out") return student.status === "Out";
    if (selectedTab === "Absent") return student.status === "Absent";
    return true;
  });

  // Handlers
  const handleSearch = () => {
    // Implement filtering logic based on search fields if needed
    // (e.g., re-fetch from server or filter in-memory)
    console.log("Searching:", {
      searchEnrollmentId,
      searchName,
      searchBatchName,
    });
  };

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
    setOpenFirstModal(false); // Close first modal
    setTimeout(() => setOpenSecondModal(true), 300); // Open second modal with slight delay for smooth transition
  };
  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
    {/* Pass setActivePage to Sidebar */}
    <AppSidebar />
    <SidebarInset>
      <Header />

        {/* Main container */}
        <main className="flex-1 overflow-auto">
        <div className="m-6 p-6 rounded-lg shadow-sm shadow-blue-500/50">
          {/* Top counters */}
          <div className="grid grid-cols-4 gap-4 mb-6">
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
            <div className="text-center border p-3 rounded-lg shadow-md  shadow-blue-500/50">
              <p className="text-2xl font-bold">{onLeave}</p>
              <p>On Leave</p>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-4 mb-6">
            {["All", "In", "Out", "Absent"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-lg border shadow-md ${
                  selectedTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search fields + export button */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search By Enrollment Id"
              value={searchEnrollmentId}
              onChange={(e) => setSearchEnrollmentId(e.target.value)}
              className="border border-blue-500 p-3 rounded-lg text-gray-700 focus:ring focus:ring-blue-200 shadow-md"
            />
            <input
              type="text"
              placeholder="Search By Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="border border-blue-500 p-3 rounded-lg text-gray-700 focus:ring focus:ring-blue-200 shadow-md"
            />
            <input
              type="text"
              placeholder="Search By Batch Name"
              value={searchBatchName}
              onChange={(e) => setSearchBatchName(e.target.value)}
              className="border border-blue-500 p-3 rounded-lg text-gray-700 focus:ring focus:ring-blue-200 shadow-md"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg border border-blue-500 shadow-md shadow-blue-500/50"
            >
              Search
            </button>
            <button
              onClick={handleExportData}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg border border-blue-500 shadow-md shadow-blue-500/50"
            >
              Export Data
            </button>
          </div>

          {/* Date picker */}
          <Popover>
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
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Action buttons (Apply, Set Attendance, Export Report) */}

          <div className="mb-6 flex gap-4">
            {/* Export Report Button */}
            <Dialog open={openFirstModal} onOpenChange={setOpenFirstModal}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setOpenFirstModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg border border-blue-500 shadow-md shadow-blue-500/50"
                >
                  Export Report
                </Button>
              </DialogTrigger>

              {/* First Modal - Export Report */}
              <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                  <DialogTitle className="text-center text-lg font-semibold">
                    Export Report
                  </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                  {/* Date Pickers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>From</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {fromDate.toLocaleDateString()}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={fromDate}
                            onSelect={setFromDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>To</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {toDate.toLocaleDateString()}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={toDate}
                            onSelect={setToDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Select Course */}
                  <div>
                    <Label>Select Course*</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="--Select Course--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course1">Course 1</SelectItem>
                        <SelectItem value="course2">Course 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Select Batch */}
                  <div>
                    <Label>Select Batch*</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="--Select Batch--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="batchA">Batch A</SelectItem>
                        <SelectItem value="batchB">Batch B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Proceed Button */}
                <DialogFooter>
                  <Button
                    onClick={handleProceed}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                  >
                    Proceed
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Second Modal - Confirmation */}
            <Dialog open={openSecondModal} onOpenChange={setOpenSecondModal}>
              <DialogContent className="sm:max-w-[400px]">
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
                  <Button
                    onClick={() => setOpenSecondModal(false)}
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
          </div>

          {/* Table or "No Data Available" */}
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : filteredData.length > 0 ? (
              <table className="w-full border-collapse border">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Enrollment ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Batch Name</th>
                    <th className="border px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((student) => (
                    <tr key={student.id}>
                      <td className="border px-4 py-2">
                        {student.enrollmentId}
                      </td>
                      <td className="border px-4 py-2">{student.name}</td>
                      <td className="border px-4 py-2">{student.batchName}</td>
                      <td className="border px-4 py-2">{student.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-red-600 font-semibold font-mono4">
                No Data Available
              </p>
            )}
          </div>
        </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Attendance;
