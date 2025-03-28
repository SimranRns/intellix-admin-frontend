import { Separator } from "@radix-ui/react-separator";
import AppSidebar from "../../src/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../src/components/ui/sidebar";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import Header from "../Dashboard/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DepartmentAccess = () => {
  const [grantAccess, setGrantAccess] = useState([
    "Teaching",
    "Academics",
    "Leads",
    "Leads",
    "Leads",
    "Leads",

    "Sports",
  ]);
  const [availableAccess, setAvailableAccess] = useState([
    "Library",
    "Hostel",
    "Exams",
    "Cultural Activities",
    "Cultural Activities",
    "Cultural Activities",
    "Cultural Activities",
    "Cultural Activities",
  ]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex  to-blue-50">
      <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 items-center gap-4 px-6  shadow-md rounded-b-lg">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    <Header />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-lg font-semibold text-gray-700">
                    Department Access
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <div className="p-10  mt-5">
            <Button
              onClick={goBack}
              className=" hover:bg-blue-500 hover:text-white flex items-center gap-3 px-6 py-4 mb-8 rounded-lg shadow-md transition duration-300"
            >
              <ArrowLeft size={22} /> Go Back
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
              {/* Granted Access */}
              <Card className="shadow-md rounded-xl overflow-hidden shadow-blue-400/50 h-[33em] mt-4">
                <CardHeader className="bg-blue-500 text-white py-5 text-center">
                  <CardTitle className="text-xl font-bold tracking-wide">
                    Granted Access
                  </CardTitle>
                </CardHeader>
                <CardContent className=" h-[30em] overflow-y-auto scrollbar-hide">
                  <ul>
                    {grantAccess.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center px-6 py-4 border-b last:border-none "
                      >
                        <span className="text-lg font-medium ">{item}</span>
                        <Button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md">
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Available Access */}
              <Card className="shadow-md rounded-xl overflow-hidden shadow-blue-400/50 mt-4 h-[33em] ">
                <CardHeader className="bg-green-500 text-white py-5 text-center">
                  <CardTitle className="text-xl font-bold tracking-wide">
                    Available Access
                  </CardTitle>
                </CardHeader>
                <CardContent className=" h-[30em] overflow-y-auto scrollbar-hide">
                  <ul>
                    {availableAccess.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center px-6 py-4 border-b last:border-none "
                      >
                        <span className="text-lg font-medium ">{item}</span>
                        <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md">
                          Add
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DepartmentAccess;
