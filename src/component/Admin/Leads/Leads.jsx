import React, { useEffect, useState } from "react";
import { SidebarInset, SidebarProvider } from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import Header from "../Dashboard/Header";
import { Button } from "../../src/components/ui/button";
import { Input } from "../../src/components/ui/input";
import { DownloadIcon, PlusIcon } from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  AddLeads,
  changestatusLeads,
  getallLeads,
  searchingleads,
} from "../../../Redux_store/Api/LeadsApi";

import MyLeads from "./MyLeads/MyLeads";
import { values } from "regenerator-runtime";
import { createCategory, getAllCategory } from "../../../Redux_store/Api/CategoryApi";

const Leads = () => {
  const rowsPerPage = 5;
  const Navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const data = [
    { name: "JavaScript", value: 30, color: "#E91E63" }, // Pink
    { name: "HTML/CSS", value: 20, color: "#FF9800" }, // Orange
    { name: "Python", value: 25, color: "#FFEB3B" }, // Yellow
    { name: "SQL", value: 20, color: "#4CAF50" }, // Green
    { name: "TypeScript", value: 5, color: "#673AB7" }, // Purple
  ];
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
  const [leadModalStatus, setLeadModalStatus] = useState(false);
  const [categoryModalStatus, setCategoryModalStatus] = useState(false);
  const totalPages = Math.ceil(data1.length / rowsPerPage);
  const currentData = data1.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const categoryOnlySchema = z.object({
    name: z.string().min(4, "Category name is required"),
  });
  const form = useForm({
    defaultValues: {},
    resolver: zodResolver(categoryOnlySchema),
  });
  const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    email: z.string().min(1, "Category email is required"),
    address: z.string().min(1, "Category address is required"),
    contact: z.string().min(1, "Category contact is required"),
    category_id: z.string().min(1, "Category category_id is required"),
    assign_to: z.string().min(1, "Category assign_to is required"),
    time: z.string().min(1, "Category time is required"),
    status: z.string().min(1, "Category status is required"),
  });
  const {
    register: categoryRegister,
    handleSubmit: handleCategorySubmit,
    reset: categoryReset,
    setValue,
    formState: { errors: categoryErrors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const [MYaddLeads, setaddLeads] = useState({
    name: "",
    address: "",
    email: "",
    phone_number: "",
    category_id: "",
    assign_to: "",
    time: "",
    status: "",
  });
  // const onValidCategorySubmit = async (data) => {
  //   try {
  //     const response = await dispatch(AddLeads(data)); // ✅ send data to thunk

  //     if (response.meta.requestStatus === "fulfilled") {
  //       toast.success("Lead added successfully!");
  //       setLeadModalStatus(false); // ✅ close modal
  //     } else {
  //       toast.error("Failed to add lead");
  //     }
  //   } catch (err) {
  //     console.error("Error:", err);
  //     toast.error("Something went wrong");
  //   }
  // };
  const dispatch = useDispatch();

  const handlecategory = (data) => {
    console.log("Category Data:", data);
    setCategoryModalStatus(false); // close Add Category modal
    setAddConfrom(true);
    categoryReset();

    dispatch(createCategory(data));
  };
  const onInvalidCategorySubmit = (errors) => {
    console.log("Validation Errors:", errors);
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

  const onhandleDat = async () => {
    console.log("hello");
  };

  const onValidCategorySubmit = async () => {
    try {
      const resultAction = await dispatch(AddLeads(MYaddLeads));
      if (AddLeads.fulfilled.match(resultAction)) {
        toast.success("Lead added successfully!");
        setLeadModalStatus(false); // close the modal
      } else {
        toast.error(resultAction.payload?.message || "Failed to add lead");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  // ********************************************
  const {
    leads = [],
    loading,
    error,
  } = useSelector((state) => state.Leads || {});

  useEffect(() => {
    dispatch(changestatusLeads());
    // console.log(changestatusLeads());
    dispatch(getallLeads());
    // console.log(getallLeads());
    dispatch(AddLeads());
    // console.log(AddLeads());
    dispatch(createCategory());
    console.log(createCategory());
    dispatch(getAllCategory());
    console.log(getAllCategory());

  }, [dispatch]);

  // **********
  console.log(MYaddLeads);

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    const payload = {
      name: searchInput, 
      email: "",
      phone_number: "",
      assign_to: "", 
    };

    dispatch(searchingleads(payload));
  };

  const { successMessage } = useSelector((state) => state.Category);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setCategoryModalStatus(false); 
      form.reset();
    }

    if (error) {
      toast.error(typeof error === "string" ? error : "Failed to add category");
    }
  }, [successMessage, error]);

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
                      {Array.isArray(leads) &&
                        leads.map((entry, index) => (
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
              {/* <Input placeholder="Search Leads..." className="w-1/4" />
              <Button className="bg-blue-600 text-white ">Search</Button> */}

              <Input
                placeholder="Search Leads..."
                className="w-1/4"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button onClick={handleSearch} className="bg-blue-600 text-white">
                Search
              </Button>

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

              {/* add Leads */}
              <Dialog open={leadModalStatus} onOpenChange={setLeadModalStatus}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white">
                    <PlusIcon className="mr-1" /> Add Leads
                  </Button>
                </DialogTrigger>
                <DialogContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                  className="sm:max-w-[525px]"
                >
                  <DialogHeader>
                    <DialogTitle>Add Leads</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={handleCategorySubmit(
                      onValidCategorySubmit,
                      onInvalidCategorySubmit,
                      onhandleDat
                    )}
                    className="grid gap-4 py-4"
                  >
                    {/* Inputs */}
                    <Input
                      {...categoryRegister("name")}
                      placeholder="Enter Name"
                      className="col-span-4"
                      onChange={(e) =>
                        setaddLeads({ ...MYaddLeads, name: e.target.value })
                      }
                    />

                    {categoryErrors.name && (
                      <p className="text-red-500 text-sm">
                        {categoryErrors.name.message}
                      </p>
                    )}

                    <Input
                      {...categoryRegister("email")}
                      placeholder="Enter Email"
                      className="col-span-4"
                      onChange={(e) =>
                        setaddLeads({ ...MYaddLeads, email: e.target.value })
                      }
                    />
                    {categoryErrors.email && (
                      <p className="text-red-500 text-sm">
                        {categoryErrors.email.message}
                      </p>
                    )}

                    <Input
                      {...categoryRegister("address")}
                      placeholder="Enter Address"
                      className="col-span-4"
                      onChange={(e) =>
                        setaddLeads({ ...MYaddLeads, address: e.target.value })
                      }
                    />
                    {categoryErrors.address && (
                      <p className="text-red-500 text-sm">
                        {categoryErrors.address.message}
                      </p>
                    )}

                    <Input
                      {...categoryRegister("contact")}
                      placeholder="Enter Contact"
                      className="col-span-4"
                      onChange={(e) =>
                        setaddLeads({
                          ...MYaddLeads,
                          phone_number: e.target.value,
                        })
                      }
                    />
                    {categoryErrors.contact && (
                      <p className="text-red-500 text-sm">
                        {categoryErrors.contact.message}
                      </p>
                    )}

                    <Input
                      type="number"
                      {...categoryRegister("category_id")}
                      placeholder="Enter Category ID"
                      className="col-span-4"
                      onChange={(e) =>
                        setaddLeads({
                          ...MYaddLeads,
                          category_id: parseInt(e.target.value),
                        })
                      }
                    />
                    {categoryErrors.category_id && (
                      <p className="text-red-500 text-sm">
                        {categoryErrors.category_id.message}
                      </p>
                    )}

                    <Input
                      type="number"
                      {...categoryRegister("assign_to")}
                      placeholder="Enter assign_to ID"
                      className="col-span-4"
                      onChange={(e) =>
                        setaddLeads({
                          ...MYaddLeads,
                          assign_to: parseInt(e.target.value),
                        })
                      }
                    />
                    {categoryErrors.assign_to && (
                      <p className="text-red-500 text-sm">
                        {categoryErrors.assign_to.message}
                      </p>
                    )}

                    <Input
                      type="text"
                      {...categoryRegister("time")}
                      placeholder="HH:MM:SS"
                      pattern="^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$"
                      className="col-span-4"
                      onChange={(e) =>
                        setaddLeads({ ...MYaddLeads, time: e.target.value })
                      }
                    />

                    {categoryErrors.time && (
                      <p className="text-red-500 text-sm">
                        {categoryErrors.time.message}
                      </p>
                    )}

                    <Select
                      onValueChange={(value) =>
                        setaddLeads({ ...MYaddLeads, status: value })
                      }
                    >
                      <SelectTrigger className="col-span-4">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inconservation">
                          Inconservation
                        </SelectItem>
                        <SelectItem value="Droped">Droped</SelectItem>
                        <SelectItem value="Hot">Hot</SelectItem>
                        <SelectItem value="Converted">Converted</SelectItem>
                      </SelectContent>
                    </Select>
                    {categoryErrors.status && (
                      <p className="text-red-500 text-sm">
                        {categoryErrors.status.message}
                      </p>
                    )}

                    <DialogFooter>
                      <Button type="submit">Submit</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* add Category */}
              {/* <Dialog
                open={categoryModalStatus}
                onOpenChange={setCategoryModalStatus}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white">
                    <PlusIcon className="mr-0" /> Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                  className="sm:max-w-[525px]"
                >
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={form.handleSubmit(handlecategory)}
                    className="grid gap-4 py-4"
                  >
                    <Label htmlFor="name">Enter Category Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter category name"
                      className="col-span-4"
                      {...form.register("name")}
                    />

                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.name.message}
                      </p>
                    )}

                    <DialogFooter>
                      <Button type="submit">Add Category</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog> */}
              <Dialog
                open={categoryModalStatus}
                onOpenChange={setCategoryModalStatus}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white">
                    <PlusIcon className="mr-0" /> Add Category
                  </Button>
                </DialogTrigger>

                <DialogContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                  className="sm:max-w-[525px]"
                >
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                  </DialogHeader>

                  <form
                    onSubmit={form.handleSubmit(handlecategory)}
                    className="grid gap-4 py-4"
                  >
                    <Label htmlFor="name">Enter Category Name</Label>
                    {/* <Input
                      id="name"
                      placeholder="Enter category name"
                      className="col-span-4"
                      {...form.register("name", {
                        required: "Category name is required",
                      })}
                    /> */}
                    <Input
                      id="name"
                      placeholder="Enter category name"
                      className="col-span-4"
                      {...form.register("name", {
                        required: "Category name is required",
                      })}
                    />

                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.name.message}
                      </p>
                    )}

                    <DialogFooter>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add Category"}
                      </Button>
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
                  {Array.isArray(leads) &&
                    leads.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone_number}</TableCell>
                        <TableCell>{item.categoryname}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.EmployesName}</TableCell>
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
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">
                                      {" "}
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
                                          Marketing{" "}
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
                  {" "}
                  +{" "}
                </button>
              </div>
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
                  onClick={handleConfirm}
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
