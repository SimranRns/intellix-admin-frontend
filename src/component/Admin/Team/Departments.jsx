import React, { useEffect, useState } from "react";
import "./Team.css";
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
import { useNavigate } from "react-router-dom";
import { Form, FormMessage } from "../../src/components/ui/form";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../src/components/ui/pagination";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../src/components/ui/card";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../src/components/ui/dialog";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../src/components/ui/chart";
import { LabelList, Pie, PieChart } from "recharts";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../src/components/ui/form";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../src/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ThankYouCard from "../Dashboard/ThankYouCard";
import { get_Deparment, create_department, delete_department } from "../../../Redux_store/Api/Department";
import logo from '../../../assets/Image/intellix.png'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../component/src/components/ui/select";
const formSchema = z.object({
  Department: z.string().min(2, { message: "Department must be at least 2 characters." }),
  access_control: z.number().array().nonempty({ message: "Please select at least one access control" }),
});


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
      color: "hsl(var(--chart-1))",
    },
    old: {
      label: "Old Employees",
      color: "hsl(var(--chart-2))",
    },
    interns: {
      label: "Interns",
      color: "hsl(var(--chart-3))",
    },
  };

  const [DeleteDepartments, setDeleteDepartments] = useState(false);
  const [addDepartment, setAddDepartment] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [AddConfrom, setAddConfrom] = useState(false);
  const [departments, setDepartments] = useState({})
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const [id, setid] = useState(null)
  const dispatch = useDispatch()
  const { Department, loading, error } = useSelector((state) => state.Department || {});

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Department: "",
      access_control: [],
    },
  });

  const { handleSubmit } = form;

  const handleConfirm = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("Data Submitted Successfully!");

      setAddConfrom(false);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };


  const handleAddDepartment = async (data) => {
    try {
      await dispatch(create_department({
        name: data.Department,
        access_control: data.access_control,
      })).unwrap();

      form.reset();
      setAddDepartment(false);
      setAddConfrom(true); // Show confirmation dialog
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await dispatch(delete_department(id)).unwrap(); // Delete without refreshing
      setDeleteDepartments(false); // Close the delete dialog without reloading page
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };


  useEffect(() => {
    dispatch(get_Deparment());
  }, [dispatch]);



  const departmentsPerPage = 6;
  const totalPages = Department?.data ? Math.ceil(Department.data.length / departmentsPerPage) : 1;
  const startIndex = (currentPage - 1) * departmentsPerPage;
  const selectedDepartments = Department?.data?.slice(startIndex, startIndex + departmentsPerPage);


  // if (loading) {
  //   return (
  //     <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
  //       <div className="relative flex  justify-center items-center">
  //         <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
  //         <img
  //           src={logo}
  //           alt="Loading"
  //           className="rounded-full h-28 w-28"
  //         />
  //       </div>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return
  //   <h1>{error}</h1>
  // }
  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      {/* Pass setActivePage to Sidebar */}
      <AppSidebar />
      <SidebarInset>
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="w-full shadow-md shadow-blue-300/30 rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 gap-3">
            <div className="flex items-center gap-3">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={18} />
                <span className="hidden lg:inline">Back to Department</span>
              </Button>
              <Button
                onClick={() => setAddDepartment(true)}
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
              >
                + Add Department
              </Button>
              {/* Add Department Dialog */}
              <Dialog open={addDepartment} onOpenChange={setAddDepartment}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Department</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddDepartment)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="Department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter Department Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="access_control"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Access Control</FormLabel>
                            <FormControl>
                              <Select onValueChange={(value) => field.onChange([Number(value)])}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">Teacher</SelectItem>
                                  <SelectItem value="2">Student</SelectItem>
                                  <SelectItem value="3">Admin</SelectItem>
                                  <SelectItem value="4">Staff</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

            </div>

            {/* Search Bar */}
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search Department..."
                className="ml-2 w-full outline-none bg-transparent text-sm"
              />
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="h-screen flex items-center justify-center text-white">
              <div className="relative flex justify-center items-center">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
                <img
                  src={logo}
                  alt="Loading"
                  className="rounded-full h-28 w-28"
                />
              </div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center mt-10">{error.message}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-6">
              {selectedDepartments?.map((department) => (
                <Card
                  key={department.id}
                  className="w-full max-w-[320px]  shadow-md shadow-blue-500/50 rounded-xl p-6 relative mx-auto"
                >
                  {/* Department Name at the Top */}
                  <CardTitle className="text-lg font-extrabold">
                    {department.departmentName}
                  </CardTitle>

                  {/* Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="absolute top-4 right-4 bg-blue-100 p-2 rounded-lg shadow-sm">
                        <Ellipsis className="text-gray-500" size={24} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-40 mt-1 shadow-md rounded-md"
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedDepartmentId(department.id);
                          setDeleteDepartments(true);
                        }}
                        className="cursor-pointer text-red-500 hover:bg-gray-100 px-4 py-2 text-md text-center "
                      >
                        Deactivate
                      </DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Delete Confirmation Dialog */}
                  <Dialog open={DeleteDepartments} onOpenChange={setDeleteDepartments}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Deactivate Department</DialogTitle>
                        <DialogDescription>Are you sure you want to deactivate?</DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex justify-center mt-4">
                        <Button onClick={() => {
                          handleDeleteDepartment(selectedDepartmentId);
                          setDeleteDepartments(false);
                        }} className="bg-red-600 hover:bg-red-700 text-white">
                          Deactivate
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>


                  <CardHeader className="flex flex-col items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <Users size={24} className="text-blue-500" />
                        <span className="text-lg font-bold">
                          {department.name}
                        </span>
                        {/* <span className="text-sm text-gray-400">
                        {department.access_control}
                      </span> */}
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
                        <ChartTooltip
                          content={
                            <ChartTooltipContent nameKey="count" hideLabel />
                          }
                        />
                        <Pie data={chartData} dataKey="count">
                          <LabelList
                            dataKey="category"
                            className="fill-background"
                            stroke="none"
                            fontSize={9}
                            formatter={(value) =>
                              chartConfig[value]
                                ? chartConfig[value].label
                                : value
                            }
                          />
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </CardContent>

                  {/* Card Footer Buttons */}
                  <CardFooter className="flex justify-center gap-4 mt-1">
                    <Button
                      onClick={() => navigate(`/View_User/${department.id}`)}
                      className="bg-blue-600 text-xs text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-500 transition-all"
                    >
                      <User size={18} /> View User
                    </Button>

                    <Button
                      onClick={() => {
                        navigate("/Access");
                      }}
                      className="bg-orange-500 text-xs text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-orange-600 transition-all"
                    >
                      <Eye size={18} /> Access
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>

        {/* Confrom dilog */}
        <Dialog open={AddConfrom} onOpenChange={setAddConfrom}>
          <DialogContent className="w-full max-w-[90vw] sm:max-w-[400px] p-6 rounded-lg">
            <ThankYouCard />
            {/* Dialog Footer */}
            <DialogFooter className="flex justify-end gap-3">
              <Button
                onClick={() => setAddConfrom(false)}
                variant="outline"
                className="w-full sm:w-auto text-black mt-4 hover:text-black bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-md flex items-center transition-all"
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  await dispatch(get_Deparment()); // Fetch updated department list after confirmation
                  setAddConfrom(false); // Close the dialog after confirmation
                }}
                className="w-full sm:w-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md flex items-center shadow-md transition-all"
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        {Department?.data?.length > departmentsPerPage && (
         <Pagination>
                   <PaginationContent>
                     <PaginationItem>
                       <PaginationPrevious
                         href="#"
                         onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                       />
                     </PaginationItem>
       
                     {Array.from({ length: totalPages }, (_, i) => (
                       <PaginationItem key={i}>
                         <PaginationLink
                           href="#"
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
                         href="#"
                         onClick={() =>
                           setCurrentPage(Math.min(totalPages, currentPage + 1))
                         }
                       />
                     </PaginationItem>
                   </PaginationContent>
                 </Pagination>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Departments;
