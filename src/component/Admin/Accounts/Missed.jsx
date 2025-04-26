import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash"; // Import lodash for debouncing
import AppSidebar from "../../src/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../src/components/ui/sidebar";
import Header from "../Dashboard/Header";
import { Button } from "../../src/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../src/components/ui/pagination";
import { getEmis } from "../../../Redux_store/Api/EmisApiStore";

// Missed Component
const Missed = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.emis || {}); // Fallback to empty object
  const date = new Date();

  // State for filters and pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [month, setMonth] = useState(date.getMonth() + 1); // Dynamic month filter
  const [year, setYear] = useState(date.getFullYear()); // Dynamic year filter
  const rowsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(
    (Array.isArray(data) ? data.length : 0) / rowsPerPage
  );

  // Fetch data dynamically based on filters
  useEffect(() => {
    dispatch(getEmis({ filter: "missed", month, year }));
  }, [dispatch, month, year]);
  const filter = "missed";
  // Debounced search handler
  const handleSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setCurrentPage(1); // Reset to first page on search
    }, 300),
    []
  );

  // Go back to previous page
  const goBack = () => {
    window.history.back();
  };

  // Filter data based on search
  const filteredData = Array.isArray(data?.missed)
    ? data.missed.filter((item) =>
        item?.student_id
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];
  console.log(filteredData, "filteredData from missed");

  // Paginate data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto p-4">
          {/* Filters & Search Bar */}
          <div className="w-full shadow-md shadow-blue-300/30 rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 gap-3">
            <div className="flex items-center gap-3">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
                onClick={goBack}
              >
                <ArrowLeft size={18} />
                <span className="hidden md:inline">
                  Back to Student Account
                </span>
              </Button>
              <span className="font-bold px-4 py-2 rounded-md text-sm flex items-center gap-2">
                Missed Batches
              </span>
            </div>

            {/* Dynamic Filters */}
            <div className="flex gap-3">
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setCurrentPage(1); // Reset pagination
                }}
                className="border border-blue-300 rounded-lg px-3 py-2 text-sm"
              >
                {[
                  "01",
                  "02",
                  "03",
                  "04",
                  "05",
                  "06",
                  "07",
                  "08",
                  "09",
                  "10",
                  "11",
                  "12",
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setCurrentPage(1); // Reset pagination
                }}
                className="border border-blue-300 rounded-lg px-3 py-2 text-sm"
              >
                {["2023", "2024", "2025"].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Bar */}
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                name="search"
                type="text"
                placeholder="By Batch Name..."
                onChange={(e) => handleSearch(e.target.value)}
                className="ml-2 w-full outline-none bg-transparent text-sm"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-lg mt-6 p-5 bg-white shadow">
            {loading ? (
              <div className="text-center p-4">Loading...</div>
            ) : error ? (
              <div className="text-center p-4 text-red-500">Error: {error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200 dark:bg-gray-900">
                    <tr>
                      <th className="p-3 border">ID</th>
                      <th className="p-3 border">Batch Name</th>
                      <th className="p-3 border">Students</th>
                      <th className="p-3 border">Amount</th>
                      <th className="p-3 border">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((row) => (
                        <tr
                          key={row.id}
                          className="text-center hover:bg-gray-50 transition"
                        >
                          <td className="p-3 border">{row.id}</td>
                          <td className="p-3 border">{row.batch || "-"}</td>
                          <td className="p-3 border">
                            {row.student_id || "-"}
                          </td>
                          <td className="p-3 border font-semibold">
                            {row.amount}
                          </td>
                          <td className="p-3 border">
                            <Button className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md">
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-4 text-gray-500 font-semibold"
                        >
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && !loading && !error && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
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
                      href="#"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Missed;
