import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { AreaChart, Area, CartesianGrid, XAxis, BarChart, Bar } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from "../../src/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/ui/table";
import { Badge } from "../../src/components/ui/badge";
import { Button } from "../../src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Printer, MoreVertical } from "lucide-react";
import { SidebarInset, SidebarProvider } from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import { Employesss, Department } from "../../../Redux_store/Api/Dashboard.Api";
import { Users, UserX, CalendarCheck, Timer, Book } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import Department from "@/Redux_store/Api/Department";

const Dashboard = ({ children }) => {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const dispaatch = useDispatch()
  const { employees, loading, error } = useSelector((state) => state.Employesss || {})
  const departments  = useSelector((state) => state.Employesss.departments || {});

  console.log(departments);

  useEffect(() => {
    dispaatch(Employesss())
    dispaatch(Department())
  }, [dispaatch])
  
  const influencers = [
    { name: "Malik Wiwoho", projects: 23, followers: "1,620,201" },
    { name: "Nancy Auta", projects: 34, followers: "1,224,620" },
    { name: "Natasha Vresta", projects: 12, followers: "1,100,491" },
    { name: "Wilona Hamda", projects: 8, followers: "927,621" },
    { name: "Riva Nanda", projects: 10, followers: "827,810" },
  ];

  const schoolPerformanceData = [
    { week: "Week 01", thisWeek: 400, lastWeek: 500 },
    { week: "Week 02", thisWeek: 300, lastWeek: 450 },
    { week: "Week 03", thisWeek: 450, lastWeek: 350 },
    { week: "Week 04", thisWeek: 500, lastWeek: 400 },
    { week: "Week 05", thisWeek: 350, lastWeek: 450 },
    { week: "Week 06", thisWeek: 300, lastWeek: 500 },
    { week: "Week 06", thisWeek: 300, lastWeek: 309 },
  ];

  const chartData = [
    { month: "January", desktop: 124, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 120 },
    { month: "June", desktop: 220, mobile: 10 },
    { month: "June", desktop: 227, mobile: 100 },
    { month: "June", desktop: 242, mobile: 30 },
    { month: "June", desktop: 241, mobile: 10 },
    { month: "June", desktop: 248, mobile: 170 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate()
  const students = [
    { number: "1", name: "Jordan Nico", TotalUser: "18" },
    { number: "2", name: "Maria Jones", TotalUser: "6" },
    { number: "3", name: "Alan Smith", TotalUser: "98" },
    { number: "4", name: "Sara Lee", TotalUser: "76" },
    { number: "5", name: "Tom Hardy", TotalUser: "4" },
    { number: "6", name: "Lily Brown", TotalUser: "35" },
    { number: "7", name: "John Carter", TotalUser: "15" },
    { number: "8", name: "Emma Wilson", TotalUser: "10" },
    { number: "9", name: "Oliver Stone", TotalUser: "6" },
    { number: "10", name: "Sophia Green", TotalUser: "70" },
  ];
  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, students.length);

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const paginatedTeachers = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        <AppSidebar />
        <SidebarInset>
          <Header />

          <div className="flex flex-col md:flex-row min-h-screen">
            {/* Main Content */}
            <div className="flex-1 p-4">
              {/* Stats Cards */}
              <Card className="shadow-md rounded-lg p-6 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    {
                      label: "Students",
                      count: "93K",
                      icon: "🎓",
                      color: "bg-purple-500",
                    },
                    {
                      label: "Total Absent",
                      count: "74K",
                      icon: <UserX className="w-6 h-6" />,
                      color: "bg-red-500",
                    },
                    {
                      label: " Total Present",
                      count: "40K",
                      icon: <CalendarCheck className="w-6 h-6" />,
                      color: "bg-yellow-500",
                    },
                    {
                      label: "Total Half-Day",
                      count: "32K",
                      icon: <Timer className="w-6 h-6" />,
                      color: "bg-blue-900",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg"
                    >
                      <span
                        className={`text-3xl ${item.color} text-white p-3 rounded-full`}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">{item.label}</h3>
                        <p className="text-2xl font-bold">{item.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4  ">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-4">
                      School Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5">
                      {/* {schoolPerformanceData?.map((data, index) => (
                   <li key={index} className="mb-2">
                     <strong>{data?.week}:</strong> This Week - {data.thisWeek}, Last Week - {data.lastWeek}
                   </li>
                 ))} */}
                    </ul>

                    <ChartContainer
                      config={{
                        mobile: { color: "red" },
                        desktop: { color: "rgb(37, 99, 235)" },
                      }}
                    >
                      <AreaChart width={500} height={250} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <ChartTooltip />
                        <ChartLegend />
                        <Area
                          type="monotone"
                          dataKey="mobile"
                          stroke="rgb(37, 99, 235)"
                          fill="rgb(37, 99, 235)"
                        />
                        <Area
                          type="monotone"
                          dataKey="desktop"
                          stroke="#82ca9d"
                          fill="rgb(37, 99, 235)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-4 ">
                      School Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5">
                      {/* {schoolPerformanceData?.map((data, index) => (
                   <li key={index} className="mb-2">
                     <strong>{data?.week}:</strong> This Week - {data.thisWeek}, Last Week - {data.lastWeek}
                   </li>
                 ))} */}
                    </ul>

                    {/* Wrapped in ChartContainer to provide context */}
                    <ChartContainer
                      config={{
                        mobile: { color: "rgb(124, 161, 243)" },
                        desktop: { color: "rgb(37, 99, 235)" },
                      }}
                    >
                      <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip />
                        <Bar
                          dataKey="desktop"
                          fill="var(--color-desktop)"
                          radius={4}
                        />
                        <Bar
                          dataKey="mobile"
                          fill="var(--color-mobile)"
                          radius={4}
                        />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <div className="p-4 shadow-lg rounded-lg overflow-y-scroll  border border-gray-1000">
                  <h2 className="text-xl font-semibold mb-4">Department</h2>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>S.NO.</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Total User</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departments?.data?.data?.map((dept, index) => (
                        <TableRow key={dept.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{dept.name}</TableCell>
                          {/* <TableCell>{new Date(dept.updatedAt).toLocaleDateString()}</TableCell> */}
                          <TableCell>{dept.access_control?.length || 0}</TableCell>

                        </TableRow>
                      ))}


                    </TableBody>
                  </Table>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                      Showing {startEntry} to {endEntry} of {students.length}{" "}
                      entries
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft size={16} />
                      </Button>

                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i}
                          variant={
                            currentPage === i + 1 ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            prev < totalPages ? prev + 1 : prev
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Total Students */}
                  <Card className="flex items-center justify-between  border p-4 w-full">
                    <div className="flex items-center gap-3 font-bold">
                      <div className="bg-red-100 text-red-500 p-6 rounded-full">
                        <Book size={20} />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-red-500">
                          {
                            employees?.data?.Students
                          }
                        </p>
                        <p className="text-sm text-gray-600">Total Students</p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-500 cursor-pointer" size={18}
                      onClick={() => navigate("/students")}

                    />
                  </Card>

                  {/* Total Employees */}
                  <Card className="flex items-center justify-between border p-4 w-full">
                    <div className="flex items-center gap-3 font-bold">
                      <div className="bg-pink-100 text-pink-500 p-6 rounded-full">
                        <Users size={20} />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-emerald-500">
                          {
                            employees?.data?.allemploye
                          }
                        </p>
                        <p className="text-sm text-gray-600">Total Employees</p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-500 cursor-pointer" size={18}
                      onClick={() => navigate("/team")}

                    />
                  </Card>

                  {/* Complaints */}
                  <Card className="flex items-center justify-between border p-6 ">
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-semibold">Complaints</p>
                      <div className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-semibold text-emerald-600">
                            3
                          </p>
                          <span className="text-xs text-gray-500">Closed</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-semibold text-red-500">
                            11
                          </p>
                          <span className="text-xs text-gray-500">New</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-500 cursor-pointer" size={18}
                      onClick={() => navigate("/support")}
                    />
                  </Card>
                  <div className="space-y-3 pt-4  ">
                    {/* Total Debit Amount */}
                    <Card className="flex items-center justify-between border p-4 mt-4">
                      <p className="text-sm text-gray-500">
                        Total Debit Amount
                      </p>
                      <p className="text-lg font-semibold text-emerald-500">
                        ₹ 303498
                      </p>
                    </Card>

                    {/* Total Credit Amount */}
                    <Card className="flex items-center justify-between border p-4 ">
                      <p className="text-sm text-gray-500">
                        Total Credit Amount
                      </p>
                      <p className="text-lg font-semibold text-yellow-500">
                        ₹ 0
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Dashboard;
