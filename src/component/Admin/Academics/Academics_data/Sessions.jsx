import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AppSidebar from "../../../src/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "../../../src/components/ui/sidebar";
import Header from "../../Dashboard/Header";
import { Button } from "../../../src/components/ui/Button";
import { ArrowLeft, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../src/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../../src/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../src/components/ui/pagination";
import { Checkbox } from "../../../src/components/ui/checkbox";
import { Input } from "../../../src/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../../src/components/ui/form";
import ThankYouCard from "../../Dashboard/ThankYouCard";

const sessionSchema = z.object({
  year: z.string().min(4, "Year must be valid").max(4, "Year must be valid"),
});

const Sessions = () => {
  const [addSessions, setAddSessions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultSession, setDefaultSession] = useState(1);
  const [AddConfrom, setAddConfrom] = useState(false);
  const [sessionList, setSessionList] = useState([
    { id: 1, Year: "2023", Total: "0" },
    { id: 2, Year: "2024", Total: "30" },
    { id: 3, Year: "2025", Total: "50" },
  ]);

  const form = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: { year: "" },
  });

  const handleSessionSubmit = (data) => {
    setSessionList((prev) => [
      ...prev,
      { id: prev.length + 1, Year: data.year, Total: "0" },
    ]);
    setAddSessions(false);
    setAddConfrom(true)
    form.reset();
  };

  const goBack = () => window.history.back();


  const handleConfirm = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("Data Submitted Successfully!");

      setAddConfrom(false);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const sessionsPerPage = 8;
  const totalPages = Math.ceil(sessionList.length / sessionsPerPage);
  const startIndex = (currentPage - 1) * sessionsPerPage;
  const selectedSessions = sessionList.slice(
    startIndex,
    startIndex + sessionsPerPage
  );

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
                onClick={() => setAddSessions(true)}
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                <span>Add Sessions</span>
              </Button>
              <Dialog open={addSessions} onOpenChange={setAddSessions}>
                <DialogContent
                  className="min-h-[300px] sm:max-w-[500px] shadow-lg p-6 rounded-lg"
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                >
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Add Session
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleSessionSubmit)}
                      className="space-y-10"
                    >
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Year</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                placeholder="Enter Year"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-blue-600  text-white"
                      >
                        Proceed
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                name="search"
                type="text"
                placeholder="By Sessions Name..."
                className="ml-2 w-full outline-none bg-transparent text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-6">
            {selectedSessions.map((Session) => (
              <Card
                key={Session.id}
                className="w-auto max-w-sm shadow-md shadow-blue-500/50 rounded-xl  mx-auto "
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Year : {Session.Year}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <span className="font-semibold">
                      Total No. of Batches :
                    </span>{" "}
                    {Session.Total}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Checkbox
                      checked={defaultSession === Session.id}
                      onCheckedChange={() => setDefaultSession(Session.id)}
                    />
                    Default Session
                  </label>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Confrom dilog */}
          <Dialog open={AddConfrom} onOpenChange={setAddConfrom}>
            <DialogContent
              onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
              className="w-full max-w-[90vw] sm:max-w-[400px] p-6 rounded-lg"
            >
              <ThankYouCard />
              {/* Dialog Footer */}
              <DialogFooter className="flex justify-end gap-3">
                <Button
                  onClick={() => setAddConfrom(false)}
                  variant="outline"
                  className="w-full sm:w-auto text-black mt-4 bg-gray-100 hover:text-black hover:bg-gray-300 px-5 py-2 rounded-md flex items-center  transition-all"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm} // Handle form submission & dialog close
                  className="w-full sm:w-auto mt-4 bg-blue-500 hover:bg-blue-600  text-white px-5 py-2 rounded-md flex items-center shadow-md transition-all"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
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
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Sessions;
