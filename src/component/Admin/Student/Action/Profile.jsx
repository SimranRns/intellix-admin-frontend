import React from "react";
import { Card, CardContent } from "../../../src/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../src/components/ui/avatar";
import { SidebarInset, SidebarProvider } from "../../../src/components/ui/sidebar";
import AppSidebar from "../../../src/components/ui/app-sidebar";
import { Separator } from "../../../src/components/ui/separator";
import { Button } from "@headlessui/react";
import { ArrowLeft } from "lucide-react";
import Header from "../../Dashboard/Header";

const Profile = () => {
  const userData = {
    name: "SOMYA DARIYA",
    dob: "15-Feb-2025",
    email: "SOMYA@gmail.com",
    phone: "+91 9782890981",
    joiningDate: "02/03/2025",
    enrollmentId: "12340571",
    fatherName: "Mr. ASHOK KUMAR DHARIYA",
    motherName: "Mrs. MAMTA KANAV",
    aadhar: "873620679609",
    address: "P NO. 105B SHYAM MITRA MANDAL ROAD NO. 5 JAIPUR",
  };

  const personalFields = ["name", "dob", "email", "phone", "joiningDate"];
  const otherFields = [
    { label: "Enrollment ID", value: userData.enrollmentId },
    { label: "Father Name", value: userData.fatherName },
    { label: "Mother Name", value: userData.motherName },
    { label: "Aadhar", value: userData.aadhar },
    { label: "Address", value: userData.address },
  ];

  const goback = () => {
    window.history.back();
  };

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Button
          onClick={goback}
          className="w-20 shadow-md rounded-lg flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 gap-3 mt-3 m-2"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        <main className="flex-1 overflow-auto flex justify-center p-6">
          <Card className="w-full max-w-4xl shadow-md border rounded-xl">
            <div className="relative w-full h-40 bg-indigo-700 rounded-t-xl flex items-center px-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg absolute -bottom-12 left-6">
                <AvatarImage src="https://via.placeholder.com/150" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className="ml-32 mt-10">
                <h2 className="text-2xl font-bold text-white ">{userData.name}</h2>
                <p className="text-md text-white  opacity-80">Senior Lecturer</p>
              </div>
            </div>
            <CardContent className="mt-16 px-4 sm:px-6 pb-6">
              {/* Personal Details Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-4">
                {personalFields.map((field, index) => (
                  <div key={index}>
                    <p className="font-medium">{field.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-lg font-semibold">{userData[field]}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              {/* Education & Other Details Section */}
              <h3 className="text-lg font-bold">Education & Other Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-4">
                {otherFields.map((detail, index) => (
                  <div key={index} className="border p-4 rounded-md shadow-md ">
                    <p className="font-medium">{detail.label}</p>
                    <p className="text-lg font-semibold">{detail.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Profile;