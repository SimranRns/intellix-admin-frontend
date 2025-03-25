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
import { ArrowLeft, Ellipsis, Search, User, HandCoins, Clock, Logs } from "lucide-react";
import { Button } from "../../src/components/ui/Button";
import { Navigate, useNavigate } from "react-router-dom";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../src/components/ui/pagination";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../src/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../src/components/ui/avatar";
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
    DialogHeader,
    DialogTitle,
} from "../../src/components/ui/dialog";
import { Input } from "../../src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../src/components/ui/form";

const ExEmployees = () => {
    const navigate = useNavigate();

    // States for Dialogs & Pagination
    const [open, setOpen] = useState(false);
    const [Deleteteacher, setDelete] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const Teachers = [
        {
            id: 1,
            name: "Munaroh Steffani",
            post: "Math Teacher",
            subjects: [
                { subject: "Joined 01-01-2024", icon: Clock },
                { subject: "Assigned 13", icon: Logs },
                { subject: "Completed 3", icon: Logs },
            ],
            image: "https://github.com/shadcn.png",
        },
        {
            id: 2,
            name: "John Doe",
            post: "Physics Teacher",
            subjects: [
                { subject: "Joined 02-01-2024", icon: Clock },
                { subject: "Assigned 15", icon: Logs },
                { subject: "Completed 5", icon: Logs },
            ],
            image: "https://github.com/shadcn.png",
        },

        // Add more dummy teachers here...
    ];

    const [teachersPerPage, setTeachersPerPage] = useState(6); // Change from 10 to 6
    const totalPages = Math.ceil(Teachers.length / teachersPerPage);
    const startIndex = (currentPage - 1) * teachersPerPage;
    const selectedTeachers = Teachers.slice(startIndex, startIndex + teachersPerPage);

    return (
        <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
            <AppSidebar />
            <SidebarInset>
                {/* Header Section */}
                <header className="flex h-16 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    <Header />
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Content Wrapper */}
                <div className="w-full shadow-md rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 mt-6 gap-3">
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
                            placeholder="Search here..."
                            className="ml-2 w-full outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                    {selectedTeachers.map((teacher) => (
                        <Card
                            key={teacher.id}
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
                                        onClick={() => setDelete(true)}
                                        className="cursor-pointer text-red-500 hover:bg-gray-200 px-4 py-2 text-md text-center"
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* dialog box Delete */}
                            <Dialog open={Deleteteacher} onOpenChange={setDelete}>
                                <DialogContent
                                    onPointerDownOutside={(e) => e.preventDefault()}
                                    onEscapeKeyDown={(e) => e.preventDefault()}
                                    className="sm:max-w-[425px] shadow-lg p-6 rounded-lg">
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
                                        src={teacher.image}
                                        alt={teacher.name}
                                    />
                                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="mt-4 text-xl font-bold Teacher_name">
                                    {teacher.name}
                                </CardTitle>
                                <CardDescription>Teacher</CardDescription>
                            </CardHeader>

                            <CardContent className="text-center">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {teacher.subjects.map((item, i) => (
                                        <span
                                            key={i}
                                            className="bg-blue-100 px-3 p-1 rounded-lg text-sm text-blue-500 font-semibold flex items-center gap-1"
                                        >
                                            <item.icon size={16} />
                                            {item.subject}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-center gap-3 mt-5">
                                <Button
                                    className="bg-indigo-600 text-xs text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-indigo-700 transition-all"
                                    onClick={() => Navigate("/View-Profile")}
                                >
                                    <User size={18} /> Profile
                                </Button>
                                <Button
                                    onClick={() => Navigate("/manage_salary")}
                                    className="bg-orange-500 text-xs text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-orange-600 transition-all">
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

export default ExEmployees;
