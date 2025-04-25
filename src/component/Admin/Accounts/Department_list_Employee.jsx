import React, { useState } from "react";
import AppSidebar from "../../src/components/ui/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "../../src/components/ui/sidebar";
import Header from "../Dashboard/Header";
import { ArrowLeft,Search,} from "lucide-react";
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
import { Card, CardHeader, CardTitle,CardContent, CardFooter } from "../../src/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../src/components/ui/avatar";


const Department_list_Employee = () => {
    const goBack = () => {
        window.history.back();
    };
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const Employees = [
        {
            id: 1,
            name: "Munaroh Steffani",
            salary: "₹ 80000",
            transactions: 5,
            totalAmount: "₹ 217600",
            image: "https://github.com/shadcn.png",
        },
        {
            id: 2,
            name: "John Doe",
            salary: "₹ 80000",
            transactions: 5,
            totalAmount: "₹ 217600",
            image: "https://github.com/shadcn.png",
        },
        {
            id: 1,
            name: "Munaroh Steffani",
            salary: "₹ 80000",
            transactions: 5,
            totalAmount: "₹ 217600",
            image: "https://github.com/shadcn.png",
        },
        {
            id: 2,
            name: "John Doe",
            salary: "₹ 80000",
            transactions: 5,
            totalAmount: "₹ 217600",
            image: "https://github.com/shadcn.png",
        },
        {
            id: 1,
            name: "Munaroh Steffani",
            salary: "₹ 80000",
            transactions: 5,
            totalAmount: "₹ 217600",
            image: "https://github.com/shadcn.png",
        },
        {
            id: 2,
            name: "John Doe",
            salary: "₹ 80000",
            transactions: 5,
            totalAmount: "₹ 217600",
            image: "https://github.com/shadcn.png",
        },
    ];

    const employeesPerPage = 6;
    const totalPages = Math.ceil(Employees.length / employeesPerPage);
    const startIndex = (currentPage - 1) * employeesPerPage;
    const selectedEmployees = Employees.slice(startIndex, startIndex + employeesPerPage);

    return (
        <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="flex-1 overflow-auto">
                    <div className="w-full shadow-md rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4  gap-3">
                        <Button
                            className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
                            onClick={goBack}
                        >
                            <ArrowLeft size={18} />
                            <span className="hidden md:inline">Back to Employees Account</span>
                        </Button>
                        <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-auto sm:w-full sm:max-w-md">
                            <Search size={18} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="By Employee Name..."
                                className="ml-2 w-full outline-none bg-transparent"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                        {selectedEmployees.map((employee) => (
                            <Card key={employee.id} className="w-full max-w-sm shadow-md rounded-2xl ps-6 relative mx-auto shadow-blue-500/50 ">
                                <CardHeader className="flex flex-col items-center text-center">
                                    <Avatar className="shadow-md w-24 h-24 rounded-full">
                                        <AvatarImage className="rounded-full border-4 border-blue-600" src={employee.image} alt={employee.name} />
                                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="mt-4 text-xl font-bold text-gray-600">{employee.name}</CardTitle>
                                </CardHeader>
                                <CardContent className=" space-y-2">
                                    <p className="text-lg font-semibold">Salary : <span className="text-blue-600">{employee.salary}</span></p>
                                    <p className="text-sm font-semibold">Total Transactions : <span className="">{employee.transactions}</span></p>
                                    <p className="text-sm font-semibold">Total Amount : <span className="">{employee.totalAmount}</span></p>
                                </CardContent>
                                <CardFooter className="mt-4 flex justify-center">
                                    <Button
                                    onClick={()=>{navigate("/manage_salary")}}
                                    variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                                        View Transactions
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1} />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink as="button" onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? "bg-blue-600 text-white" : "hover:bg-blue-500 hover:text-white"}`}>
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Department_list_Employee;