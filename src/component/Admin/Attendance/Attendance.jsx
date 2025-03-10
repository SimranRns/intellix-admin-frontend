import React from "react";
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import Header from "../Dashboard/Header";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../src/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../src/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../src/components/ui/table";
import { z } from "zod";
import { Button } from "../../src/components/ui/Button";
   
// Attendance Data (Example)
const attendanceData = [
    {
        id: 1,
        name: "Fahimur Rahman",
        attendance: ["P", "P", "A", "A", "P", "-", "P", "P", "A", "P"],
    },
    {
        id: 2,
        name: "Richi Akon",
        attendance: ["P", "A", "P", "P", "A", "-", "P", "P", "P", "P"],
    },
    {
        id: 3,
        name: "John Doe",
        attendance: ["P", "A", "P", "P", "A", "-", "P", "P", "P", "P"],
    },
];

const formSchema = z.object({
    class: z.string().min(1, { message: "Class is required." }),
    section: z.string().min(1, { message: "Section is required." }),
    month: z.string().min(1, { message: "Month is required." }),
    year: z.string().min(1, { message: "Year is required." }),
});

const totalDays = 30;

const Attendance = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            class: "One",
            section: "A",
            month: "April",
            year: "2025",
        },
    });

    return (
        <SidebarProvider style={{ "--sidebar-width": "19rem" }}>
            <AppSidebar />
            <SidebarInset>
                {/* Header */}
                <header className="flex h-16 items-center gap-2 px-4 border-b">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">{<Header />}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Student Attendance</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Attendance Form */}
                <div className="m-5 p-6  rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold mb-4">Check Student Attendance</h4>
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit((data) => console.log("Form submitted:", data))}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
                        >
                            {/* Class Selection */}
                            <FormField control={form.control} name="class" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Class</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Class" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="One">One</SelectItem>
                                                <SelectItem value="Two">Two</SelectItem>
                                                <SelectItem value="Three">Three</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Section Selection */}
                            <FormField control={form.control} name="section" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Section</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Section" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="A">A</SelectItem>
                                                <SelectItem value="B">B</SelectItem>
                                                <SelectItem value="C">C</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Month Selection */}
                            <FormField control={form.control} name="month" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Month</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Month" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="April">April</SelectItem>
                                                <SelectItem value="May">May</SelectItem>
                                                <SelectItem value="June">June</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Year Selection */}
                            <FormField control={form.control} name="year" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2024">2024</SelectItem>
                                                <SelectItem value="2025">2025</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Search Button */}
                            <div className="col-span-full flex justify-start">
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all">
                                    Search
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>

                {/* Attendance Table */}
                <div className="m-5 p-6  rounded-lg shadow-md overflow-x-auto">
                    <h4 className="text-xl font-semibold mb-4">Attendance Sheet</h4>
                    <Table className="border border-gray-300 w-full">
                        <TableHeader>
                            <TableRow >
                                <TableHead className="text-left">Student Name</TableHead>
                                {Array.from({ length: totalDays }, (_, index) => (
                                    <TableHead key={index} className="text-center">{index + 1}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendanceData.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-semibold">{student.name}</TableCell>
                                    {student.attendance.map((status, index) => (
                                        <TableCell key={index} className="text-center">
                                            <span className={`px-2 py-1 rounded ${status === "P" ? "bg-green-500 text-white" : status === "A" ? "bg-red-500 text-white" : "bg-yellow-400 text-white"}`}>
                                                {status}
                                            </span>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Attendance;
