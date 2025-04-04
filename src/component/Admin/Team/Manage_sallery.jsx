  // import React, { useState, useEffect, useContext } from "react";
  // import { Button } from "../../src/components/ui/button";
  // import { ArrowLeft, CalendarIcon } from "lucide-react";
  // import { Input } from "../../src/components/ui/input";
  // import { Label } from "../../src/components/ui/label";
  // import { useNavigate } from "react-router-dom";
  // import {
  //   Dialog,
  //   DialogContent,
  //   DialogHeader,
  //   DialogTitle,
  //   DialogFooter,
  //   DialogTrigger,
  //   DialogDescription,
  // } from "../../src/components/ui/dialog";
  // import { z } from "zod";
  // import { zodResolver } from "@hookform/resolvers/zod";
  // import { useForm } from "react-hook-form";
  // import {
  //   Form,
  //   FormControl,
  //   FormField,
  //   FormItem,
  //   FormLabel,
  //   FormMessage,
  // } from "../../src/components/ui/form";

  // const initialSalaryData = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     amount: "$5,000",
  //     date: "2025-03-01",
  //     status: "Paid",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     amount: "$4,500",
  //     date: "2025-02-01",
  //     status: "Pending",
  //   },
  //   {
  //     id: 3,
  //     name: "Robert Brown",
  //     amount: "$5,200",
  //     date: "2025-01-01",
  //     status: "Paid",
  //   },
  //   {
  //     id: 4,
  //     name: "Emily Johnson",
  //     amount: "$4,800",
  //     date: "2024-12-01",
  //     status: "Paid",
  //   },
  // ];

  // const formSchema = z.object({
  //   amount: z.string().min(1, { message: "Please enter the amount!" }),
  //   present: z.string().min(1, { message: "Required!" }),
  //   absent: z.string().min(1, { message: "Required!" }),
  //   halfday: z.string().min(1, { message: "Required!" }),
  // });

  // const ManageSalary = () => {
  //   const [attendanceData, setAttendanceData] = useState([]);
  //   const [selectedTab, setSelectedTab] = useState("Present");
  //   const [fromDate, setFromDate] = useState("");
  //   const [toDate, setToDate] = useState("");
  //   const [tab, setTab] = useState("tab1");

  //   const [open, setOpen] = useState(false);
  //   const [salaryData, setSalaryData] = useState([]);
  //   const [opensec, setopensec] = useState(false);
  //   const [Salaryhistory, setSalaryhistory] = useState(initialSalaryData);
  //   const navigate = useNavigate();
  //   const goback = () => {
  //     window.history.back();
  //   }
  //   useEffect(() => {
  //     // Simulating fetching dynamic attendance data
  //     setAttendanceData([
  //       {
  //         id: 1,
  //         punchIn: "09:00 AM",
  //         punchOut: "06:00 PM",
  //         date: "2025-03-20",
  //         status: "Present",
  //       },
  //       {
  //         id: 2,
  //         punchIn: "10:00 AM",
  //         punchOut: "03:00 PM",
  //         date: "2025-03-21",
  //         status: "Half Day",
  //       },
  //       {
  //         id: 3,
  //         punchIn: "08:30 AM",
  //         punchOut: "05:30 PM",
  //         date: "2025-03-22",
  //         status: "Present",
  //       },
  //       {
  //         id: 4,
  //         punchIn: "-",
  //         punchOut: "-",
  //         date: "2025-03-23",
  //         status: "Absent",
  //       },
  //     ]);
  //     setSalaryhistory([
  //       {
  //         id: 1,
  //         name: "john",
  //         department: "Teacher",
  //         from: "2024-03-20",
  //         to: "2025-03-20",
  //         amount: "20000",
  //         present: "5",
  //         halfday: "6",
  //         absent: "1",
  //       },
  //       {
  //         id: 2,
  //         name: "Doe",
  //         department: "Hr",
  //         from: "2024-03-20",
  //         to: "2025-03-20",
  //         amount: "30000",
  //         present: "0",
  //         halfday: "2",
  //         absent: "1",
  //       },
  //     ]);
  //   }, []);

  //   const form = useForm({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: { amount: "", present: "", absent: "", halfday: "" },
  //   });

  //   const handleViewAttendance = () => {
  //     const filteredData = attendanceData.filter(
  //       (item) => item.date >= fromDate && item.date <= toDate
  //     );
  //     setAttendanceData(filteredData);
  //   };


  //   return (
  //     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-blue-900  ">
  //       {/* Sidebar */}
  //       <aside className="md:w-64 w-full p-6 bg-white shadow-md flex flex-col gap-4">
  //         <Button
  //           onClick={goback}
  //           className="flex items-center gap-2 bg-blue-500 hover:blue-600  border border-gray-300"
  //         >
  //           <ArrowLeft className="w-5 h-5" /> Back
  //         </Button>
  //         <h4 className="text-xl font-semibold">Manage Salary</h4>

  //         <Button
  //           className={`w-full bg-blue-600 hover:bg-blue-700 text-white mb-4 mt-5 ${tab === "tab1" ? "font-bold" : ""
  //             }`}
  //           onClick={() => {
  //             setTab("tab1");
  //           }}
  //         >
  //           Granted Salary
  //         </Button>

  //         <Button
  //           className={`w-full bg-blue-600 hover:bg-blue-700 text-white ${tab === "tab2" ? "font-bold" : ""
  //             }`}
  //           onClick={() => {
  //             setTab("tab2");
  //           }}
  //         >
  //           Salary History
  //         </Button>

  //         {/* Date Range Picker */}

  //         <div className="w-full border-t p-6 bg-white shadow-md mt-8">
  //           <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
  //           <Label className="mb-2 block text-gray-700">From</Label>
  //           <Input
  //             type="date"
  //             className="w-full"
  //             onChange={(e) => setFromDate(e.target.value)}
  //           />
  //           <Label className="mt-4 mb-2 block text-gray-700">To</Label>
  //           <Input
  //             type="date"
  //             className="w-full"
  //             onChange={(e) => setToDate(e.target.value)}
  //           />
  //           <Button
  //             className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
  //             onClick={handleViewAttendance}
  //           >
  //             View Attendance
  //           </Button>
  //         </div>
  //       </aside>

  //       <main className="flex-1 p-6">
  //         {tab === "tab1" && (
  //           <>
  //             <div className="flex gap-6 border-b pb-2">
  //               {["Present", "Half Day", "Absent"].map((status) => (
  //                 <button
  //                   key={status}
  //                   className={`px-4 py-2 ${selectedTab === status
  //                       ? "border-b-2 border-blue-600"
  //                       : "text-gray-600"
  //                     }`}
  //                   onClick={() => setSelectedTab(status)}
  //                 >
  //                   {status}
  //                 </button>
  //               ))}
  //               {/* first model */}
  //               <Dialog open={open} onOpenChange={setOpen}>
  //                 <DialogTrigger asChild>
  //                   <Button
  //                     onClick={() => setOpen(true)}
  //                     className="bg-blue-600 hover:bg-blue-700 text-white "
  //                   >
  //                     Grant Salary
  //                   </Button>
  //                 </DialogTrigger>
  //                 <DialogContent
  //                   onPointerDownOutside={(e) => e.preventDefault()}
  //                   onEscapeKeyDown={(e) => e.preventDefault()}
  //                 >
  //                   <DialogHeader>
  //                     <DialogTitle className="text-center">Salary</DialogTitle>
  //                     <button
  //                       onClick={() => {
  //                         setOpen(false);
  //                         form.reset(); // Clear inputs on closing
  //                       }}
  //                       className="absolute right-2 top-2 p-1 rounded-full hover:bg-gray-200"
  //                     ></button>
  //                     <DialogDescription>
  //                       <Form {...form}>
  //                         <form
  //                           onSubmit={form.handleSubmit((data) => {
  //                             setOpen(false); // Close modal
  //                             form.reset(); // Clear inputs
  //                           })}
  //                           className="space-y-8"
  //                         >
  //                           <FormField
  //                             control={form.control}
  //                             name="amount"
  //                             render={({ field }) => (
  //                               <FormItem>
  //                                 <FormLabel>Amount</FormLabel>
  //                                 <FormControl>
  //                                   <Input
  //                                     placeholder="0"
  //                                     {...field}
  //                                     type="number"
  //                                   />
  //                                 </FormControl>
  //                                 <FormMessage />
  //                               </FormItem>
  //                             )}
  //                           />
  //                           <div className="flex gap-2">
  //                             <FormField
  //                               control={form.control}
  //                               name="present"
  //                               render={({ field }) => (
  //                                 <FormItem>
  //                                   <FormLabel>Present</FormLabel>
  //                                   <FormControl>
  //                                     <Input
  //                                       placeholder="0"
  //                                       {...field}
  //                                       type="number"
  //                                     />
  //                                   </FormControl>
  //                                   <FormMessage />
  //                                 </FormItem>
  //                               )}
  //                             />
  //                             <FormField
  //                               control={form.control}
  //                               name="absent"
  //                               render={({ field }) => (
  //                                 <FormItem>
  //                                   <FormLabel>Absent</FormLabel>
  //                                   <FormControl>
  //                                     <Input
  //                                       placeholder="0"
  //                                       {...field}
  //                                       type="number"
  //                                     />
  //                                   </FormControl>
  //                                   <FormMessage />
  //                                 </FormItem>
  //                               )}
  //                             />
  //                             <FormField
  //                               control={form.control}
  //                               name="halfday"
  //                               render={({ field }) => (
  //                                 <FormItem>
  //                                   <FormLabel>Half-Day</FormLabel>
  //                                   <FormControl>
  //                                     <Input
  //                                       placeholder="0"
  //                                       {...field}
  //                                       type="number"
  //                                     />
  //                                   </FormControl>
  //                                   <FormMessage />
  //                                 </FormItem>
  //                               )}
  //                             />
  //                           </div>
  //                           <Button type="submit">Submit</Button>
  //                         </form>
  //                       </Form>
  //                     </DialogDescription>
  //                   </DialogHeader>
  //                 </DialogContent>
  //               </Dialog>

  //               {/* second model */}
  //               <Dialog open={opensec} onOpenChange={setopensec}>
  //                 <DialogContent className="sm:max-w-[400px]">
  //                   <DialogHeader>
  //                     <DialogTitle className="text-center text-lg font-semibold">
  //                       Confirm Export
  //                     </DialogTitle>
  //                   </DialogHeader>

  //                   <DialogFooter className="flex justify-between">
  //                     <Button onClick={() => setopensec(false)} variant="outline">
  //                       Cancel
  //                     </Button>
  //                     <Button className="bg-green-600 hover:bg-green-700 text-white">
  //                       Confirm
  //                     </Button>
  //                   </DialogFooter>
  //                 </DialogContent>
  //               </Dialog>
  //             </div>
  //             <table className="w-full mt-4 border-collapse">
  //               <thead>
  //                 <tr className="bg-gray-100">
  //                   <th className="p-3">ID</th>
  //                   <th className="p-3">Punch-In</th>
  //                   <th className="p-3">Punch-Out</th>
  //                   <th className="p-3">Date</th>
  //                   <th className="p-3">Status</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {attendanceData
  //                   .filter((item) => item.status === selectedTab)
  //                   .map((item) => (
  //                     <tr key={item.id} className="text-center border-b">
  //                       <td className="p-3">{item.id}</td>
  //                       <td className="p-3">{item.punchIn}</td>
  //                       <td className="p-3">{item.punchOut}</td>
  //                       <td className="p-3">{item.date}</td>
  //                       <td
  //                         className={`p-3 ${item.status === "Present"
  //                             ? "text-green-600 font-semibold"
  //                             : item.status === "Half Day"
  //                               ? "text-orange-400 font-semibold"
  //                               : "text-red-600 font-semibold"
  //                           }`}
  //                       >
  //                         {item.status}
  //                       </td>
  //                     </tr>
  //                   ))}
  //               </tbody>
  //             </table>
  //           </>
  //         )}
  //         {tab === "tab2" && (
  //           <>
  //             {" "}
  //             <div className="p-6">
  //               <h2 className="text-2xl font-bold mb-4">Salary History</h2>
  //               <table className="w-full mt-4 border-collapse">
  //                 <thead>
  //                   <tr className="bg-gray-100">
  //                     <th className="p-3">ID</th>
  //                     <th className="p-3">Name</th>
  //                     <th className="p-3">Department</th>
  //                     <th className="p-3">From</th>
  //                     <th className="p-3">To</th>
  //                     <th className="p-3">Amount</th>
  //                     <th className="p-3">Attendance</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   {Salaryhistory.map((item) => (
  //                     <tr key={item.id} className="text-center border-b">
  //                       <td className="p-3">{item.id}</td>
  //                       <td className="p-3">{item.name}</td>
  //                       <td className="p-3">{item.department}</td>
  //                       <td className="p-3">{item.from}</td>
  //                       <td className="p-3">{item.to}</td>
  //                       <td className="p-3">{item.amount}</td>
  //                       <td className="p-3">
  //                         <span className="text-green-500 m-3 font-semibold">
  //                           {item.present}
  //                         </span>
  //                         <span className="text-yellow-400 m-3 font-semibold">
  //                           {item.halfday}
  //                         </span>
  //                         <span className="text-red-500 m-3 font-semibold">
  //                           {item.absent}
  //                         </span>
  //                       </td>
  //                       <td></td>
  //                     </tr>
  //                   ))}
  //                 </tbody>
  //               </table>
  //             </div>
  //           </>
  //         )}
  //       </main>
  //     </div>
  //   );
  // };

  // export default ManageSalary;

import React, { useState, useEffect, useContext } from "react";
import { Button } from "../../src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "../../src/components/ui/dialog";
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
} from "../../src/components/ui/form";
import ThemeContext from "../Dashboard/ThemeContext";

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

const ManageSalary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Present");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tab, setTab] = useState("tab1");
  const [open, setOpen] = useState(false);
  const [salaryData, setSalaryData] = useState([]);
  const [opensec, setopensec] = useState(false);
  const [Salaryhistory, setSalaryhistory] = useState(initialSalaryData);
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

  return (
    
    <div
      className={`flex flex-col md:flex-row min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <aside
        className={`md:w-64 w-full p-6 shadow-md flex flex-col gap-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
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
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white mb-4 mt-5 ${tab === "tab1" ? "font-bold" : ""
              }`}
            onClick={() => {
              setTab("tab1");
            }}
          >
            Granted Salary
          </Button>

          <Button
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white ${tab === "tab2" ? "font-bold" : ""
              }`}
            onClick={() => {
              setTab("tab2");
            }}
          >
            Salary History
          </Button>


          <div className="w-full border-t p-6 bg-white shadow-md mt-8">
            <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
            <Label className="mb-2 block text-gray-700">From</Label>
            <Input
              type="date"
              className="w-full"
              onChange={(e) => setFromDate(e.target.value)}
            />
            <Label className="mt-4 mb-2 block text-gray-700">To</Label>
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

      </aside>
       

      <main className="flex-1 p-6">
        {tab === "tab1" && (
          <>
            <div className="flex gap-6 border-b pb-2">
              {["Present", "Half Day", "Absent"].map((status) => (
                <button
                  key={status}
                  className={`px-4 py-2 ${
                    selectedTab === status
                      ? "border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setSelectedTab(status)}
                >
                  {status}
                </button>
              ))}
              {/* first model */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white "
                  >
                    Grant Salary
                  </Button>
                </DialogTrigger>
                <DialogContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                >
                  <DialogHeader>
                    <DialogTitle className="text-center">Salary</DialogTitle>
                    <button
                      onClick={() => {
                        setOpen(false);
                        form.reset(); // Clear inputs on closing
                      }}
                      className="absolute right-2 top-2 p-1 rounded-full hover:bg-gray-200"
                    ></button>
                    <DialogDescription>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit((data) => {
                            setOpen(false); // Close modal
                            form.reset(); // Clear inputs
                          })}
                          className="space-y-8"
                        >
                          <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="0"
                                    {...field}
                                    type="number"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex gap-2">
                            <FormField
                              control={form.control}
                              name="present"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Present</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="0"
                                      {...field}
                                      type="number"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="absent"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Absent</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="0"
                                      {...field}
                                      type="number"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="halfday"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Half-Day</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="0"
                                      {...field}
                                      type="number"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <Button type="submit">Submit</Button>
                        </form>
                      </Form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {/* second model */}
              <Dialog open={opensec} onOpenChange={setopensec}>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle className="text-center text-lg font-semibold">
                      Confirm Export
                    </DialogTitle>
                  </DialogHeader>

                  <DialogFooter className="flex justify-between">
                    <Button onClick={() => setopensec(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr className="bg-gray-100">
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
                        className={`p-3 ${
                          item.status === "Present"
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
        {tab === "tab2" && (
          <>
            {" "}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Salary History</h2>
              <table className="w-full mt-4 border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">From</th>
                    <th className="p-3">To</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {Salaryhistory.map((item) => (
                    <tr key={item.id} className="text-center border-b">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.department}</td>
                      <td className="p-3">{item.from}</td>
                      <td className="p-3">{item.to}</td>
                      <td className="p-3">{item.amount}</td>
                      <td className="p-3">
                        <span className="text-green-500 m-3 font-semibold">
                          {item.present}
                        </span>
                        <span className="text-yellow-400 m-3 font-semibold">
                          {item.halfday}
                        </span>
                        <span className="text-red-500 m-3 font-semibold">
                          {item.absent}
                        </span>
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ManageSalary;
