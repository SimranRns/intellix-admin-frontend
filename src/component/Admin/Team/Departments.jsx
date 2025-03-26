import React, { useState } from "react";
import "./Team.css"
import AppSidebar from "../../src/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../src/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import Header from "../Dashboard/Header";
import { ArrowLeft, Ellipsis, Search, User, Eye, Users } from "lucide-react";
import { Button } from "../../src/components/ui/Button";
import { Form, useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../src/components/ui/pagination";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../src/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../src/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../src/components/ui/dialog";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../src/components/ui/chart";
import { LabelList, Pie, PieChart } from "recharts";
import { FormControl, FormField, FormItem, FormLabel } from "../../src/components/ui/form";
import { Input } from "../../src/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Departments = () => {
  const navigate = useNavigate();
  const chartData = [
    { category: "New Employees", count: 500, fill: "var(--color-new)" },
    { category: "Old Employees", count: 300, fill: "var(--color-old)" },
    { category: "Interns", count: 200, fill: "var(--color-interns)" },
  ];
  const chartConfig = {
    count: {
      label: "Employees",
    },
    new: {
      label: "New Employees",
      color: "hsl(var(--chart-1))", // Green
    },
    old: {
      label: "Old Employees",
      color: "hsl(var(--chart-2))",
    },
    interns: {
      label: "Interns",
      color: "hsl(var(--chart-3))", // Blue
    },
  };
  const departmentSchema = z.object({
    departmentName: z.string().min(1, "Department name is required"),
  });
  const [DeleteDepartments, setDeleteDepartments] = useState(false);
  const [addDepartment, setAddDepartment] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const addDepartmentFrom = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      departmentName: "",
    },
  });

  const departmentsList = [
    {
      id: 1,
      departmentName: "Teaching",
      departmentUser: "10,000",
      departmentemployee: "Employee"
    },
    {
      id: 2,
      departmentName: "Finance",
      departmentUser: "20,000",
      departmentemployee: "Employee"
    },

  ];

  const handleChangedepartment = (data) => {
    console.log("Form Data:", data);
  };

  const departmentsPerPage = 6;
  const totalPages = Math.ceil(departmentsList.length / departmentsPerPage);
  const startIndex = (currentPage - 1) * departmentsPerPage;
  const selectedDepartments = departmentsList.slice(startIndex, startIndex + departmentsPerPage);
  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>

        <header className="flex h-16 items-center gap-4 px-6 shadow-md rounded-b-lg">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  <Header />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="w-full shadow-md rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 mt-6 gap-3 bg-white">
          <div className="flex items-center gap-3">
            <Button
              className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
              <span className="hidden md:inline">Back to Department</span>
            </Button>
            <Button
              onClick={() => setAddDepartment(true)}
              className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              <span>Add Department</span>
            </Button>
            <Dialog open={addDepartment} onOpenChange={setAddDepartment}>
              <DialogContent className="sm:max-w-[600px] shadow-lg p-6 rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-center">Add Department</DialogTitle>
                </DialogHeader>
                {/* <Form {...addDepartmentFrom}>
                  <form onSubmit={addDepartmentFrom.handleSubmit(handleChangedepartment)} className="space-y-6">
                    <FormField
                      control={addDepartmentFrom.control}
                      name="departmentName"
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
                    <Button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                      Save
                    </Button>
                  </form>
                </Form> */}

              </DialogContent>
            </Dialog>
          </div>

          {/* Search Bar */}
          <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
            <Search size={18} className="text-gray-500" />
            <input type="text" placeholder="Search here..." className="ml-2 w-full outline-none bg-transparent text-sm" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-6">
          {selectedDepartments.map((department) => (
            <Card
              key={department.id}
              className="w-full max-w-[320px]  shadow-md shadow-blue-500/50 rounded-xl p-6 relative mx-auto"
            >
              {/* Department Name at the Top */}
              <CardTitle className="text-lg font-extrabold">{department.departmentName}</CardTitle>

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="absolute top-4 right-4 bg-blue-100 p-2 rounded-lg shadow-sm hover:bg-gray-200">
                    <Ellipsis className="text-gray-500" size={24} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-gray-100 mt-1 shadow-md rounded-md">
                  <DropdownMenuItem
                    onClick={() => setDeleteDepartments(true)}
                    className="cursor-pointer text-red-500 hover:bg-gray-200 px-4 py-2 text-md text-center "
                  >
                    Deactivate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog open={DeleteDepartments} onOpenChange={setDeleteDepartments}>
                <DialogContent className="sm:max-w-[425px] shadow-lg p-6 rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-center text-[22px] font-bold">Deactivate Department</DialogTitle>
                    <DialogDescription className="text-center text-md">
                      Are you sure you want to deactivate this department?
                    </DialogDescription>
                  </DialogHeader>
                  <hr className="mt-5" />
                  <div className="flex justify-center">
                    <Button className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700">
                      Deactivate Department
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <CardHeader className="flex flex-col items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <Users size={24} className="text-blue-500" />
                    <span className="text-lg font-bold">{department.departmentUser}</span>
                    <span className="text-sm text-gray-600">{department.departmentemployee}</span>
                  </div>
                </div>
              </CardHeader>

              {/* Chart Section */}
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[180px] [&_.recharts-text]:fill-background"
                >
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
                    <Pie data={chartData} dataKey="count">
                      <LabelList
                        dataKey="category"
                        className="fill-background"
                        stroke="none"
                        fontSize={8}
                        formatter={(value) => (chartConfig[value] ? chartConfig[value].label : value)}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>

              {/* Card Footer Buttons */}
              <CardFooter className="flex justify-center gap-4 mt-1">
                <Button className="bg-blue-600 text-xs text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-500 transition-all">
                  <User size={18} /> View User
                </Button>
                <Button
                  onClick={() => { navigate("/Access") }}
                  className="bg-orange-500 text-xs text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-orange-600 transition-all">
                  <Eye size={18} /> Access
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  as="button"
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
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </SidebarInset>
    </SidebarProvider>
  );
};

export default Departments;
