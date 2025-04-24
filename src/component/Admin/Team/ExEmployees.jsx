import React, { useEffect, useState } from "react";
import "./Team.css";
import AppSidebar from "../../src/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../src/components/ui/sidebar";
import Header from "../Dashboard/Header";
import logo from "../../../assets/Image/intellix.png"
import {
  ArrowLeft,
  Ellipsis,
  Search,
  User,
  HandCoins,
  Clock,
  Logs,
} from "lucide-react";
import { Button } from "../../src/components/ui/Button";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../src/components/ui/avatar";
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
import ThankYouCard from "../Dashboard/ThankYouCard";
import { useDispatch, useSelector } from "react-redux";
import { get_ExEmployee, UpdateEmployee } from "../../../Redux_store/Api/ExEmployee";

const ExEmployees = () => {
  const navigate = useNavigate();

  // States for Dialogs & Pagination
  const [ActiveEmployee, setActive] = useState(false);
  const [AddConfrom, setAddConfrom] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch()
  const { ExEmployees, loading, error } = useSelector((state) => state.ExEmployee)
  const [first_name, setEmployeeName] = useState("");
  const handleDelete = async () => {
    try {
      if (selectedEmployeeId) {

        await dispatch(UpdateEmployee({ id: selectedEmployeeId }));
        console.log("Employee deleted successfully:", selectedEmployeeId);
        // setAddConfrom(true);
        setSelectedEmployeeId(null);
        await dispatch(get_ExEmployee())

      } else {
        console.warn("No employee ID selected for deletion");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };



  const employeesPerPage = 10;
  const EmployeeData = ExEmployees?.result?.employees || [];
  const totalPages = Math.ceil(EmployeeData.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;
  const selectedEmployees = EmployeeData.slice(startIndex, startIndex + employeesPerPage);
  useEffect(() => {
    dispatch(get_ExEmployee({ first_name: first_name }))
  }, [first_name])

  if (loading) {
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
      <div className="relative flex  justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        <img
          src={logo}
          alt="Loading"
          className="rounded-full h-28 w-28"
        />
      </div>
    </div>
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      {/* Pass setActivePage to Sidebar */}
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          {/* Content Wrapper */}
          <div className="w-full shadow-md shadow-blue-300/30 rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4  gap-3">
            {/* Back Button (Responsive) */}
            <Button
              className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
              <span className="hidden md:inline">Back to Employees</span>
            </Button>

            {/* Search Bar (Responsive) */}
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-auto sm:w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="By Employee Name..."
                className="ml-2 w-full outline-none bg-transparent"
                value={first_name}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {selectedEmployees?.map((employee) => (
              <Card
                key={employee.id}
                className="w-full max-w-[350px] shadow-sm shadow-blue-500/50 rounded-xl p-6 relative mx-auto"
              >
                {/* Options Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="absolute top-4 right-4 bg-blue-100 p-2 rounded-lg shadow-sm hover:bg-gray-200">
                      <Ellipsis className="text-gray-500" size={24} />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-30 bg-gray-100 mt-1 shadow-md rounded-md"
                  >
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedEmployeeId(employee.id); // store this ID
                        setActive(true);
                      }}
                      className="cursor-pointer text-green-500 hover:bg-gray-200 px-4 py-2 text-md text-center"
                    >
                      Activate Employee
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* dialog box Delete */}
                <Dialog open={ActiveEmployee} onOpenChange={setActive}>
                  <DialogContent
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    className="sm:max-w-[425px] shadow-lg p-6 rounded-lg"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-center text-[29px]">
                        Activate Employee
                      </DialogTitle>
                      <DialogDescription className="text-center text-md">
                        Are you sure you want to activate this employee ?
                      </DialogDescription>
                    </DialogHeader>

                    <hr className="mt-5"></hr>
                    <div className="flex justify-center">
                      <Button
                        onClick={
                          handleDelete
                        }

                        type="submit"
                        className="bg-red-600 text-white px-5 py-5 rounded-lg hover:bg-red-700"
                      >
                        Activate Employee
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Card Content */}
                <CardHeader className="flex flex-col items-center text-center">
                  <Avatar className="shadow-md w-24 h-24 rounded-full">
                    <AvatarImage
                      className="rounded-full  border-4 border-blue-600"
                      src={employee.image || "https://github.com/shadcn.png"}
                      alt={employee.first_name || "teacher"}
                    />
                    <AvatarFallback>{employee.first_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-xl font-bold Employee_name">
                    {employee.first_name}
                  </CardTitle>
                  <CardDescription>{employee.department}</CardDescription>
                </CardHeader>

                <CardContent className="text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    <span
                      className="bg-blue-100 px-3 p-1 rounded-lg text-sm text-blue-500 font-semibold flex items-center gap-1"
                    >
                      <Clock className="w-4 h-4" />
                      {new Date(employee.joining_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </span>

                  </div>
                </CardContent>

                <CardFooter className="flex justify-center gap-3 mt-5">
                  <Button
                    className="bg-indigo-600 text-xs text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-indigo-700 transition-all"
                    onClick={() => navigate("/View-Profile")}
                  >
                    <User size={18} /> Profile
                  </Button>
                  <Button
                    onClick={() => navigate("/manage_salary")}
                    className="bg-orange-500 text-xs text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-orange-600 transition-all"
                  >
                    <HandCoins size={18} /> Manage Salary
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
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
        </main>

        {/* Confrom dilog */}
        {/* <Dialog open={AddConfrom} onOpenChange={setAddConfrom}>
          <DialogContent
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            className="w-full max-w-[90vw] sm:max-w-[400px] p-6 rounded-lg"
          >
            <ThankYouCard />
          
            <DialogFooter className="flex justify-end gap-3">
              <Button
                onClick={() => setAddConfrom(false)}
                variant="outline"
                className="w-full sm:w-auto text-black mt-4 bg-gray-100 hover:bg-gray-200 hover:text-black px-5 py-2 rounded-md flex items-center  transition-all"
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  setAddConfrom(false);
                  await dispatch(get_ExEmployee());
                  setActive(false);
                }}
                className="w-full sm:w-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md flex items-center shadow-md transition-all"
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ExEmployees;
