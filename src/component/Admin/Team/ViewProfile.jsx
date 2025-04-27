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
  const profile = useSelector((state) => state.team?.profile?.getSingleEmployee);
  console.log(profile, 'p');


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
                      <AvatarImage className="rounded-full border-4 border-blue-600"
                        src={profile?.image || "https://img.freepik.com/premium-vector/man-profile_1083548-15963.jpg"}
                        alt={profile?.first_name || "teacher"} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold text-white">
                      {profile?.first_name}
                    </h2>
                    <p className="text-md text-white opacity-80">
                      {profile?.department}
                    </p>
                  </div>
                </>




              </div>

              <CardContent className="mt-16 px-4 sm:px-6 pb-6">
                <div className="flex flex-col sm:flex-row gap-6 mt-6">
                  {/* Profile Info Box */}
                  <div className="flex-1 shadow-md rounded-2xl p-3">
                    <h2 className="text-2xl font-bold mb-6">Employee Details</h2>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-500">Joining Date</p>
                        <p className="text-lg font-semibold text-gray-500">{profile?.joining_date || "N/A"}</p>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="text-lg font-semibold text-gray-500">{profile?.date_of_birth || "N/A"}</p>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-500">Contact Number</p>
                        <p className="text-lg font-semibold text-gray-500">{profile?.contact_number || "N/A"}</p>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-lg font-semibold text-gray-500">{profile?.email || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>



                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <div className="p-6 border rounded-2xl mt-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-500">Education Details</h2>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Highest Qualification</p>
                      <p className="text-lg font-semibold text-gray-500">{profile?.highest_qualification || "N/A"}</p>
                    </div>
                  </div>
                </div>


                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">Address</h3>

                <div className="p-6 border rounded-2xl  mt-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-500">Permanent Address</h2>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">State</p>
                      <p className="text-lg font-semibold text-gray-500">{profile?.permanent_state || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">City</p>
                      <p className="text-lg font-semibold text-gray-500">{profile?.permanent_district || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Zip Code</p>
                      <p className="text-lg font-semibold text-gray-500">{profile?.permanent_pincode || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-lg font-semibold text-gray-500">{profile?.permanent_address || "N/A"}</p>
                    </div>
                  </div>
                </div>



                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">Personal Details</h3>
                <div className="p-6 border rounded-2xl  mt-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-500">Bank Details</h2>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Account Number</p>
                      <p className="text-lg font-semibold text-gray-500">{profile?.account_number || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">IFSC Code</p>
                      <p className="text-lg font-semibold text-gray-500">{profile?.ifsc_code || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Account Holder Name</p>
                      <p className="text-lg font-semibold text-gray-500">{profile?.account_holder_name || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="text-lg font-semibold text-gray-500">{profile?.salary || "N/A"}</p>
                    </div>
                  </div>
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
