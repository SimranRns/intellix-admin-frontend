import { useCallback, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

const Received = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.emis || {});
  const date = new Date();
  const [month, setMonth] = useState(String(date.getMonth() + 1).padStart(2, "0"));
  const [year, setYear] = useState(String(date.getFullYear()));
  const [searchInput, setSearchInput] = useState(""); // For controlled input
 // For debounced search
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(getEmis({ filter: "paid", month, year }));
  }, [dispatch, month, year]);

  const handleSearch = useCallback(
    debounce((value) => {
      setComps(value);
      setCurrentPage(1); // Reset to first page on search
    }, 300),
    []
  );

  // Handle input change for controlled input
  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    handleSearch(value);
  };

  // Filter data safely
  const filteredData = Array.isArray(data?.paid)
    ? data.paid.filter((item) =>
        item?.student_id?.toString().toLowerCase().includes(comps.toLowerCase())
      )
    : [];
    console.log(filteredData, "filteredData from paid");


  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Generate dynamic years (e.g., last 5 years and next 2 years)
  const years = Array.from({ length: 8 }, (_, i) => date.getFullYear() - 3 + i);

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto p-4">
          {/* Back Button & Search Bar */}
          <div className="w-full shadow-md shadow-blue-300/30 rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 gap-3">
            <div className="flex items-center gap-3">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
                onClick={() => window.history.back()}
                aria-label="Go back to student account"
              >
                <ArrowLeft size={18} />
                <span className="hidden md:inline">Back to Student Account</span>
              </Button>
              <span className="font-bold px-4 py-2 rounded-md text-sm flex items-center gap-2">
                Received Batches
              </span>
            </div>
            <div className="flex gap-3">
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-blue-300 rounded-lg px-3 py-2 text-sm"
                aria-label="Select month"
              >
                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-blue-300 rounded-lg px-3 py-2 text-sm"
                aria-label="Select year"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" aria-hidden="true" />
              <input
                name="search"
                type="text"
                placeholder="By Employee Name..."
                value={searchInput}
                onChange={onSearchChange}
                className="ml-2 w-full outline-none bg-transparent text-sm"
                aria-label="Search by employee name"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-lg mt-6 p-5">
            {loading ? (
              <div className="text-center p-4 text-gray-500 font-semibold">Loading...</div>
            ) : error ? (
              <div className="text-center p-4 text-red-500 font-semibold">
                Error: {error.message || "Failed to load data"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-200 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="p-3 border text-left">
                        ID
                      </th>
                      <th scope="col" className="p-3 border text-left">
                        Batch Name
                      </th>
                      <th scope="col" className="p-3 border text-left">
                        Students
                      </th>
                      <th scope="col" className="p-3 border text-left">
                        Amount
                      </th>
                      <th scope="col" className="p-3 border text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((row) => (
                        <tr key={row.id} className="text-center hover:bg-gray-50">
                          <td className="p-3 border">{row.id}</td>
                          <td className="p-3 border">{row.batch}</td>
                          <td className="p-3 border">{row.students}</td>
                          <td className="p-3 border font-semibold">{row.amount}</td>
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
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                      aria-disabled={currentPage === 1}
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
                        aria-current={currentPage === i + 1 ? "page" : undefined}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                      aria-disabled={currentPage === totalPages}
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

export default Received;