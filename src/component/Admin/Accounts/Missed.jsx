import React, { useState } from "react";
import AppSidebar from "../../src/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../src/components/ui/sidebar";
import Header from "../Dashboard/Header";
import { Button } from "../../src/components/ui/button"; 
import { ArrowLeft, Search } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../src/components/ui/pagination";

const Missed = () => {
    const goBack = () => {
        window.history.back();
    };

    // Sample Data - Simulating 30 rows
    const [data, setData] = useState(
        Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            batch: `Batch ${i + 1}`,
            students: Math.floor(Math.random() * 50) + 10,
            amount: `₹${(Math.random() * 10000 + 2000).toFixed(2)}`,
        }))
    );

    // Search State
    const [search, setSearch] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; // Show 10 rows per page
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Filter Data Based on Search
    const filteredData = data.filter((item) =>
        item.batch.toLowerCase().includes(search.toLowerCase())
    );

    // Paginate Data
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

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
                                <span className="hidden md:inline">Back to Account</span>
                            </Button>
                            <span className="text-white font-bold px-4 py-2 rounded-md text-sm flex items-center gap-2">Missed Batches</span>
                        </div>

                        {/* Search Bar */}
                        <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
                            <Search size={18} className="text-gray-500" />
                            <input
                                name="search"
                                type="text"
                                placeholder="By Employee Name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="ml-2 w-full outline-none bg-transparent text-sm"
                            />
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="rounded-lg mt-6 p-5">
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
                                            <tr key={row.id} className="text-center transition">
                                                <td className="p-3 border">{row.id}</td>
                                                <td className="p-3 border">{row.batch}</td>
                                                <td className="p-3 border">{row.students}</td>
                                                <td className="p-3 border font-semibold">{row.amount}</td>
                                                <td className="p-3 border">
                                                    <Button className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md">
                                                        Details
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center p-4 text-gray-500 font-semibold">
                                                No records found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
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
                                            className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                href="#"
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`px-4 py-2 rounded-md ${currentPage === i + 1
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
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            className={`${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
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
