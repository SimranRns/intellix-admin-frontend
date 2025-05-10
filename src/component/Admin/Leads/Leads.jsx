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
  getAllAssignto,
  getallLeads,
  searchingleads,
  searchLeads,
} from "../../../Redux_store/Api/LeadsApi";

import MyLeads from "./MyLeads/MyLeads";
import { values } from "regenerator-runtime";
import {
  createCategory,
  getAllCategory,
} from "../../../Redux_store/Api/CategoryApi";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";
import name from "function.prototype.name/implementation";
const Leads = () => {
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
  const handleSubmit = () => {
    const payload = {
      name: name,
      email: email,
      address: address,
      phone_number: phone_number,
      category_id: category_id,
      assign_to: assign_to,
      time: time,
      status: status,
    };

    dispatch(changestatusLeads(payload));
  };

  //   const onSubmit = () => {
  //     console.log(onSubmit);
  //   };

  // useEffect(() => {
  //   dispatch(getAllAssignto());
  //   console.log(getAllAssignto,"***************************************788");

  // }, [dispatch]);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const rowsPerPage = 5;

  const [date, setDate] = useState(null);
  const [category, setCategory] = useState();
  console.log(category);
  const [status, setStatus] = useState("All Status");
  const [department, setDepartment] = useState("Please Select");
  const [Employee, setEmployee] = useState("Please Select");
  const [AddConfrom, setAddConfrom] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadModalStatus, setLeadModalStatus] = useState(false);
  const [categoryModalStatus, setCategoryModalStatus] = useState(false);
  // const [name, setSearchInput] = useState({name,email,phone_number,assign_to,category_id,status });
  // const [searchInput, setSearchInput] = useState({
  //   name: "",
  //   email: "",
  //   phone_number: "",
  //   assign_to: "",
  //   category_id: "",
  //   status: "",
  // });

  const [searchQuery, setSearchQuery] = useState({
    name: "",
    email: "",
    phone_number: "",
    assign_to: "",
    category_id: "",
    status: "",
  });
  console.log(searchQuery, "**************************** searchQuery");

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

  const {
    leads = [],
    loading,
    error,
    assignToList,
  } = useSelector((state) => state.Leads || {});
  const { categories } = useSelector((state) => state.Category || {});

  const totalPages = Math.ceil(leads.length / rowsPerPage);
  const currentData = data1.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const data3 = [
    { name: "Name", value: 30 },
    { name: "Email", value: 20 },
    { name: "Phone Number", value: 25 },
    { name: "Assign To", value: 25 },
  ];
  const categoryOnlySchema = z.object({
    name: z.string().min(4, "Category name is required"),
  });

  const form = useForm({
    defaultValues: {},
    resolver: zodResolver(categoryOnlySchema),
  });

  const categorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    address: z.string().min(1, "Address is required"),
    contact: z.string().min(1, "Contact is required"),
    category_id: z.coerce.number({ message: "Category ID must be a number" }),
    assign_to: z.coerce.number({ message: "Assign To must be a number" }),
    time: z.string().min(1, "Time is required"),
    status: z.string().min(1, "Status is required"),
  });

  const {
    register: categoryRegister,
    handleSubmit: handleCategorySubmit,
    reset: categoryReset,
    formState: { errors: categoryErrors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const handleConfirm = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Data Submitted Successfully!");
      setAddConfrom(false);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const onValidCategorySubmit = async (data) => {
    const payload = {
      ...data,
      phone_number: data.contact,
    };
    delete payload.contact;

    try {
      const response = await dispatch(AddLeads(payload));
      if (response.meta.requestStatus === "fulfilled") {
        console.log("Lead added successfully!");
        setLeadModalStatus(false);
      } else {
        console.error("Failed to add lead:", response.error);
      }
    } catch (err) {
      console.error("Error adding lead:", err);
    }
  };

  const handlecategory = (data) => {
    console.log("Category Data:", data);
    setCategoryModalStatus(false);
    setAddConfrom(true);
    categoryReset();
    dispatch(createCategory(data));
  };

  const onInvalidCategorySubmit = (errors) => {
    console.log("Validation Errors:", errors);
  };

  const handleSubmitLead = () => {
    dispatch(changestatusLeads(MYaddLeads));
  };

  const newArray = categories.map((value) => ({
    label: value.name,
    value: value.id,
  }));

  const newArray2 = assignToList.map((value) => ({
    label: value.first_name,
    value: value.id,
  }));

  const handleSearch = () => {
    const payload = {
      name: searchQuery,
      email: searchQuery,
      phone_number: searchQuery,
      assign_to: searchQuery,
      category_id: searchQuery,
      status: searchQuery,
    };
    dispatch(searchLeads(payload));
  };

  useEffect(() => {
    dispatch(changestatusLeads());
    // dispatch(getallLeads());
    dispatch(getAllCategory());
    dispatch(getAllAssignto());
  }, [dispatch]);

  useEffect(() => {
    // console.log(MYaddLeads, "MYaddLeads Updated");
  }, [MYaddLeads]);

  useEffect(() => {
    dispatch(getallLeads(searchQuery));
    // dispatch(searchLeads(searchQuery));
  }, [searchQuery]);
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
                      Total Leads:{" "}
                      {data3.reduce((acc, curr) => acc + curr.value, 0)}
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
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
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
              <input
                type="text"
                name="search"
                placeholder="Search Name "
                value={searchQuery.name}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, name: e.target.value })
                }
                className="p-2 border rounded-md 
             bg-white text-black placeholder-gray-500 
             dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 
             border-gray-300 dark:border-gray-600 
             focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{category}All category</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Categoriesygy</DropdownMenuItem>
                  {Array.isArray(categories) &&
                    categories.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={(e) =>
                          setSearchQuery({
                            ...searchQuery,
                            category_id: parseInt(item.id),
                          })
                        }
                      >
                        {item.name}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {searchQuery.status || "Select Status"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() =>
                      setSearchQuery((prev) => ({
                        ...prev,
                        status: "All Status",
                      }))
                    }
                  >
                    All Status
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      setSearchQuery((prev) => ({ ...prev, status: "Hot" }))
                    }
                  >
                    Hot
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      setSearchQuery((prev) => ({
                        ...prev,
                        status: "Inconservation",
                      }))
                    }
                  >
                    Inconservation
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      setSearchQuery((prev) => ({
                        ...prev,
                        status: "Converted",
                      }))
                    }
                  >
                    Converted
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      setSearchQuery((prev) => ({ ...prev, status: "Droped" }))
                    }
                  >
                    Droped
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

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

                  <Form {...form}>
                    <form
                      onSubmit={handleCategorySubmit(
                        onValidCategorySubmit,
                        onInvalidCategorySubmit
                      )}
                      className="space-y-4"
                    >
                      {[
                        {
                          name: "name",
                          label: "Name",
                          placeholder: "Enter name",
                          type: "text",
                        },
                        {
                          name: "email",
                          label: "Email",
                          placeholder: "Enter email",
                          type: "text",
                        },
                        {
                          name: "address",
                          label: "Address",
                          placeholder: "Enter address",
                          type: "text",
                        },
                        {
                          name: "contact",
                          label: "Contact",
                          placeholder: "Enter contact",
                          type: "text",
                        },
                        {
                          name: "category_id",
                          label: "Category ID",
                          type: "select",
                          options: newArray,
                        },
                        {
                          name: "assign_to",
                          label: "Assign To",
                          type: "select",
                          options: newArray2,
                        },
                        {
                          name: "time",
                          label: "Time",
                          placeholder: "HH:MM:SS",
                          type: "text",
                        },
                        {
                          name: "status",
                          label: "Status",
                          type: "select",
                          options: [
                            { label: "Hot", value: "Hot" },
                            { label: "Droped", value: "Droped" },
                            {
                              label: "Inconservation",
                              value: "Inconservation",
                            },
                            { label: "Converted", value: "Converted" },
                          ],
                        },
                      ].map(({ name, label, placeholder, type, options }) => (
                        <FormField
                          key={name}
                          control={form.control}
                          name={name}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{label}</FormLabel>
                              <FormControl>
                                {type === "select" ? (
                                  <select
                                    {...field}
                                    {...categoryRegister(name)}
                                    className="w-full border rounded p-2 bg-white text-black dark:bg-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  >
                                    {options.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <Input
                                    placeholder={placeholder}
                                    {...categoryRegister(name)}
                                    className="w-full border rounded p-2 bg-white text-black dark:bg-black dark:text-white"
                                  />
                                )}
                              </FormControl>
                              {categoryErrors[name] && (
                                <p className="text-sm text-red-500">
                                  {categoryErrors[name]?.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                      ))}

                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              {/* Add Category */}
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
                        <TableCell>{item.category.name}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.Employee.first_name}</TableCell>
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
                                        Converted
                                      </option>
                                      <option value="Sales">Hot</option>
                                      <option value="Marketing">
                                        In Conversation
                                      </option>
                                      <option value="Support">Dropped</option>
                                    </select>

                                    <Button
                                      className="mt-4"
                                      onClick={handleSubmit}
                                    >
                                      Submit
                                    </Button>
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
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>

                <span className="text-base font-semibold text-gray-800 dark:text-white">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
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
