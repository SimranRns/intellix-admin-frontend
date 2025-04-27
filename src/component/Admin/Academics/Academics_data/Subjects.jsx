import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../src/components/ui/form";
import { Input } from "../../../src/components/ui/input";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../src/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../src/components/ui/pagination";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ThankYouCard from "../../Dashboard/ThankYouCard";

import { Add_subject, get_subject, update_Subject } from "../../../../Redux_store/Api/Subject";
import { useSelector, useDispatch } from "react-redux";


const subjectSchema = z.object({
  subject_name: z
    .string()
    .min(1, "Subject name is required")
    .regex(/^[A-Za-z ]+$/, "Only letters are allowed"),
});




const Subjects = () => {
  const [AddSubjects, setAddSubjects] = useState(false);
  const [EditSubjects, setEditSubjects] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectList, setSubjectList] = useState([{ id: 1, name: "English" }]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [AddConfrom, setAddConfrom] = useState(false);
  const [sub, setsub] = useState({ subject_name: "" })




  const dispatch = useDispatch();
  const { subjects, loading } = useSelector((state) => state.subj);




  const form = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: { subject_name: "" },
  });

  const goBack = () => window.history.back();

  const SubjectsPerPage = 12;
  const totalPages = Math.ceil(subjects.length / SubjectsPerPage);
  const startIndex = (currentPage - 1) * SubjectsPerPage;
  const selectedSubjects = subjects.slice(startIndex, startIndex + SubjectsPerPage);

  const handleEditSubject = (subject) => {
    setSelectedSubject(subject);
    form.reset({ subject_name: subject.subject_name }); // Reset the form correctly


    setEditSubjects(true);
  };

  const handleUpdateSubject = async (data) => {
    try {
      const payload = {
        id: selectedSubject.id,
        subject_name: data.subject_name,
      };
  
      await dispatch(update_Subject(payload)).unwrap();
  
      setEditSubjects(false);
      setAddConfrom(true);
      dispatch(get_subject()); // Refresh subject list
    } catch (error) {
      console.error("Failed to update subject:", error);
    }
  };  


  const handleConfirm = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // (optional wait)
  
      console.log("Data Submitted Successfully!");
  
      setAddConfrom(false); // Dialog close
      window.location.reload(); // ✅ Page reload
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };
  
  const handleAddSubject = async (data) => {
    try {
      await dispatch(Add_subject(data)).unwrap();
      setAddConfrom(true);
      setAddSubjects(false);
      form.reset();
  
      // ✅ Page reload (simple tarika)
      // window.location.reload();
    } catch (error) {
      console.error("Failed to add subject:", error);
    }
  };
  
  

  useEffect(() => {
    dispatch(get_subject());
  }, []);

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
                onClick={() => setAddSubjects(true)}
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                <span>Add Subjects</span>
              </Button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="By Subjects Name..."
                className="ml-2 w-full outline-none bg-transparent text-sm"
              />
            </div>
          </div>

          {/* Subjects List */}

          <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {selectedSubjects.map((sub) => (
              <Card
                key={sub.id}
                className="w-full max-w-xs sm:max-w-sm mx-auto shadow-md shadow-blue-300/20 rounded-xl"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-center">
                    Subject : {sub.subject_name}

                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex flex-col items-center space-y-2">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                    onClick={() => handleEditSubject(sub)}
                  >
                    Edit Subject
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

        </main>

        {/* Edit Subject Dialog */}
        <Dialog open={EditSubjects} onOpenChange={setEditSubjects}>
          <DialogContent
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            className="sm:max-w-[600px] shadow-lg p-6 rounded-lg"
          >
            <DialogHeader>
              <DialogTitle className="text-center">
                Update Subject Name
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleUpdateSubject)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="subject_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter new subject name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-blue-600 text-white">
                  Confirm
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Add Subject Dialog */}
        <Dialog open={AddSubjects} onOpenChange={setAddSubjects}>
          <DialogContent
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            className="sm:max-w-[500px] shadow-lg p-6 rounded-lg min-h-[300px]"
          >
            <DialogHeader>
              <DialogTitle className="text-center">Add New Subject</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAddSubject)}
                className="space-y-10"
              >
                <FormField
                  control={form.control}
                  name="subject_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter subject name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-blue-600 text-white">
                  Add Subject
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

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
                className="w-full sm:w-auto text-black mt-4 bg-gray-100 hover:bg-gray-200 hover:text-black px-5 py-2 rounded-md flex items-center  transition-all"
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

        {/* Pagination */}
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
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Subjects;
