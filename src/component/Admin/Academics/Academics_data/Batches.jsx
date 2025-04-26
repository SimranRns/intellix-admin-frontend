import React, { useEffect, useState } from "react";
import AppSidebar from "../../../src/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "../../../src/components/ui/sidebar";
import Header from "../../Dashboard/Header";
import { Button } from "../../../src/components/ui/Button";
import { ArrowLeft, Search, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../src/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../src/components/ui/form";
import { Input } from "../../../src/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../src/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../src/components/ui/card";
import Viewdetail from "./batch/Viewdetail";
import Update_time from "./batch/Update_time";
import Migrate from "./batch/Migrate";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../src/components/ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { Add_Batches, get_Batches } from "../../../../Redux_store/Api/Batches";

const batchSchema = z
  .object({
    batchName: z.string().min(1, "Batch name is required"),
    course_id: z.string().min(1, { message: "Course is required" }),
    Session_id: z.string().min(1, { message: "Session year is required" }),
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().min(1, { message: "End date is required" }),
    starttime: z.string().min(1, { message: "Start time is required" }),
    endtime: z.string().min(1, { message: "End time is required" }),
    grace: z.string().min(1, { message: "grace period is required" }),
    fees: z.string().min(1, { message: "fees is required" }),
  })
  .refine(
    (data) => {
      // Optional: check that endDate is after startDate
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) > new Date(data.startDate);
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (!data.starttime || !data.endtime) return true;
      return data.endtime > data.starttime;
    },
    {
      message: "End time must be after start time",
      path: ["endtime"],
    }
  );
const Batches = () => {
  const [AddBatches, setAddBatches] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addBatch, setAddBatch] = useState({
    BatchesName: "",
    course_id: "",
    Session_id: "",
    startDate: "",
    EndDate: "",
    StartTime: "",
    EndTime: "",
    BatchFees:"",
    GracePeriod:"",
  });

    // for update time '

  console.log(addBatch);

  const form = useForm({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      batchName: "",
      course_id: "",
      Session_id: "",
      startDate: "",
      endDate: "",
      starttime: "",
      endtime: "",
      fees:"",
      grace:"",

    },
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_Batches());
  }, []);

  const { Batches, loading, error } = useSelector((s) => s.Batch);
  const [card, setCard] = useState([
    { batchname: "BCA", course: "English" },
    { batchname: "MCA", course: "Math" },
    { batchname: "BBA", course: "Business" },
    { batchname: "MBA", course: "Management" },
    { batchname: "BSc", course: "Biology" },
    { batchname: "MSc", course: "Physics" },
    { batchname: "B.Com", course: "Commerce" },
    { batchname: "M.Com", course: "Accounting" },
  ]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(card.length / itemsPerPage);
  const paginatedData = card.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onSubmit = (data) => {
    setCard((prev) => [
      ...prev,
      { batchname: data.batchName, course_id: data.course_id },
    ]);
    setAddBatches(false);
    form.reset();

    // setTimeout(() => {
    //   setShowSuccess(false);
    // }, 3000);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="w-full shadow-md shadow-blue-300/30 rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 gap-3">
            <div className="flex items-center gap-3">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
                onClick={goBack}
              >
                <ArrowLeft size={18} />
                <span className="hidden md:inline">Back to Academics</span>
              </Button>
              <Button
                onClick={() => setAddBatches(true)}
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                <span>Add Batches</span>
              </Button>
              <Dialog open={AddBatches} onOpenChange={setAddBatches}>
                <DialogContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                  className="sm:max-w-[600px] min-h-[400px] shadow-lg p-6 rounded-lg"
                >
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold">
                      Add Batch
                    </DialogTitle>
                  </DialogHeader>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="batchName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Batch Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Batch Name"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e); // To keep react-hook-form in sync
                                  setAddBatch({
                                    ...addBatch,
                                    BatchesName: e.target.value,
                                  }); // To update your custom state
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="course_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value); // react-hook-form को sync करो
                                  setAddBatch({ ...addBatch, course_id: value }); // custom local state update करो
                                }}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a Course" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Courses</SelectLabel>
                                    <SelectItem value="1">
                                      Course 1
                                    </SelectItem>
                                    <SelectItem value="2">
                                      Course 2
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="Session_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Year</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value); // react-hook-form sync
                                  setAddBatch({ ...addBatch, Session_id: value }); // your custom state
                                }}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a Session Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Sessions</SelectLabel>
                                    <SelectItem value="20">2029</SelectItem>
                                    <SelectItem value="19">2025</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Start and End Date */}
                      <div className="flex items-center gap-4">
                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e); // To keep react-hook-form in sync
                                    setAddBatch({
                                      ...addBatch,
                                      startDate: e.target.value,
                                    }); // To update your custom state
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e); // To keep react-hook-form in sync
                                    setAddBatch({
                                      ...addBatch,
                                      EndDate: e.target.value,
                                    }); // To update your custom state
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Start and End Time */}
                      <div className="flex items-center gap-4">
                        <FormField
                          control={form.control}
                          name="starttime"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Start Time</FormLabel>
                              <FormControl>
                                <Input
                                  type="time"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e); // To keep react-hook-form in sync
                                    setAddBatch({
                                      ...addBatch,
                                      StartTime: e.target.value,
                                    }); // To update your custom state
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="endtime"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>End Time</FormLabel>
                              <FormControl>
                                <Input
                                  type="time"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e); // To keep react-hook-form in sync
                                    setAddBatch({
                                      ...addBatch,
                                      EndTime: e.target.value,
                                    }); // To update your custom state
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <FormField
                          control={form.control}
                          name="grace"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Grace Period</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e); // To keep react-hook-form in sync
                                    setAddBatch({
                                      ...addBatch,
                                      GracePeriod: e.target.value,
                                    }); // To update your custom state
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="fees"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Fees</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e); // To keep react-hook-form in sync
                                    setAddBatch({
                                      ...addBatch,
                                      BatchFees: e.target.value,
                                    }); // To update your custom state
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                        onClick={() => {
                          // onSubmit()
                          // const data = new FormData();
                          // data.append("BatchesName", addBatch.BatchesName); // key: title
                          // data.append("course", addBatch.course); // key: description
                          // data.append("session", addBatch.session);
                          // data.append("StartDate", addBatch.StartDate);
                          // data.append("EndDate", addBatch.EndDate);
                          // data.append("StartTime", addBatch.StartTime);
                          // data.append("EndTime", addBatch.EndTime);
                          // data.append("BatchFees", addBatch.BatchFees);
                          // data.append("GracePeriod", addBatch.GracePeriod);

                           // Debugging: क्या जा रहा है server पे

                          dispatch(Add_Batches(addBatch)); // Pass your data
                        }}
                      >
                        Confirm
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search Bar */}
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                name="search"
                type="text"
                placeholder="By Batches Name..."
                className="ml-2 w-full outline-none bg-transparent text-sm"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Batches?.map((pass, index) => (
              <Card
                key={index}
                className="shadow-md shadow-blue-500/50 rounded-2xl overflow-hidden mt-8"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold  text-blue-500  ">
                    {pass.BatchesName}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {pass.course_id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  <Viewdetail />
                  <Update_time />
                  <Migrate />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      as="button"
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Batches;
