import React, { useState } from "react";
import { Button } from "../../src/components/ui/button";
import { Card } from "../../src/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../src/components/ui/tabs";
import { Input } from "../../src/components/ui/input";
import myimg from "../Support/images/ki.jpeg";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import { Separator } from "../../src/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import Header from "../Dashboard/Header";
import { Badge, CalendarIcon, SearchIcon } from "lucide-react";
import { format } from "date-fns";

const Support = () => {
  const initialTickets = [
    {
      id: 1,
      title: "Nshans",
      description: "marksheet 1",
      status: "solved", // Changed status to "solved"
      image: myimg,
      solvedAt: new Date("2025-03-18T15:27:07"), 
      messsage: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
    },
    {
      id: 2,
      title: "This is complaining",
      description: "Here is doubt",
      user: "mohan",
      status: "unsolved",
      image: myimg,
      solvedAt: null,
    },
    {
      id: 3,
      title: "gone wrong",
      description: "something",
      user: "mohan",
      status: "unsolved",
      image: myimg,
      solvedAt: null,
    },
    {
      id: 4,
      title: "gone wrong",
      description: "something",
      user: "mohan",
      status: "unsolved",
      image: myimg,
      solvedAt: null,
    },
    {
      id: 10,
      title: "hans",
      description: "marksheet 2",
      status: "solved", // Changed status to "solved"
      image: myimg,
      solvedAt: new Date("2025-03-18T15:27:07"), 
      messsage: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
    },
    {
      id: 11,
      title: "Nshans",
      description: "marksheet 3",
      status: "solved", // Changed status to "solved"
      image: myimg,
      solvedAt: new Date("2025-03-18T15:27:07"), 
      messsage: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
    },
    
  ];

  const [activeTab, setActiveTab] = useState("solved");
  const [search, setSearch] = useState("");
  const [ticketData, setTicketData] = useState(initialTickets);

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
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="W-full">
          <div className="p-4 md:p-8 max-w-10xl W-full">
            <div className="flex justify-between">
              <div>
                <Tabs
                  defaultValue="solved" // Set default tab to "solved"
                  onValueChange={setActiveTab}
                  className="flex justify-self-start mb-4 md:mb-6"
                >
                  <TabsList className="p-2 rounded-lg inline-flex shadow-sm">
                    <TabsTrigger
                      value="unsolved"
                      className={`px-4 md:px-6 py-2 rounded-md font-medium transition-all ${
                        activeTab === "unsolved"
                          ? "bg-indigo-600 text-white"
                          : " hover:bg-gray-200"
                      }`}
                    >
                      Unsolved
                    </TabsTrigger>
                    <TabsTrigger
                      value="solved"
                      className={`px-4 md:px-6 py-2 rounded-md font-medium transition-all ${
                        activeTab === "solved"
                          ? "bg-green-600 text-white"
                          : " hover:bg-gray-200"
                      }`}
                    >
                      Solved
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex flex-col md:flex-row justify-end gap-4 mb-4 md:mb-6">
                <Input
                  placeholder="Search tickets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full md:w-1/2 lg:w-2/3 border-gray-300 rounded-lg px-4 py-2 shadow-sm"
                />

                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-6 py-2 rounded-lg shadow-lg transition-all">
                  Search
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ticketData
                .filter(
                  (ticket) =>
                    ticket.status === activeTab &&
                    ticket.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((ticket) => (
                  <Card
                    key={ticket.id}
                    className=" shadow-lg rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center transition-transform hover:scale-105 w-100"
                  >
                    <img
                      src={ticket.image}
                      alt={ticket.title}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-lg border shadow-sm object-cover"
                    />
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-lg md:text-xl font-semibold ">
                        {ticket.title}
                      </h2>
                      <p className="text-sm ">{ticket.user}</p>
                      <p className="text-sm  mt-1 md:mt-2">
                        {ticket.description}
                      </p>
                      {ticket.status === "unsolved" && (
                        <Button
                          className="mt-3 md:mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
                          // Removed onClick
                        >
                          Mark as Solved
                        </Button>
                      )}
                      {ticket.status === "solved" && (
                        <div className="mt-3 md:mt-4">
                          <p className="text-xs text-gray-300 flex items-center">
                            <CalendarIcon className="mr-1 h-3 w-3" />:{" "}
                            {ticket.solvedAt
                              ? format(ticket.solvedAt, "yyyy-MM-dd HH:mm:ss")
                              : "N/A"}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center">
                            {
                              ticket.messsage
                            }
                          </p>
                          <Button
                            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
                            // Removed onClick
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Support;
