import React, { useState, useEffect } from "react";
import AppSidebar from "../../src/components/ui/app-sidebar";
import Header from "../Dashboard/Header";
import { ChevronDown, Mail, Search, User, Ellipsis } from "lucide-react";
import { Button } from "@headlessui/react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "../../src/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../src/components/ui/pagination";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { z } from "zod"
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
// Mock teacher data
const Teachers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Munaroh Steffani ${i + 1}`,
  username: `munaroh_${i + 1}`,
  subject: ["Mathematics", "Science", "English"],
  image: "https://github.com/shadcn.png",
}));

const Teacher = () => {
  const [selectedOption, setSelectedOption] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const [teachersPerPage, setTeachersPerPage] = useState(10);

  const updateTeachersPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setTeachersPerPage(4); // Mobile
    } else if (width < 1024) {
      setTeachersPerPage(6); // Tablet
    } else {
      setTeachersPerPage(6); // Desktop
    }
  };

  // Update on window resize
  useEffect(() => {
    updateTeachersPerPage();
    window.addEventListener("resize", updateTeachersPerPage);
    return () => window.removeEventListener("resize", updateTeachersPerPage);
  }, []);

  const totalPages = Math.ceil(Teachers.length / teachersPerPage);
  const startIndex = (currentPage - 1) * teachersPerPage;
  const selectedTeachers = Teachers.slice(
    startIndex,
    startIndex + teachersPerPage
  );

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        {/* Header Section */}
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">{<Header />}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="w-full shadow-md rounded-lg flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 mt-6 space-y-4 sm:space-y-0">
          <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 sm:max-w-md w-full">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search here..."
              className="ml-2 w-full outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center space-x-3 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-md border border-blue-300 px-6 sm:px-8  hover:bg-blue-500 hover:text-white py-2 text-sm font-medium flex items-center">
                  <span>{selectedOption}</span>
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-white text-black w-40 shadow-md rounded-md mt-2"
              >
                <DropdownMenuItem
                  onClick={() => setSelectedOption("Newest")}
                  className="cursor-pointer hover:bg-blue-600 hover:text-white  px-4 py-2 text-center"
                >
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedOption("Oldest")}
                  className="cursor-pointer hover:bg-blue-600 hover:text-white px-4 py-2 text-center"
                >
                  Oldest
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedOption("Recent")}
                  className="cursor-pointer hover:bg-blue-600 hover:text-white px-4 py-2 text-center"
                >
                  Recent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Add Teacher Button */}
            <Button className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm">
              + Add Teacher
            </Button>
          </div>
        </div>

        {/* Teacher Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {selectedTeachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="w-full max-w-sm shadow-xl rounded-xl border border-blue-500 p-6 relative"
            >
              {/* Options Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="absolute top-4 right-4 bg-blue-100 p-2 rounded-lg shadow-sm hover:bg-gray-200">
                    <Ellipsis className="text-gray-500" size={24} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-30 bg-gray-100 mt-1 shadow-md rounded-md"
                >
                  <DropdownMenuItem
                    className="cursor-pointer text-black hover:bg-gray-200 px-4 py-2 text-center"
                    onClick={() => setOpen(true)} // Open dialog on click
                  >
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-gray-200 px-4 py-2 text-center">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* dialog box edit */}
              <Dialog  className="" open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]  bg-white/80 shadow-lg p-6 rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>

                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        defaultValue=""
                        className="w-full px-3 py-2 border rounded-md mb-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter username"
                        defaultValue=""
                        className="w-full px-3 py-2 border rounded-md mb-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Card Content */}
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="shadow-md w-24 h-24 rounded-full">
                  <AvatarImage
                    className="rounded-full"
                    src={teacher.image}
                    alt={teacher.name}
                  />
                  <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-xl font-bold">
                  {teacher.name}
                </CardTitle> 
                <CardDescription>Teacher</CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {teacher.subject.map((subj, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 px-3 py-1 rounded-lg text-sm text-blue-500 font-semibold"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-center gap-3 mt-5">
                <Button className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-indigo-700 transition-all">
                  <User size={18} /> Profile
                </Button>
                <Button className="bg-orange-500 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-orange-600 transition-all">
                  <Mail size={18} /> Chat
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500  hover:text-white"
                  }`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Teacher;
