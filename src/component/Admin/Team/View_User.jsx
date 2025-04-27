import React, { useEffect, useState } from "react";
import "./Team.css";
import AppSidebar from "../../src/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../src/components/ui/sidebar";
import Header from "../Dashboard/Header";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "../../src/components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../src/components/ui/pagination";
import { Card, CardHeader, CardTitle, CardContent } from "../../src/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { view_department_users } from "../../../Redux_store/Api/Department";
import logo from "../../../assets/Image/intellix.png";

const View_User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: urlId } = useParams(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { Department, loading, error } = useSelector((state) => state.Department);

  useEffect(() => {
    if (urlId) {
      dispatch(view_department_users({ id: Number(urlId) })); 
    }
  }, [dispatch, urlId]);

  const departmentId = Number(urlId);
  const employees = Array.isArray(Department) ? Department : Department?.users || [];
  const filteredEmployees = employees.filter((user) =>
    user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const UserPerPage = 12;
  const totalPages = Math.ceil(filteredEmployees.length / UserPerPage);
  const startIndex = (currentPage - 1) * UserPerPage;
  const selectedUser = filteredEmployees.slice(startIndex, startIndex + UserPerPage);

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          {/* Top Header */}
          <div className="w-full shadow-md shadow-blue-300/30 rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 gap-3">
            <Button
              className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
              <span className="hidden md:inline">Back to Department</span>
            </Button>

            {/* Search Input */}
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-auto sm:w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="By Employee Name..."
                className="ml-2 w-full outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); 
                }}
              />
            </div>
          </div>

          {/* Loading, Error or Cards */}
           {/* {loading ? (
                    <div className="h-screen w-full flex items-center justify-center text-white">
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
                    <div>Error: {error?.message ? (
                      <div className="text-red-700"> {error.message}</div>
                    ) : ""}</div>
                  ) : ( */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {selectedUser.length > 0 ? (
                selectedUser.map((user) => (
                  <Card
                    key={user.id}
                    className="w-auto max-w-sm shadow-md shadow-blue-500/50 rounded-xl p-2 mx-auto"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-blue-600">
                        Name: {user.first_name || "No Name"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-500">
                        <span className="font-semibold">Email:</span> {user.email || "N/A"}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-semibold">Join Date:</span>{" "}
                        {user.joining_date ? new Date(user.joining_date).toLocaleDateString() : "N/A"}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-semibold">Qualification:</span>{" "}
                        {user.highest_qualification || "N/A"}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-semibold">Department ID:</span> {departmentId}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 text-lg">
                  No Users Found
                </div>
              )}
            </div>
          {/* )} */}
         
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent className="flex justify-center mt-6 mb-4">
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
                      className={`px-4 py-2 rounded-md ${
                        currentPage === i + 1
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
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default View_User;
