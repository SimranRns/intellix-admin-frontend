import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card";
import { ArrowLeft, CreditCard, Search, } from "lucide-react";
import { Button } from "../../src/components/ui/Button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../src/components/ui/pagination";
import { useNavigate } from "react-router";

const Employee = () => {
    const [amounts, setAmounts] = useState({
        total: 0,
    });
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const EmployeeList = [
        {
            id: 1,
            Department: "Teaching",
            Amount: "301498",
            Users: "19",
            link: ""
        },
        {
            id: 1,
            Department: "Accounts",
            Amount: "301498",
            Users: "19",
            link: ""
        },



    ];
    const Employee = 6;
    const totalPages = Math.ceil(EmployeeList.length / Employee);
    const startIndex = (currentPage - 1) * Employee;
    const selectedEmployee = EmployeeList.slice(startIndex, startIndex + Employee);

    useEffect(() => {
        const finalValues = {
            total: 20000,

        };

        const duration = 5000;

        Object.keys(finalValues).forEach((key) => {
            let start = 0;
            const end = finalValues[key];
            const stepTime = Math.abs(Math.floor(duration / (end - start)));

            const timer = setInterval(() => {
                start += 500;
                if (start >= end) {
                    start = end;
                    clearInterval(timer);
                }
                setAmounts((prev) => ({ ...prev, [key]: start }));
            }, stepTime);

            return () => clearInterval(timer);
        });
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen p-4 space-y-6">
            {/* Total Amount Card (Upper) */}
            <div className="w-full">
                <Card className="w-full p-4 shadow-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold text-center">Total Amount</CardTitle>
                        <CreditCard className="w-8 h-8 text-blue-600" />
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <span className="text-3xl font-bold text-blue-600">
                            ₹ {amounts.total.toLocaleString()}
                        </span>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <CardDescription className="text-gray-700 font-bold dark:text-gray-500">Updated Amount</CardDescription>
                    </CardFooter>
                </Card>
            </div>


            <div className="w-full rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 gap-3">
                {/* Search Bar (Responsive) */}
                <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-auto sm:w-full sm:max-w-md">
                    <Search size={18} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="By Department Name..."
                        className="ml-2 w-full outline-none bg-transparent"
                    />
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6">
                {selectedEmployee.map((Employee) => (
                    <Card
                        key={Employee.id}
                        className="w-full max-w-xs sm:max-w-sm mx-auto shadow-md shadow-blue-300/20 rounded-xl p-4"
                    >
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-blue-600">
                                Department : {Employee.Department}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-gray-500">
                                <span className="font-semibold">Amount :</span> ₹ {Employee.Amount}
                            </p>
                            <p className="text-gray-500">
                                <span className="font-semibold">Users :</span> {Employee.Users}
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center space-y-2">
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                                onClick={() => navigate(Employee.link)}
                            >
                                Particular Department List
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>



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
        </div>
    );
};

export default Employee;
