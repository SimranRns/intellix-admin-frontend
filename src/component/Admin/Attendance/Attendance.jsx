import React, { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import Header from "../Dashboard/Header";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../src/components/ui/Button";

const formSchema = z.object({
    class: z.string().min(1, { message: "Class is required." }),
    section: z.string().min(1, { message: "Section is required." }),
    month: z.string().min(1, { message: "Month is required." }),
    year: z.string().min(1, { message: "Year is required." }),
});

const getDaysInMonth = (month, year) => {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
};

const holidayData = {
    "April-2025": [5, 15, 21],
    "May-2025": [1, 12, 25],
};

const fetchAttendanceData = async (className, section, month, year, totalDays, holidays) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Fahimur Rahman", attendance: ["P", "P", "A", "A", "P", "P", "-", "P", "A", "P"] },
                { id: 2, name: "Richi Akon", attendance: ["A", "P", "P", "P", "A", "P", "-", "P", "P", "A"] },
            ]);
        }, 1000);
    }).then((result) => {
        return result.map(student => ({
            ...student,
            attendance: Array.from({ length: totalDays }, (_, index) =>
                holidays.includes(index + 1) ? "H" : student.attendance[index] || "A"
            )
        }));
    });
};

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

    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [daysInMonth, setDaysInMonth] = useState(30);
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const { month, year } = form.getValues();
        setDaysInMonth(getDaysInMonth(month, year));
        setHolidays(holidayData[`${month}-${year}`] || []);
    }, [form.watch("month"), form.watch("year")]);

    const handleSearch = async (data) => {
        setLoading(true);
        const totalDays = getDaysInMonth(data.month, data.year);
        const holidayList = holidayData[`${data.month}-${data.year}`] || [];
        const result = await fetchAttendanceData(data.class, data.section, data.month, data.year, totalDays, holidayList);

        setAttendanceData(result);
        setLoading(false);
    };

    const getStatusSymbol = (status) => {
        if (status === "P") return <span className="text-green-500 font-bold">✔</span>;
        if (status === "A") return <span className="text-red-500 font-bold">✘</span>;
        if (status === "H") return <span className="text-yellow-500 font-bold">-</span>;
        return status;
    };

    return (
        <SidebarProvider style={{ "--sidebar-width": "19rem" }}>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-4 px-6 border-b  shadow-sm">
                    <SidebarTrigger className="text-lg" />
                    <Header />
                    <h1 className="text-xl font-semibold text-gray-700">Attendance Sheet</h1>
                </header>

                <div className="m-6 p-6 rounded-lg shadow-sm  shadow-blue-500/50">
                    <h4 className="text-2xl font-semibold mb-6">Check Student Attendance</h4>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(handleSearch)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {['class', 'section', 'month', 'year'].map((field) => (
                                <select
                                    key={field}
                                    {...form.register(field)}
                                    className="border border-blue-500 p-3 rounded-lg text-gray-700 focus:ring focus:ring-blue-200 shadow-md "
                                >
                                    {field === 'class' && ['One', 'Two', 'Three'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    {field === 'section' && ['A', 'B', 'C'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    {field === 'month' && ['April', 'May', 'June' ,'Feb'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    {field === 'year' && ['2024', '2025'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            ))}
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg border border-blue-500 shadow-md shadow-blue-500/50">
                                {loading ? "Loading..." : "Search"}
                            </Button>
                        </form>
                    </FormProvider>
                </div>


                <div className="m-6 p-6  rounded-lg shadow-sm overflow-x-auto   shadow-blue-500/50">
                    <h4 className="text-xl font-semibold mb-4 ">Attendance Sheet of {form.getValues("class")} : Section {form.getValues('section')}, {form.getValues("month")} {form.getValues("year")}</h4>
                    {attendanceData.length > 0 ? (
                        <table className="border-collapse border w-full text-sm ">
                            <thead>
                                <tr className="">
                                    <th className="border px-4 py-2">Students</th>
                                    {Array.from({ length: daysInMonth }, (_, index) => (
                                        <th key={index} className="border px-2 py-2 text-center">{index + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map(student => (
                                    <tr key={student.id} >
                                        <td className="border px-4 py-2 font-semibold">{student.name}</td>
                                        {student.attendance.map((status, index) => (
                                            <td key={index} className="border px-2 py-2 text-center">{getStatusSymbol(status)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (<p className="text-center ">No Data Found</p>)}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Attendance;
