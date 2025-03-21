import React, { useState } from "react";
import { Button } from "../../src/components/ui/button";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Card, CardContent } from "../../src/components/ui/card";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../src/components/ui/form";

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

const ManageSalary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Present");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      present: "",
      absent: "",
      halfday: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const handleViewAttendance = () => {    
    const dummyData = [
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
    ];
    setAttendanceData(dummyData);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-blue-900">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full border-r p-6 bg-white shadow-md">
        <h4 className="text-xl font-semibold mb-6">Manage Salary</h4>
        <Button
          onClick={() => navigate(-1)}
          className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4">
          Grant Salary
        </Button>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Salary History
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between">
          {/* Tabs */}
          <div className="flex gap-6 border-b pb-2">
            {["Present", "Half Day"].map((tab) => (
              <button
                key={tab}
                className={`text-lg font-semibold ${selectedTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
                  }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>  
            ))}
          </div>

          {/* Grant Salary Modal */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
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
                  onClick={() => setOpen(false)}
                  className="absolute right-2 top-2 p-1 rounded-full hover:bg-gray-200"
                >
                </button>
                <DialogDescription>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                <Input placeholder="0" {...field} type="number" />
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
                                <Input placeholder="0" {...field} type="number" />
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
                                <Input placeholder="0" {...field} type="number" />
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
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg mt-4 rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr className="border-b">
                <th className="p-3 text-left">Id</th>
                <th className="p-3 text-left">Punch-In</th>
                <th className="p-3 text-left">Punch-Out</th>
                <th className="p-3 text-left">Attendance Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.length > 0 ? (
                attendanceData
                  .filter((item) => item.status === selectedTab)
                  .map((item) => (
                    <tr key={item.id} className="border-b text-gray-800">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">{item.punchIn}</td>
                      <td className="p-3">{item.punchOut}</td>
                      <td className="p-3">{item.date}</td>
                      <td className="p-3">{item.status}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-gray-500">
                    Select date range to see data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Date Range Picker */}
      <aside className="md:w-1/4 w-full border-l p-6 bg-white shadow-md">
        <h3 className="text-lg font-semibold mb-4">Select date range</h3>
        <div className="mb-4">
          <Label className="mb-2 block text-gray-700">From</Label>
          <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-100">
            <CalendarIcon size={18} className="text-gray-500" />
            <Input type="date" className="bg-transparent border-none outline-none w-full" />
          </div>
        </div>
        <div className="mb-6">
          <Label className="mb-2 block text-gray-700">To</Label>
          <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-100">
            <CalendarIcon size={18} className="text-gray-500" />
            <Input type="date" className="bg-transparent border-none outline-none w-full" />
          </div>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleViewAttendance}>
          View Attendance
        </Button>

      </aside>
    </div>
  );
};

export default ManageSalary;
