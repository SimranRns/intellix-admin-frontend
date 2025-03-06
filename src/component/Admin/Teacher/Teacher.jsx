import React, { useState } from "react";
import AppSidebar from "../../src/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../src/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import Header from "../Dashboard/Header";
import { ChevronDown, Mail, Search, User, Ellipsis } from "lucide-react";
import { Button } from "@headlessui/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Teachers = [
  {
    name: "Munaroh Steffani",
    subject: ["Mathematics", "Science", "Art"],
    image: "https://github.com/shadcn.png",
  },
  {
    name: "Munaroh Steffani",
    subject: ["Mathematics", "Science", "Art"],
    image: "https://github.com/shadcn.png",
  },
  {
    name: "Munaroh Steffani",
    subject: ["Mathematics", "Science", "Art"],
    image: "https://github.com/shadcn.png",
  },
  {
    name: "Munaroh Steffani",
    subject: ["Mathematics", "Science", "Art"],
    image: "https://github.com/shadcn.png",
  },
  {
    name: "Munaroh Steffani",
    subject: ["Mathematics", "Science", "Art"],
    image: "https://github.com/shadcn.png",
  },
  {
    name: "Munaroh Steffani",
    subject: ["Mathematics", "Science", "Art"],
    image: "https://github.com/shadcn.png",
  },
];

const Teacher = () => {
  const [selectedOption, setSelectedOption] = useState("Newest");
  return (
    <>
      <SidebarProvider style={{ "--sidebar-width": "19rem" }}>
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
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="w-full shadow-md rounded-lg flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 mt-6 space-y-4 sm:space-y-0">
          
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search here..."
                className="ml-2  outline-none bg-transparent"
              />
            </div>

            <div className=" flex items-center space-x-3 z-10">
            
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                
                    className="rounded-md border border-blue-300 px-6 sm:px-8  hover:bg-blue-500 hover:text-white py-2 text-sm font-medium flex items-center"
                  >
                    <span>{selectedOption}</span>
                    <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="bg-gray-200 w-40 shadow-md rounded-md mt-2"
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

              {/* Add Student Button */}
              <Button className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm">
                + Add Teacher
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:grid-cols-1 gap-6 p-6 bg-gray-100 min-h-screen place-items-center">
            {Teachers.map((teacher, index) => (
              <Card
                key={index}
                className="w-[21rem] shadow-xl rounded-xl bg-white p-6 relative"
              >
                {/* 3-dot menu button */}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="absolute top-4 right-4 bg-blue-100 p-2 rounded-lg shadow-sm hover:bg-gray-200 ">
                      <Ellipsis className="text-gray-500" size={24} />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-30 bg-gray-100 mt-1 shadow-md rounded-md"
                  >
                    <DropdownMenuItem className="cursor-pointer text-black hover:bg-gray-200 px-4 py-2 text-center">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-gray-200 px-4 py-2 text-center">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <CardHeader className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24">
                    <Avatar className="shadow-md">
                      <AvatarImage
                        className="rounded-full"
                        src={teacher.image}
                        alt={teacher.name}
                      />
                      <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="mt-4 text-xl text-gray-900 font-bold">
                    {teacher.name}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Teacher
                  </CardDescription>
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
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Teacher;
