import React, { useState } from "react";
import { Button } from "../../src/components/ui/button";
import { Card } from "../../src/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../src/components/ui/tabs";
import { Input } from "../../src/components/ui/input";
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

const Support = () => {
  const tickets = [
    {
      id: 1,
      title: "Nshans",
      description: "marksheet 2",
      user: "Hsuana",
      status: "unsolved",
      image: "/images/ticket1.jpg",
    },
    {
      id: 2,
      title: "This is complaining",
      description: "Here is doubt",
      user: "mohan",
      status: "unsolved",
      image: "/images/ticket2.jpg",
    },
    {
      id: 3,
      title: "gone wrong",
      description: "something",
      user: "mohan",
      status: "unsolved",
      image: "/images/ticket3.jpg",
    },
  ];

  const [activeTab, setActiveTab] = useState("unsolved");
  const [search, setSearch] = useState("");
  const [ticketData, setTicketData] = useState(tickets);

  const handleSolve = (id) => {
    setTicketData((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "solved" } : ticket
      )
    );
  };

  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">{<Header />}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Support</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto mt-11">
         
         <div className="flex ">
         <Tabs
                defaultValue="unsolved"
                onValueChange={setActiveTab}
                className="flex justify-self-start mb-4 md:mb-6"
            >
                <TabsList className="p-2 rounded-lg inline-flex shadow-sm">
                <TabsTrigger
                    value="unsolved"
                    className={`px-4 md:px-6 py-2 rounded-md font-medium transition-all ${
                    activeTab === "unsolved"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Unsolved
                </TabsTrigger>
                <TabsTrigger
                    value="solved"
                    className={`px-4 md:px-6 py-2 rounded-md font-medium transition-all ${
                    activeTab === "solved"
                        ? "bg-green-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Solved
                </TabsTrigger>
                </TabsList>
            </Tabs>

          <div className="flex flex-col md:flex-row justify-end gap-4 mb-4 md:mb-6">
            <Input
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 border-gray-300 rounded-lg px-4 py-2 shadow-sm"
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
                  className="bg-white shadow-lg rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center transition-transform hover:scale-105"
                >
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-lg border shadow-sm object-cover"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                      {ticket.title}
                    </h2>
                    <p className="text-sm text-gray-500">{ticket.user}</p>
                    <p className="text-sm text-gray-700 mt-1 md:mt-2">
                      {ticket.description}
                    </p>
                    {ticket.status === "unsolved" && (
                      <Button
                        className="mt-3 md:mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
                        onClick={() => handleSolve(ticket.id)}
                      >
                        Mark as Solved
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Support;
