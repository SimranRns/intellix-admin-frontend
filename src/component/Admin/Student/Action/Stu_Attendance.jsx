

import React, { useState, useEffect, useContext } from "react";
import { Button } from "../../../src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../../src/components/ui/input";
import { Label } from "../../../src/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogDescription,
} from "../../../src/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../src/components/ui/form";
import ThemeContext from "../../Dashboard/ThemeContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../src/components/ui/card";
import { Badge } from "../../../src/components/ui/badge";
// import ThemeContext from "../Dashboard/ThemeContext";

const initialSalaryData = [
    {
        id: 1,
        name: "John Doe",
        amount: "$5,000",
        date: "2025-03-01",
        status: "Paid",
    },
    {
        id: 2,
        name: "Jane Smith",
        amount: "$4,500",
        date: "2025-02-01",
        status: "Pending",
    },
    {
        id: 3,
        name: "Robert Brown",
        amount: "$5,200",
        date: "2025-01-01",
        status: "Paid",
    },
    {
        id: 4,
        name: "Emily Johnson",
        amount: "$4,800",
        date: "2024-12-01",
        status: "Paid",
    },
];

const formSchema = z.object({
    amount: z.string().min(1, { message: "Please enter the amount!" }),
    present: z.string().min(1, { message: "Required!" }),
    absent: z.string().min(1, { message: "Required!" }),
    halfday: z.string().min(1, { message: "Required!" }),
});

const Stu_Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedTab, setSelectedTab] = useState("Present");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [tab, setTab] = useState("tab2");
    const [open, setOpen] = useState(false);
    const [salaryData, setSalaryData] = useState([]);
    const [opensec, setopensec] = useState(false);
    const [Salaryhistory, setSalaryhistory] = useState(initialSalaryData);
    const [secdate, setsecdate] = useState('');
    const [secattendance, setsecattendance] = useState(null);

    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);

    const goback = () => {
        window.history.back();
    };

    useEffect(() => {
        setAttendanceData([
            {
                id: 1,
                punchIn: "09:00 AM",
                punchOut: "06:00 PM",
                date: "2025-03-20",
                status: "Present",
            },
            {
                id: 2,
                punchIn: "10:00 AM",
                punchOut: "03:00 PM",
                date: "2025-03-21",
                status: "Half Day",
            },
            {
                id: 3,
                punchIn: "08:30 AM",
                punchOut: "05:30 PM",
                date: "2025-03-22",
                status: "Present",
            },
            {
                id: 4,
                punchIn: "-",
                punchOut: "-",
                date: "2025-03-23",
                status: "Absent",
            },
        ]);
        setSalaryhistory([
            {
                id: 1,
                name: "john",
                department: "Teacher",
                from: "2024-03-20",
                to: "2025-03-20",
                amount: "20000",
                present: "5",
                halfday: "6",
                absent: "1",
            },
            {
                id: 2,
                name: "Doe",
                department: "Hr",
                from: "2024-03-20",
                to: "2025-03-20",
                amount: "30000",
                present: "0",
                halfday: "2",
                absent: "1",
            },
        ]);
    }, []);


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { amount: "", present: "", absent: "", halfday: "" },
    });

    const handleViewAttendance = () => {
        const filteredData = attendanceData.filter(
            (item) => item.date >= fromDate && item.date <= toDate
        );
        setAttendanceData(filteredData);
    };
    const sechandleViewAttendance = () => {
        // Replace this with your API call or logic to fetch attendance based on date
        const data = {
            id: '12340560',
            status: 'Absent',
            date: fromDate,
            inTime: '--:--',
            outTime: '--:--',
        };
        setsecattendance(data);
    };


    return (

        <div
            className={`flex flex-col md:flex-row min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
                }`}
        >
            <aside
                className={`md:w-64 w-full p-6 shadow-md flex flex-col gap-4 ${darkMode ? "bg-gray-800" : "bg-white"
                    }`}
            >

                <Button
                    onClick={goback}
                    className="flex items-center gap-2 bg-blue-500 hover:blue-600  border border-gray-300"
                >
                    <ArrowLeft className="w-5 h-5" /> Back
                </Button>

                {/* <h4 className="text-xl font-semibold">Manage Salary</h4> */}




                <Button
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white ${tab === "tab2" ? "font-bold" : ""
                        }`}
                    onClick={() => {
                        setTab("tab2");
                    }}
                >
                    Attendance
                </Button>
                <Button
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white  mt-5 ${tab === "tab1" ? "font-bold" : ""
                        }`}
                    onClick={() => {
                        setTab("tab1");
                    }}
                >
                    Bulk  Attendance
                </Button>

                <div className="mt-6 space-y-3">
                    {tab === "tab1" ? (
                        <>
                            <div className="w-full border-t p-6 border border-blue-200 shadow-md mt-8">
                                <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
                                <Label className="mb-2 block ">From</Label>
                                <Input
                                    type="date"
                                    className="w-full"
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                                <Label className="mt-4 mb-2 block ">To</Label>
                                <Input
                                    type="date"
                                    className="w-full"
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                                    onClick={handleViewAttendance}
                                >
                                    View Attendance
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-full border-t p-6 border border-blue-200 shadow-md mt-8">
                                <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                                <Input
                                    type="date"
                                    className="w-full"
                                    value={secdate}
                                    onChange={(e) => setsecdate(e.target.value)}
                                />
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                                    onClick={sechandleViewAttendance}
                                >
                                    View Attendance
                                </Button>
                            </div>


                        </>
                    )}
                </div>




            </aside>


            <main className="flex-1 p-6">
                {tab === "tab1" && (
                    <>
                        <div className=" grid grid-cols-3 gap-4 ">

                            <Card className="border shadow-md shadow-blue-400/50">
                                <CardContent className="text-2xl font-serif text-center pt-3">
                                    Present Days
                                </CardContent>
                                <CardContent className="text-5xl font-mono tabular-nums text-green-600 text-center pt-3">
                                    25
                                </CardContent>

                            </Card>
                            <Card className="border shadow-md shadow-blue-400/50">
                                <CardContent className="text-2xl font-serif text-center pt-3">
                                    Half Days
                                </CardContent>
                                <CardContent className="text-5xl font-mono tabular-nums text-yellow-600 text-center pt-3">
                                    5
                                </CardContent>
                            </Card>
                            <Card className="border shadow-md shadow-blue-400/50">
                                <CardContent className="text-2xl font-serif text-center pt-3">
                                    Absent Days
                                </CardContent>
                                <CardContent className="text-5xl font-mono tabular-nums text-red-600 text-center pt-3">
                                    7
                                </CardContent>
                            </Card>
                        </div>
                        <div className="flex gap-6 border-b pb-2 mt-5">
                            {["Present", "Half Day", "Absent"].map((status) => (
                                <button
                                    key={status}
                                    className={`px-4 py-2 ${selectedTab === status
                                        ? "border-b-2 border-blue-600"
                                        : "text-gray-600"
                                        }`}
                                    onClick={() => setSelectedTab(status)}
                                >
                                    {status}
                                </button>
                            ))}


                        </div>
                        <table className="w-full mt-4 border-collapse">
                            <thead>
                                <tr className="border">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Punch-In</th>
                                    <th className="p-3">Punch-Out</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData
                                    .filter((item) => item.status === selectedTab)
                                    .map((item) => (
                                        <tr key={item.id} className="text-center border-b">
                                            <td className="p-3">{item.id}</td>
                                            <td className="p-3">{item.punchIn}</td>
                                            <td className="p-3">{item.punchOut}</td>
                                            <td className="p-3">{item.date}</td>
                                            <td
                                                className={`p-3 ${item.status === "Present"
                                                    ? "text-green-600 font-semibold"
                                                    : item.status === "Half Day"
                                                        ? "text-orange-400 font-semibold"
                                                        : "text-red-600 font-semibold"
                                                    }`}
                                            >
                                                {item.status}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </>
                )}
                {tab === "tab2" && secattendance && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Attendance</h2>
                        <div className="p-6 flex justify-center">
                            <Card className="p-6 shadow-md shadow-blue-500/50 rounded-2xl overflow-hidden border border-gray-100/50 w-full max-w-2xl min-h-[350px]">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="mt-2 sm:mt-0 px-3 py-2 rounded-full text-xs font-semibold uppercase bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                                        {secattendance?.id}
                                    </span>
                                    <span className="mt-2 sm:mt-0 px-4 py-2 rounded-full text-xs font-semibold uppercase bg-blue-500/10 text-blue-600 border border-blue-500/20">
                                        {secattendance?.status}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="mt-9">
                                        <Label className="text-sm">Date</Label>
                                        <Input
                                            disabled
                                            value={secattendance?.date || ''}
                                            className="mt-1 bg-gray-100 text-gray-800 font-semibold cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="mt-6">
                                            <Label className="text-sm">In-Time</Label>
                                            <Input
                                                disabled
                                                value={secattendance?.inTime || '--:--'}
                                                className="mt-1 bg-gray-100 text-gray-800 font-bold cursor-not-allowed"
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <Label className="text-sm">Out-Time</Label>
                                            <Input
                                                disabled
                                                value={secattendance?.outTime || '--:--'}
                                                className="mt-1 bg-gray-100 text-gray-800 font-bold cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </>
                )}

            </main>
        </div>
    );
};

export default Stu_Attendance;
