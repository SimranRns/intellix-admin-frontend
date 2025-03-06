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
import { Button } from "@headlessui/react";
import { ChevronDown, Search } from "lucide-react";

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
            {/* Search Input */}
            <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search here..."
                className="ml-2 w-full outline-none bg-transparent"
              />
            </div>

            {/* Dropdown & Add Button */}
            <div className="flex items-center space-x-3">
              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    // variant="outline"
                    className="rounded-md border border-blue-300 px-6 sm:px-8 hover:bg-blue-500 hover:text-white py-2 text-sm font-medium flex items-center"
                  >
                    <span>{selectedOption}</span>
                    <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-40 shadow-md rounded-md"
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
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Teacher;
