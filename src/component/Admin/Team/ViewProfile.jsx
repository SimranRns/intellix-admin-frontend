import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getoneemployee } from "../../../Redux_store/Api/TeamApi";
import { useParams } from "react-router";

const ViewProfile = () => {
  const { id } = useParams();


  const dispatch = useDispatch()
  const profile = useSelector((state) => state.team.profile.getSingleEmployee);
  console.log(profile,'p');
  

  useEffect(() => {
    if (id) {
      dispatch(getoneemployee(id));
    }
  }, [dispatch, id]);

  // ... rest of your code

  const goback = () => {
    window.history.back();
  };
  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>

      <AppSidebar />
      <SidebarInset>
        <Header />
        <Button
          className="w-[150px] bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
          onClick={goback}
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline">Back to Team</span>
        </Button>
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 w-full h-screen flex flex-col items-center">
            <Card className="w-full max-w-4xl shadow-md border rounded-xl ">
              <div className="relative w-full h-40 bg-indigo-700 rounded-t-xl flex items-center px-6">


                <>
                  <div className="ml-32 mt-10">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg absolute -bottom-12 left-6">
                      <AvatarImage />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold text-white">
                      {profile?.first_name}
                    </h2>
                    <p className="text-md text-white opacity-80">
                      Teacher
                    </p>
                  </div>
                </>




              </div>

              <CardContent className="mt-16 px-4 sm:px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  {/* Profile Info Box */}
                  <div className=" shadow-md rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-bold  mb-4 text-left">Employee Details</h2>
                    <div className="space-y-3 text-left">
                      <div>
                        <p className="text-sm ">Joining Date</p>
                        <p className="text-lg font-semibold ">{profile?.joining_date || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm ">Date of Birth</p>
                        <p className="text-lg font-semibold ">{profile?.date_of_birth || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm ">Contact Number</p>
                        <p className="text-lg font-semibold ">{profile?.contact_number || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm ">Email</p>
                        <p className="text-lg font-semibold ">{profile?.email || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>


                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <div className="space-y-2">

                  <div className="border rounded-lg p-3 ">
                    <p className="font-medium">{profile?.highest_qualification}</p>
                    {/* <p className="text-gray-600">{edu.year}</p> */}
                  </div>

                </div>

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">Address</h3>

                <div className="p-3 border rounded-lg ">
                  <p className="font-medium">State: {profile?.permanent_state}</p>
                  <p className="font-semibold">City: {profile?.permanent_district}</p>
                  <p className="font-semibold">Zip Code: {profile?.permanent_pincode}</p>
                  <p className="font-semibold">Address: {profile?.permanent_address}</p>
                </div>


                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">School</h3>

                <div className="p-3 border rounded-lg ">
                  <p className="font-medium">Account Number: {profile?.account_number}</p>
                  <p className="font-semibold">IFSC_CODE: {profile?.ifsc_code}</p>
                  <p className="font-semibold">account holder name: {profile?.account_holder_name}</p>
                  <p className="font-semibold">Salary: {profile?.salary}</p>
                </div>

              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ViewProfile;
