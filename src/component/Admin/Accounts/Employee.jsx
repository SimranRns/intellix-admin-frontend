import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card";
import { CreditCard, Search } from "lucide-react";
import { Button } from "../../src/components/ui/Button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../src/components/ui/pagination";
import { useNavigate } from "react-router";

const Employee = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const EmployeeList = [
        { id: 1, Department: "Teaching", Amount: 301498, Users: "19", link: "/Department_list_Employee" },
        { id: 2, Department: "Accounts", Amount: 201350, Users: "12", link: "/Department_list_Employee" }, 
        { id: 1, Department: "Hr", Amount: 301498, Users: "19", link: "/Department_list_Employee" },
        { id: 2, Department: "IT", Amount: 201350, Users: "12", link: "/Department_list_Employee" },
        { id: 1, Department: "Teaching", Amount: 301498, Users: "19", link: "/Department_list_Employee" },
        { id: 2, Department: "Accounts", Amount: 201350, Users: "12", link: "/Department_list_Employee" },
        { id: 1, Department: "Teaching", Amount: 301498, Users: "19", link: "/Department_list_Employee" },
        { id: 2, Department: "Accounts", Amount: 201350, Users: "12", link: "/Department_list_Employee" },
    ];

    useEffect(() => {
        const finalAmount = EmployeeList.reduce((acc, emp) => acc + emp.Amount, 0);
        const duration = 1000;
        const step = Math.ceil(finalAmount / (duration / 50));
        
        let start = 0;
        const counter = setInterval(() => {
            start += step;
            if (start >= finalAmount) {
                start = finalAmount;
                clearInterval(counter);
            }
            setTotalAmount(start);
        }, 50);
    }, []);

    const EmployeesPerPage = 6;
    const totalPages = Math.ceil(EmployeeList.length / EmployeesPerPage);
    const startIndex = (currentPage - 1) * EmployeesPerPage;
    const selectedEmployee = EmployeeList.slice(startIndex, startIndex + EmployeesPerPage);

    return (
        <div className="flex flex-col items-center min-h-screen p-4 space-y-6">
            {/* Total Amount Card */}
            <div className="w-full">
                <Card className="w-full p-4 shadow-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold text-center">Total Amount</CardTitle>
                        <CreditCard className="w-8 h-8 text-blue-600" />
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <span className="text-3xl font-bold text-blue-600">
                            ₹ {totalAmount.toLocaleString()}
                        </span>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <CardDescription className="text-gray-700 font-bold dark:text-gray-500">Updated Amount</CardDescription>
                    </CardFooter>
                </Card>
            </div>

            {/* Search Bar */}
            <div className="w-full rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 gap-3">
                <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-auto sm:w-full sm:max-w-md">
                    <Search size={18} className="text-gray-500" />
                    <input type="text" placeholder="By Department Name..." className="ml-2 w-full outline-none bg-transparent" />
                </div>
            </div>

            {/* Employee Cards */}
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {selectedEmployee.map((emp) => (
                    <Card key={emp.id} className="w-full max-w-xs sm:max-w-sm mx-auto shadow-md shadow-blue-300/20 rounded-xl p-4">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-blue-600">
                                Department : {emp.Department}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-gray-500">
                                <span className="font-semibold">Amount :</span> ₹ {emp.Amount.toLocaleString()}
                            </p>
                            <p className="text-gray-500">
                                <span className="font-semibold">Users :</span> {emp.Users}
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center space-y-2">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition" onClick={() => navigate(emp.link)}>
                        Department List
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
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
        </div>
    );
};

export default Employee;
