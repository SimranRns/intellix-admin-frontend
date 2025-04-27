import React, { useState, useEffect, useCallback } from "react";
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


const dummyData = [
  { id: 1, batch: "Batch A", students: 25, amount: 5000 },
  { id: 2, batch: "Batch B", students: 30, amount: 6000 },
  { id: 3, batch: "Batch C", students: 20, amount: 4500 },
  { id: 4, batch: "Batch D", students: 15, amount: 3000 },
  { id: 5, batch: "Batch E", students: 28, amount: 5500 },
  { id: 6, batch: "Batch F", students: 22, amount: 4800 },
  { id: 7, batch: "Batch G", students: 27, amount: 5200 },
  { id: 8, batch: "Batch H", students: 18, amount: 3500 },
  { id: 9, batch: "Batch I", students: 32, amount: 6500 },
  { id: 10, batch: "Batch J", students: 19, amount: 4000 },
  { id: 11, batch: "Batch K", students: 26, amount: 5100 },
];

const Upcoming = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.emis || {});
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch data when month or year changes
  useEffect(() => {
    dispatch(getEmis({ filter: "upcoming", month, year }));
  }, [dispatch, month, year]);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1); // Reset to first page on search
    }, 300),
    []
  );

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    handleSearch(value);
  };

  // Filter data safely (assuming search is by batch name)
  // const filteredData =
  //   data?.upcoming && searchInput
  //     ? data?.upcoming.filter((item) =>
  //         item?.batch?.toLowerCase().includes(searchInput.toLowerCase())
  //       )
  const filteredData = data?.upcoming
    ? data?.upcoming
    : dummyData.filter((item) =>
        item?.batch?.toLowerCase().includes(comps.toLowerCase())
      );

  // console.log(data?.upcoming, "filteredData from upcoming");

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  console.log(paginatedData, "paginatedData from upcoming");
  // Go back to previous page
  const goBack = () => {
    window.history.back();
  };

  // Generate year options dynamically
  const currentYear = date.getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          {/* Back Button & Search Bar */}
          <div className="w-full shadow-md shadow-blue-300/30 rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 gap-3">
            <div className="flex items-center gap-3">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
                onClick={goBack}
              >
                <ArrowLeft size={18} />
                Back to Student Account
              </Button>
              <span className="font-bold px-4 py-2 rounded-md text-sm flex items-center gap-2">
                Upcoming Batches
              </span>
            </div>
            <div className="flex gap-3">
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setCurrentPage(1); // Reset pagination
                }}
                className="border border-blue-300 rounded-lg px-4 pe-1 py-2 text-sm"
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
                className="border border-blue-300 rounded-lg px-4 py-2 text-sm"
              >
                {yearOptions.map((y) => (
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
                placeholder="Search by Batch Name..."
                value={searchInput}
                onChange={onSearchChange}
                className="ml-2 w-full outline-none bg-transparent text-sm"
                aria-label="Search batches by name"
              />
            </div>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="text-center p-4">
              <p>Loading...</p>
            </div>
          )}
          {error && (
            <div className="text-center p-4 text-red-500">
              <p>Error: {error}</p>
            </div>
          )}

          {/* Table Container */}
          {!loading && (
            <div className="rounded-lg mt-6 p-5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="p-3 border">
                        ID
                      </th>
                      <th scope="col" className="p-3 border">
                        Batch Name
                      </th>
                      <th scope="col" className="p-3 border">
                        Students
                      </th>
                      <th scope="col" className="p-3 border">
                        Amount
                      </th>
                      <th scope="col" className="p-3 border">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((row) => (
                        <tr key={row.id} className="text-center transition">
                          <td className="p-3 border">{row.id || "_"}</td>
                          <td className="p-3 border">{row.batch || "_"}</td>
                          <td className="p-3 border">
                            {row.student_id || "_"}
                          </td>
                          <td className="p-3 border font-semibold">
                            {row.amount || "_"}
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
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
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
          {/* {paginatedData.map((r) => {
            return (
              <div
                key={r.id}
                className="text-center p-4 text-gray-500 font-semibold"
              >
                {r.batch}|| {r.student_id}|| {r.amount}
              </div>
            );
          })} */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Upcoming;
