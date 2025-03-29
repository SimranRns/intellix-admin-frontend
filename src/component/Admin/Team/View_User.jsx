import React, { useState } from "react";
import "./Team.css"
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
import { ArrowLeft, Search, } from "lucide-react";
import { Button } from "../../src/components/ui/Button";
import { useNavigate } from "react-router-dom";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../src/components/ui/pagination";
import { Card, CardHeader, CardTitle, CardContent, } from "../../src/components/ui/card";

const View_User = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const UserList = [
        {
            id: 1,
            Name: "Ssss",
            Email: "Ssss@gmail.com",
            Join_Data: "07-02-2024",
            Department: "Teaching"

        },
        {
            id: 2,
            Name: "Ffff",
            Email: "Ffff@gmail.com",
            Join_Data: "07-02-2024",
            Department: "Teaching"

        },
        {
            id: 1,
            Name: "Ssss",
            Email: "Ssss@gmail.com",
            Join_Data: "07-02-2024",
            Department: "Teaching"

        },
        {
            id: 2,
            Name: "Ffff",
            Email: "Ffff@gmail.com",
            Join_Data: "07-02-2024",
            Department: "Teaching"

        },
        {
            id: 1,
            Name: "Ssss",
            Email: "Ssss@gmail.com",
            Join_Data: "07-02-2024",
            Department: "Teaching"

        },
        {
            id: 2,
            Name: "Ffff",
            Email: "Ffff@gmail.com",
            Join_Data: "07-02-2024",
            Department: "Teaching"

        },
        {
            id: 1,
            Name: "Ssss",
            Email: "Ssss@gmail.com",
            Join_Data: "07-02-2024",
            Department: "Teaching"

        },
        {
            id: 2,
            Name: "Ffff",
            Email: "Ffff@gmail.com",
            Join_Data: "07-02-2024",
            Department: "Teaching"

        },
        {
            id: 1,
            Name: "Ssss",
            Email: "Ssss@gmail.com",
            Join_Data: "07-02-2024",
            Department: "Teaching"

        },
        {
            id: 2,
            Name: "Ffff",
            Email: "Ffff@gmail.com",
            Join_Data: "07-02-2024",
            Department: "Teaching"

        },

    ];
    const UserPerPage = 12;
    const totalPages = Math.ceil(UserList.length / UserPerPage);
    const startIndex = (currentPage - 1) * UserPerPage;
    const selectedUser = UserList.slice(startIndex, startIndex + UserPerPage);
    return (
        <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
            {/* Pass setActivePage to Sidebar */}
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="flex-1 overflow-auto">
                    <div className="w-full shadow-md shadow-blue-300/30 rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 mt-6 gap-3">
                        {/* Back Button (Responsive) */}
                        <Button
                            className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft size={18} />
                            <span className="hidden md:inline">Back to Department</span>
                        </Button>

                        {/* Search Bar (Responsive) */}
                        <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-auto sm:w-full sm:max-w-md">
                            <Search size={18} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="By Employee Name..."
                                className="ml-2 w-full outline-none bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                        {selectedUser.map((user) => (
                            <Card
                                key={user.id}
                                className="w-auto max-w-sm shadow-md shadow-blue-500/50 rounded-xl p-2 mx-auto"
                            >
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-blue-600">
                                        Name : {user.Name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <p className="text-gray-500">
                                        <span className="font-semibold">Email :</span> {user.Email}
                                    </p>
                                    <p className="text-gray-500">
                                        <span className="font-semibold">Join Date :</span> {user.Join_Data}
                                    </p>
                                    <p className="text-gray-500">
                                        <span className="font-semibold">Department :</span> {user.Department}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </main>
                <Pagination>
                    <PaginationContent>
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

            </SidebarInset>
        </SidebarProvider>
    );
};

export default View_User;
