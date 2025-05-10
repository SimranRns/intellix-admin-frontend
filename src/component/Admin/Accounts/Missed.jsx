import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
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
import { get_Batches } from "../../../Redux_store/Api/Batches";

// Constants
const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const YEARS = ["2023", "2024", "2025"];
const ROWS_PER_PAGE = 10;

const Missed = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.emis || {});
  const { Batches: batches = [], loading: batchesLoading, error: batchesError } = useSelector(
    (state) => state.Batch || {}
  );
  const date = new Date();

  // State for filters and pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [month, setMonth] = useState(String(date.getMonth() + 1).padStart(2, "0"));
  const [year, setYear] = useState(date.getFullYear().toString());

  // Calculate total pages

  // Fetch data
  useEffect(() => {
    dispatch(getEmis({ filter: "missed", month, year }));
    if (!batches.length) dispatch(get_Batches());
  }, [dispatch, month, year, batches.length]);

  // Go back to previous page
  const goBack = () => {
    window.history.back();
  };

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );

  // Debounced page reset for filters
  const handlePageReset = useCallback(
    debounce(() => {
      setCurrentPage(1);
    }, 300),
    []
  );

  // Create batch lookup map for performance
  const batchMap = useMemo(() => {
    return batches.reduce((map, batch) => {
      map[batch.batch_id] = batch.batchesName;
      return map;
    }, {});
  }, [batches]);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    if (!Array.isArray(data?.missed)) return [];
    const searchLower = search.toLowerCase();
    return data.missed
      .map((item) => ({
        ...item,
        batchName: batchMap[item.batch_id] || "-",
      }))
      .filter(
        (item) =>
          item.student_id?.toString().toLowerCase().includes(searchLower) ||
          item.batchName?.toLowerCase().includes(searchLower)
      );
  }, [data?.missed, batchMap, search]);


  const totalPages = Math.ceil((filteredData.length || 0) / ROWS_PER_PAGE);

  // Pagination
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ROWS_PER_PAGE);

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
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm flex items-center gap-2"
                onClick={goBack}
              >
                <ArrowLeft size={18} />
                <span className="hidden md:inline">Back to Student Account</span>
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
                  handlePageReset();
                }}
                className="border border-blue-300  bg-transparent rounded-lg px-3 py-2 text-sm"
                aria-label="Select Month"
              >
                {MONTHS.map((m) => (
                  <option className="text-black" key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  handlePageReset();
                }}
                className="border border-blue-300 bg-transparent rounded-lg px-3 py-2 text-sm"
                aria-label="Select Year"
              >
                {YEARS.map((y) => (
                  <option className=" text-black" key={y} value={y}>
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
                placeholder="By Batch Name or Student ID..."
                onChange={(e) => handleSearch(e.target.value)}
                className="ml-2 w-full outline-none bg-transparent text-sm"
                aria-label="Search by Batch Name or Student ID"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-lg mt-6 p-5  shadow">
            {loading || batchesLoading ? (
              <div className="text-center p-4">Loading...</div>
            ) : error || batchesError ? (
              <div className="text-center p-4 text-red-500">
                Error: {error || batchesError || "An unexpected error occurred."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full" aria-label="Missed Batches Table">
                  <thead className="bg-gray-200 dark:bg-gray-900">
                    <tr>
                      <th className="p-3 border" scope="col">
                        ID
                      </th>
                      <th className="p-3 border" scope="col">
                        Batch Name
                      </th>
                      <th className="p-3 border" scope="col">
                        Students
                      </th>
                      <th className="p-3 border" scope="col">
                        Amount
                      </th>
                      <th className="p-3 border" scope="col">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((row) => (
                        <tr
                          key={row.id}
                          className="text-center hover:bg-gray-50 transition"
                        >
                          <td className="p-3 border">{row.id || "-"}</td>
                          <td className="p-3 border">{row.batchName || "-"}</td>
                          <td className="p-3 border">{row.student_id || "-"}</td>
                          <td className="p-3 border font-semibold">{row.amount || "-"}</td>
                          <td className="p-3 border">
                            <Button
                              className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md"
                              aria-label={`View details for batch ${row.id}`}
                            >
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
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                      aria-label="Previous Page"
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
                            : "hover:bg-blue-600 hover:text-white"
                        }`}
                        aria-label={`Page ${i + 1}`}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={
                        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                      }
                      aria-label="Next Page"
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