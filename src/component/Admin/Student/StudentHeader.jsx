import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  Delete,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu";
import { Button } from "../../src/components/ui/Button";
import { SidebarInset, SidebarProvider } from "../../src/components/ui/sidebar";
import { Checkbox } from "../../src/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import Header from "../Dashboard/Header";
import AppSidebar from "../../src/components/ui/app-sidebar";
import Add_Payment from "./Add_Payment";
import { getStudents, updateStudentsRt, updateStudentStatus } from "../../../Redux_store/Api/StudentsApiStore";
import { get_Batches } from "../../../Redux_store/Api/Batches";

const PAGE_SIZE = 10;

const StudentHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedialog, setDeletedialog] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error, total } = useSelector(
    (state) => state.students
  );
  const {
    Batches: batches = [],
    loading: batchesLoading,
    error: batchesError,
  } = useSelector((state) => state.Batch);

  // Fetch students and batches
  useEffect(() => {
    dispatch(
      getStudents({
        page: currentPage,
        limit: PAGE_SIZE,
        name: searchQuery,
      })
    );
    dispatch(get_Batches());
  }, [dispatch, currentPage, searchQuery]);

  // Calculate total pages
  const totalPages = Math.ceil(total / PAGE_SIZE) || 3;

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    setCurrentPage(1); // Reset to first page on search
  };

  // Handle profile click to navigate to profile page
  const handleViewProfile = (id) => {
    navigate(`/view/profile/${id}`);
  };

  // Function to get batch name from batch ID
  const getBatchName = (batchId) => {
    // Assuming batches is an array of objects with id and BatchesName
    const batch = batches.find((b) => b.id === batchId);
    // console.log(batchId);
    return batch ? batch.BatchesName : "Unknown Batch";
  };

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="min-h-screen flex flex-col">
            <div className="w-full shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 mt-5">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
                <Search size={18} />
                <input
                  type="text"
                  style={{ backgroundColor: "transparent" }}
                  placeholder="Search here..."
                  className="ml-2 w-full focus:outline-none focus:ring-0"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="flex items-center space-x-1 sm:space-x-3 mt-3 md:mt-0">
                <Button
                  onClick={() => navigate("/ExStudents")}
                  className="bg-blue-500 text-white font-semibold px-1 sm:px-5 py-2 rounded-lg hover:bg-blue-700 hover:opacity-90"
                >
                  Ex-Student
                </Button>
                <Button
                  onClick={() => navigate("/Marksheet")}
                  className="bg-blue-500 text-white font-semibold px-1 sm:px-5 py-2 rounded-lg hover:bg-blue-700 hover:opacity-90"
                >
                  Marksheet
                </Button>
                <Button
                  onClick={() => navigate("/StudentUploadModal")}
                  className="bg-blue-500 text-white font-semibold px-1 sm:px-5 py-2 rounded-lg hover:bg-blue-700 hover:opacity-90"
                >
                  + Add Excel
                </Button>
                <Button
                  onClick={() => navigate("/add_student_model")}
                  className="bg-blue-500 text-white font-semibold px-1 sm:px-5 py-2 rounded-lg hover:bg-blue-700 hover:opacity-90"
                >
                  + Add Student
                </Button>
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  RT
                </label>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : students?.length === 0 ? (
                <div className="text-center mt-5">No students found</div>
              ) : (
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
                    {students?.data?.map((student) => {
                      const batchName = student.Batch.BatchesName; // Use batchId or the correct field from student
                      return (
                        <TableRow
                          key={student.id}
                          className="hover:bg-transparent"
                        >
                          <TableCell className="text-blue-600 font-medium">
                            {student.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                              <span className="font-medium">
                                {student.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="block md:inline">
                              {student.father_name}
                            </span>
                          </TableCell>
                          <TableCell>{batchName}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button>Add Payment</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[825px]">
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
                                <MoreVertical
                                  className="cursor-pointer"
                                  size={20}
                                />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56">
                                <DropdownMenuGroup>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleViewProfile(student.id)
                                    }
                                  >
                                    Profile
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
                                  <DropdownMenuItem
                                    onClick={() => {
                                      dispatch(updateStudentsRt(student.id))
                                      dispatch(getStudents())
                                    }}
                                  >Mark as RT</DropdownMenuItem>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <Dialog
                                      open={deletedialog}
                                      onOpenChange={setDeletedialog}
                                    >
                                      <DialogTrigger
                                        open={deletedialog}
                                        onOpenChange={setDeletedialog}
                                        onClick={() => setDeletedialog(student.id)}
                                      >
                                        Delete
                                      </DialogTrigger>
                                      <DialogContent
                                        onPointerDownOutside={(e) =>
                                          e.preventDefault()
                                        }
                                        onEscapeKeyDown={(e) =>
                                          e.preventDefault()
                                        }
                                        className="sm:max-w-[425px]"
                                      >
                                        <DialogHeader>
                                          <DialogTitle className="text-center mb-3">
                                            Delete Student
                                          </DialogTitle>
                                          <DialogDescription className="text-center">
                                            Are you sure you want to delete
                                            student?
                                          </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="flex justify-between">
                                          <Button
                                            onClick={() =>
                                              setDeletedialog(false)
                                            }
                                            variant="outline"
                                          >
                                            Cancel
                                          </Button>
                                          <Button className="bg-green-600 hover:bg-green-700 text-white"
                                            onClick={() => { dispatch(updateStudentStatus(student.id)) }

                                            }
                                          >
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
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-end space-x-3 mt-5 w-full pr-8">
              <Button
                variant="ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="hover:bg-transparent hover:text-inherit"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 ${currentPage === page
                      ? "bg-[#3d3690] text-white"
                      : "bg-gray-100 text-gray-700"
                      } rounded-lg hover:bg-transparent hover:text-inherit`}
                  >
                    {page}
                  </Button>
                )
              )}

              <Button
                variant="ghost"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="hover:bg-transparent hover:text-inherit"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default StudentHeader;
