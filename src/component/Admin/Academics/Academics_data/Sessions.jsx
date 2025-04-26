import React, { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../../src/components/ui/card";
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
import { useDispatch, useSelector } from "react-redux";
import { addSession, fetchSessions, getSessions, setDefaultSession, } from "../../../../Redux_store/Api/SessionApi";

// Validation schema
const sessionSchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be exactly 4 digits"),
});

const Sessions = () => {
  const [addSessions, setAddSessions] = useState(false);
  const [AddConfrom, setAddConfrom] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [defaultSession, setDefaultSessionId] = useState(null);

  const dispatch = useDispatch();

  const handleSetDefaultSession = (id) => {
    dispatch(setDefaultSession({ id }));
    setDefaultSessionId(id);

  };



  const form = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: { year: "" },
  });

  const handleSessionSubmit = async (data) => {
    try {
      await dispatch(addSession({ session_year: data.year })).unwrap();  // Ensure this returns a promise
      await dispatch(getSessions({ page: 1, session_year: '', limit: 19 }));

      setAddSessions(false);
      setAddConfrom(true);
      form.reset();
    } catch (error) {
      console.error("Error adding session:", error);
      // Handle the error - Show a message to the user
    }
  };


  const { loading, error, Session } = useSelector((state) => state.Session || {});

  useEffect(() => {
    if (Session) {
      const defaultSessionItem = Session.find((s) => s.is_default);
      if (defaultSessionItem) {
        setDefaultSessionId(defaultSessionItem.id);
      }
    }
  }, [Session]);


  const goBack = () => window.history.back();

  const handleConfirm = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAddConfrom(false);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const sessionsPerPage = 8;

  const selectedSessions = Session || [];





  const { total, } = useSelector((state) => state.Session);

  useEffect(() => {
    dispatch(getSessions({ page: currentPage, session_year: searchQuery, limit: 8 }));
  }, [dispatch, currentPage, searchQuery]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
                    <DialogTitle className="text-center">Add Session</DialogTitle>
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
                                type="text"
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
                        disabled={loading}
                        className="w-full bg-blue-600 text-white"
                      >
                        {loading ? 'Adding...' : 'Add Session'}
                      </Button>
                      {error?.message ? (
                        <div className="text-red-700"> {error.message}</div>
                      ) : ""}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                onClick={() => dispatch(getSessions({ page: 1, session_year: searchQuery, limit: 8 }))}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm ml-2"
              >
                Search
              </Button>

            </div>
          </div>

          {/* Session Cards */}
          {loading ? (
            <div>Loading...</div>
          ) :

            (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-6">
                {selectedSessions.map((Session) => (
                  <Card
                    key={Session.id}
                    className="w-auto max-w-sm shadow-md shadow-blue-500/50 rounded-xl mx-auto"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">
                        Year : {Session.session_year}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>
                        <span className="font-semibold">Total No. of Batches :</span> {Session.total}
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Checkbox
                          checked={defaultSession === Session.id}
                          onCheckedChange={() => handleSetDefaultSession(Session.id)}
                        />
                        Default Session
                      </label>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

          {/* Confirmation Dialog */}
          <Dialog open={AddConfrom} onOpenChange={setAddConfrom}>
            <DialogContent
              onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
              className="w-full max-w-[90vw] sm:max-w-[400px] p-6 rounded-lg"
            >
              <ThankYouCard />
              <DialogFooter className="flex justify-end gap-3">
                <Button
                  onClick={() => setAddConfrom(false)}
                  variant="outline"
                  className="w-full sm:w-auto text-black mt-4 bg-gray-100 hover:text-black hover:bg-gray-300 px-5 py-2 rounded-md flex items-center transition-all"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="w-full sm:w-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md flex items-center shadow-md transition-all"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Previous
            </Button>
            <span className="font-semibold">{currentPage}</span>
            <Button
              disabled={currentPage * sessionsPerPage >= total}

              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </Button>

          </div>

        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Sessions;
