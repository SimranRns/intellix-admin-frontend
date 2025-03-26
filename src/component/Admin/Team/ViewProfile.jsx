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
    expertise: ["Machine Learning", "Data Science", "Algorithms", "AI"],
  });

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <header className="flex h-16 items-center gap-4 px-6 shadow-md rounded-b-lg">
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
      <SidebarInset>
        <div className="flex justify-center p-4 sm:p-6 w-full h-screen">
          <Card className="w-full max-w-none shadow-md border rounded-xl bg-white">
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-4">
                {["Joining Date", "D.O.B", "Phone", "Email"].map(
                  (label, index) => (
                    <div key={index}>
                      <p className="text-gray-600 font-medium">{label}</p>
                      <p className="text-lg font-semibold">
                        {label === "Joining Date" ? (
                          formdata.join_date
                        ) : label === "D.O.B" ? (
                          formdata.dob
                        ) : label === "Phone" ? (
                          formdata.phone
                        ) : (
                          <span className="text-blue-500">
                            {formdata.email}
                          </span>
                        )}
                      </p>
                    </div>
                  )
                )}
              </div>

              <Separator className="my-6" />

              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <div className="space-y-2">
                {formdata.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 bg-gray-100"
                  >
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <h3 className="text-xl font-semibold mb-2">Address</h3>
              {formdata.address.map((ads, index) => (
                <div key={index} className="p-3 border rounded-lg bg-gray-100">
                  <p className="font-medium">State: {ads.state}</p>
                  <p className="font-semibold">City: {ads.city}</p>
                  <p className="font-semibold">Zip Code: {ads.zip_code}</p>
                  <p className="font-semibold">Address: {ads.adrs}</p>
                </div>
              ))}

              <Separator className="my-6" />

              <h3 className="text-xl font-semibold mb-2">School</h3>
              {formdata.job.map((job, index) => (
                <div key={index} className="p-3 border rounded-lg bg-gray-100">
                  <p className="font-medium">Enrollment ID: {job.enrol}</p>
                  <p className="font-semibold">Salary: {job.salary}</p>
                </div>
              ))}

              <Separator className="my-6" />

              <h3 className="text-xl font-semibold mb-2">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {formdata.expertise.map((item, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ViewProfile;
