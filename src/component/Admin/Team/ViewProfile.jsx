import React, { useState } from "react";
import { Card, CardContent } from "../../src/components/ui/card";
import { Badge } from "../../src/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../src/components/ui/avatar";
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
import { Button } from "@headlessui/react";
import { ArrowLeft } from "lucide-react";

const ViewProfile = () => {
  const [formdata] = useState({
    name: "John Doe",
    title: "Senior Lecturer",
    img: "https://via.placeholder.com/150",
    join_date: "02/03/2025",
    dob: "12-Feb-2005",
    phone: "+91 1234567899",
    email: "johndoe@email.com",
    education: [
      { degree: "B.Sc in Computer Science", year: "2010-2014" },
      { degree: "M.Sc in Data Analytics", year: "2015-2017" },
    ],
    address: [
      {
        state: "Rajasthan",
        city: "Jaipur",
        zip_code: "303030",
        adrs: "49 Laxmi Vihar",
      },
    ],
    job: [{ enrol: "233455", salary: "20000" }],
  });
  const goback = () => {
    window.history.back();
  };
  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      {/* Pass setActivePage to Sidebar */}
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Button
          onClick={goback}
          className="w-20 shadow-md rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 text-white bg-indigo-600 hover:bg-indigo-700  gap-3"
        >
          <ArrowLeft className="w-5 h-5" /> 
        </Button>
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 w-full h-screen flex flex-col items-center">
            <Card className="w-full max-w-4xl shadow-md border rounded-xl ">
              <div className="relative w-full h-40 bg-indigo-700 rounded-t-xl flex items-center px-6">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg absolute -bottom-12 left-6">
                  <AvatarImage src={formdata.img} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="ml-32 mt-10">
                  <h2 className="text-2xl font-bold text-white">
                    {formdata.name}
                  </h2>
                  <p className="text-md text-white opacity-80">
                    {formdata.title}
                  </p>
                </div>
              </div>

              <CardContent className="mt-16 px-4 sm:px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-4">
                  {["Joining Date", "D.O.B", "Phone", "Email"].map(
                    (label, index) => (
                      <div key={index}>
                        <p className="text-gray-600 font-medium">{label}</p>
                        <p className="text-lg font-semibold">
                          {label === "Joining Date"
                            ? formdata.join_date
                            : label === "D.O.B"
                            ? formdata.dob
                            : label === "Phone"
                            ? formdata.phone
                            : formdata.email}
                        </p>
                      </div>
                    )
                  )}
                </div>

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <div className="space-y-2">
                  {formdata.education.map((edu, index) => (
                    <div key={index} className="border rounded-lg p-3 ">
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-gray-600">{edu.year}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">Address</h3>
                {formdata.address.map((ads, index) => (
                  <div key={index} className="p-3 border rounded-lg ">
                    <p className="font-medium">State: {ads.state}</p>
                    <p className="font-semibold">City: {ads.city}</p>
                    <p className="font-semibold">Zip Code: {ads.zip_code}</p>
                    <p className="font-semibold">Address: {ads.adrs}</p>
                  </div>
                ))}

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">School</h3>
                {formdata.job.map((job, index) => (
                  <div key={index} className="p-3 border rounded-lg ">
                    <p className="font-medium">Enrollment ID: {job.enrol}</p>
                    <p className="font-semibold">Salary: {job.salary}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ViewProfile;
