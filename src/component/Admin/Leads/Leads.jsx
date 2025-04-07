import React, { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import Header from "../Dashboard/Header";

import { Button } from "../../src/components/ui/button";
import { Input } from "../../src/components/ui/input";
import { CalendarIcon, DownloadIcon, PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/ui/select";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../src/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../src/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import { Label } from "../../src/components/ui/label";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../src/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { ScrollArea } from "../../src/components/ui/scroll-area";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ThankYouCard from "../Dashboard/ThankYouCard";

const Leads = () => {
  const rowsPerPage = 5; // Number of rows per page
  const Navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const stats = [
    { title: "Views", value: "7,265", change: "+11.07%", up: true },
    { title: "Visits", value: "3,671", change: "-0.03%", up: false },
    { title: "New Users", value: "156", change: "+13.57%", up: true },
    { title: "Active Users", value: "2,318", change: "+6.08%", up: true },
  ];
  const [date, setDate] = useState(null);
  // const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");

  const data = [
    { name: "JavaScript", value: 30, color: "#E91E63" }, // Pink
    { name: "HTML/CSS", value: 20, color: "#FF9800" }, // Orange
    { name: "Python", value: 25, color: "#FFEB3B" }, // Yellow
    { name: "SQL", value: 20, color: "#4CAF50" }, // Green
    { name: "TypeScript", value: 5, color: "#673AB7" }, // Purple
  ];

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Ellie Edgington",
      company: "Micheldev Tyre Services Ltd",
      status: "New",
      category: "Automobile",
    },
    {
      id: 2,
      name: "Sunnie Browne",
      company: "PrintsPro / Printing",
      status: "In Progress",
      category: "Marketing",
    },
    {
      id: 3,
      name: "P Vivek",
      company: "Tesla Media",
      status: "Completed",
      category: "Technology",
    },
  ]);

  const data1 = [
    {
      name: "dvsn",
      address: "jaipur",
      email: "myselfyashu6@gmail.com",
      phone: "78787643565",
      category: "industory2",
      status: "Converted",
      assigned: "shivi",
      time: "24-02-2024",
    },
    {
      name: "dvsn",
      address: "jaipur",
      email: "myselfyashu6@gmail.com",
      phone: "78787643565",
      category: "industory2",
      status: "Inconservation",
      assigned: "veer",
      time: "24-02-2024",
    },
    {
      name: "dvsn",
      address: "jaipur",
      email: "myselfyashu6@gmail.com",
      phone: "78787643565",
      category: "Inconservation",
      status: "Inconservation",
      assigned: "Amrita",
      time: "24-02-2024",
    },
  ];

  const [department, setDepartment] = useState("Please Select");
  const [Employee, setEmployee] = useState("Please Select");
  const [AddConfrom, setAddConfrom] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const totalPages = Math.ceil(data1.length / rowsPerPage);
  const currentData = data1.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const leadSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    address: z.string().min(1, "Address is required"),
    contact: z.string().min(10, "Contact must be at least 10 digits"),
    category: z.string().min(1, "Category is required"),
  });

  const form = useForm({
    defaultValues: {},
  });
  const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
  });

  const {
    register: categoryRegister,
    handleSubmit: handleCategorySubmit,
    reset: categoryReset,
    formState: { errors: categoryErrors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });
  const handlecategory = (data) => {
    console.log("Category Form Data:", data);
    setAddConfrom(true); // show confirmation dialog
    categoryReset(); // reset this specific form
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // ✅ only happens after validation passes
    form.reset();
    setOpen(false);
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

  return (
    <>
      <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        <AppSidebar />
        <SidebarInset>
          <Header />

          <ScrollArea className="w-full overflow-y-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg w-full">
              <Card className="w-full sm:w-[280px] md:w-[320px] flex-shrink-0 flex flex-col items-center p-4">
                <div className="flex-1 w-full">
                  <CardTitle className="text-center font-semibold">
                    Highest Source of Lead Generation
                  </CardTitle>
                  <CardHeader>
                    <CardTitle className="text-center text-lg font-semibold">
                      Total Leads: 10
                    </CardTitle>
                  </CardHeader>
                </div>
                <div className="h-20 w-40 flex justify-center items-center">
                  <PieChart width={120} height={120}>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      innerRadius={20}
                      dataKey="value"
                      label={false}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </Card>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {[
                  {
                    title: "Hot Leads",
                    value: "30.00",
                    change: "+5",
                    up: true,
                  },
                  {
                    title: "Converted Leads",
                    value: "10.00",
                    change: "-2",
                    up: false,
                  },
                  {
                    title: "InConversation Leads",
                    value: "50.00",
                    change: "+8",
                    up: true,
                  },
                  {
                    title: "Dropped Leads",
                    value: "10.00",
                    change: "-3",
                    up: false,
                  },
                ].map((stat, index) => (
                  <Card key={index} className="w-full p-4 rounded-lg shadow-md">
                    <CardContent className="flex flex-col items-center pt-4 text-center">
                      <span className="text-sm">{stat.title}</span>
                      <span className="text-2xl font-bold">{stat.value}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>

          <div className="p-6 rounded-lg shadow-md max-w-8xl mx-auto w-full ">
            <div className="flex flex-wrap justify-between gap-2 mb-4 w-full">
              <Input placeholder="Search Leads..." className="w-1/4" />
              <Button className="bg-blue-600 text-white ">Search</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{category}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setCategory("All Categories")}
                  >
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory("Automobile")}>
                    Automobile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory("Marketing")}>
                    Marketing
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{status}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatus("All Status")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatus("New")}>
                    New
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatus("In Progress")}>
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatus("Completed")}>
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline">
                <DownloadIcon className="h-4 w-4 mr-2" /> Export to Excel
              </Button>
              <Input type="date" className="w-60 md:col-span-2 lg:col-span-2" />

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white">
                    <PlusIcon className="mr-1" /> Add Leads
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Add Leads</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCategorySubmit(handlecategory)}>
                    <div className="grid gap-4 py-4">
                      <Label htmlFor="name" className="text-left">
                        Enter Category Name
                      </Label>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                          id="name"
                          {...categoryRegister("name")}
                          placeholder="Enter category name"
                          className="col-span-4"
                        />
                        {categoryErrors.name && (
                          <p className="text-red-500 text-sm">
                            {categoryErrors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Category</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {/* add Category */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white">
                    <PlusIcon className="mr-0" /> Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={form.handleSubmit(handlecategory)}>
                    <div className="grid gap-4 py-4">
                      <Label htmlFor="name" className="text-left">
                        Enter Category Name
                      </Label>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                          id="name"
                          // {...register("name")}
                          placeholder="Enter category name"
                          className="col-span-4"
                        />
                        {/* {errors.name && (
                          <p className="text-red-500 text-sm">
                            {errors.name.message}
                          </p>
                        )} */}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Category</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* My Leads */}
              <Button
                variant="default"
                className="bg-blue-600 "
                onClick={() => Navigate("/MyLeads")}
              >
                My Leads
              </Button>
            </div>

            <div className="w-full h-50 overflow-y-auto border rounded-md">
              <Table className="w-full">
                <TableHeader className="sticky top-0  shadow-md">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Name</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.assigned}</TableCell>
                      <TableCell>{item.time}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              <ChevronRight size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="">
                            <DropdownMenuItem asChild>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">
                                    Change Status
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[725px]">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Change Status of dvsn
                                    </DialogTitle>
                                  </DialogHeader>
                                  <select
                                    className="border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                    value={department}
                                    onChange={(e) =>
                                      setDepartment(e.target.value)
                                    }
                                  >
                                    <option value="Converted">
                                      {" "}
                                      Converted
                                    </option>
                                    <option value="Sales">Hot</option>
                                    <option value="Marketing">
                                      In Conversation
                                    </option>
                                    <option value="Support">Dropped</option>
                                  </select>
                                </DialogContent>
                              </Dialog>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">
                                    Assign Leads
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 dark:text-white border dark:border-gray-700">
                                  <DialogHeader>
                                    <DialogTitle className="text-gray-900 dark:text-white">
                                      Assign Lead
                                    </DialogTitle>
                                  </DialogHeader>

                                  <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Select Department
                                    </label>
                                    <select
                                      className="border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                      value={department}
                                      onChange={(e) =>
                                        setDepartment(e.target.value)
                                      }
                                    >
                                      <option value="Select"> Select</option>
                                      <option value="Sales">Sales</option>
                                      <option value="Marketing">
                                        Marketing
                                      </option>
                                      <option value="Support">Support</option>
                                    </select>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Select Employee
                                    </label>
                                    <select
                                      className="border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                      value={Employee}
                                      onChange={(e) =>
                                        setEmployee(e.target.value)
                                      }
                                    >
                                      <option value="Select"> Select</option>
                                      <option value="Sales">Sales</option>
                                      <option value="Marketing">
                                        Marketing
                                      </option>
                                      <option value="Support">Support</option>
                                    </select>
                                  </div>

                                  <DialogFooter>
                                    <Button
                                      onClick={() => setAddConfrom(true)}
                                      type="submit"
                                      className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                                    >
                                      Assign
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="px-3 py-1 rounded-md"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                -
              </button>
              <span className="text-sm font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 rounded-md"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                +
              </button>
            </div>
          </div>

          <Dialog open={AddConfrom} onOpenChange={setAddConfrom}>
            <DialogContent
              onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
              className="w-full max-w-[90vw] sm:max-w-[400px] p-6 rounded-lg"
            >
              <ThankYouCard />
              {/* Dialog Footer */}
              <DialogFooter className="flex justify-end gap-3">
                <Button
                  onClick={() => setAddConfrom(false)}
                  variant="outline"
                  className="w-full sm:w-auto text-black mt-4 bg-gray-100 hover:text-black hover:bg-gray-200 px-5 py-2 rounded-md flex items-center  transition-all"
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
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Leads;
