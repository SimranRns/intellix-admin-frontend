import React, { useState } from "react";
import { Button } from "../../src/components/ui/button";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";
const formSchema = z.object({
  amount: z.string().min(1, {
    message: " Please Fill the amount!",
  }),
  present: z.string().min(1, {
    message: "Required!",
  }),
  absent: z.string().min(1, {
    message: "Required!",
  }),
  halfday: z.string().min(1, {
    message: "Required!",
  }),
});

const onSubmit = (data) => {
  console.log("Form submitted:", data);
};
// const handleSubmit = () => {
//   window.location.reload();
// };
const ManageSalary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Present");
  const [fromDate, setFromDate] = useState("");
  const [open, setOpen] = useState(false);
  const [opensec, setopensec] = useState(false);
  const [toDate, setToDate] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      present: "",
      absent: "",
      halfday: "",
    },
  });
  const navigate = useNavigate();

  // Dummy Attendance Data
  const allAttendance = [
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
      punchIn: "09:15 AM",
      punchOut: "04:30 PM",
      date: "2025-03-23",
      status: "Absent",
    },
  ];

  // Handle Date Filter
  const handleViewAttendance = () => {
    const filteredData = allAttendance.filter(
      (item) => item.date >= fromDate && item.date <= toDate
    );
    setAttendanceData(filteredData);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-blue-900">
      {/* Sidebar */}
      <aside className="md:w-64 w-full p-6 bg-white shadow-md flex flex-col gap-4">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
        <h4 className="text-xl font-semibold">Manage Salary</h4>

        {/* Date Range Picker */}
        <div className="w-full border-t p-6 bg-white shadow-md mt-4">
          <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
          <div className="mb-4">
            <Label className="mb-2 block text-gray-700">From</Label>
            <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-100">
              <CalendarIcon size={18} className="text-gray-500" />
              <Input
                type="date"
                className="bg-transparent border-none outline-none w-full"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <Label className="mb-2 block text-gray-700">To</Label>
            <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-100">
              <CalendarIcon size={18} className="text-gray-500" />
              <Input
                type="date"
                className="bg-transparent border-none outline-none w-full"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleViewAttendance}
          >
            View Attendance
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Tabs */}
        <div className="flex gap-6 border-b pb-2 overflow-x-auto">
          {["Present", "Half Day", "Absent"].map((tab) => (
            <button
              key={tab}
              className={`text-lg font-semibold px-4 py-2 ${
                selectedTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
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
                              <Input placeholder="0" {...field} type="number" />
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

        {/* Table */}
        <div className="bg-white shadow-lg mt-4 rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 ">
              <tr className="border-b ">
                <th className="p-3 text-left text-center">ID</th>
                <th className="p-3 text-left text-center">Punch-In</th>
                <th className="p-3 text-left text-center">Punch-Out</th>
                <th className="p-3 text-left text-center">Attendance Date</th>
                <th className="p-3 text-left text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.length > 0 ? (
                attendanceData
                  .filter((item) => item.status === selectedTab)
                  .map((item) => (
                    <tr
                      key={item.id}
                      className="border-b text-gray-800 text-center"
                    >
                      <td className="p-3">{item.id}</td>
                      <td className="p-3 font-bold">
                        {item.status === "Absent" ? "- - -" : item.punchIn}
                      </td>
                      <td className="p-3 font-bold">
                        {item.status === "Absent" ? "- - -" : item.punchOut}
                      </td>
                      <td className="p-3">{item.date}</td>
                      <td
                        className={`p-3 font-semibold ${
                          item.status === "Present"
                            ? "text-green-600"
                            : item.status === "Half Day"
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.status}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-gray-500 text-center">
                    Select a date range to see attendance.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageSalary;
