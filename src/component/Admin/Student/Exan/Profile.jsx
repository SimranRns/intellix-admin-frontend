import React from "react";
import { SidebarProvider, SidebarInset } from "../../../src/components/ui/sidebar";
import AppSidebar from "../../../src/components/ui/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../src/components/ui/breadcrumb";

import { useNavigate } from "react-router-dom";
import { Button } from "../../../src/components/ui/Button";
import Header from "../../Dashboard/Header";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">{<Header />}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="w-[100%] mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-6">
        
        {/* Name */}
        <div>
          <p className=" font-semibold">Name :</p>
          <input
            type="text"
            value="SOMYA DARIYA"
            className="w-full border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg "
            disabled
          />
        </div>

        {/* Enrollment ID */}
        <div>
          <p className="font-semibold">Enrollment ID :</p>
          <input
            type="text"
            value="12340571"
                     className="w-full border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg "
            disabled
          />
        </div>

        {/* Father's Name */}
        <div>
          <p className=" font-semibold">Father's Name :</p>
          <input
            type="text"
            value="Mr. ASHOK KUMAR DHARIYA"
                  className="w-full border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg "
            disabled
          />
        </div>

        {/* Email */}
        <div>
          <p className=" font-semibold">Email :</p>
          <input
            type="text"
            value=" SOMYA@gmail.com"
                    className="w-full border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg "
            disabled
          />
        </div>

        {/* Mother's Name */}
        <div>
          <p className=" font-semibold">Mother's Name :</p>
          <input
            type="text"
            value="Mrs. MAMTA KANAV"
                className="w-full border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg "
            disabled
          />
        </div>

        {/* Password */}
        <div>
          <p className=" font-semibold">Password :</p>
          <input
            type="text"
            value="12340571"
                     className="w-full border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg "
            disabled
          />
        </div>

        {/* Date of Birth */}
        <div>
          <p className="font-semibold">Date of Birth :</p>
          <input
            type="text"
            value="2/15/2025"
                    className="w-full border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg "
            disabled
          />
        </div>

        {/* Contact No */}
        <div>
          <p className="font-semibold">Contact No. :</p>
          <input
            type="text"
            value="9782890981"
                    className="w-full border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg "
            disabled
          />
        </div>

        {/* Aadhar No */}
        <div>
          <p className=" font-semibold">Aadhar No. :</p>
          <input
            type="text"
            value="873620679609"
                    className="w-full border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg "
            disabled
          />
        </div>

        {/* Address (अब Contact No. के नीचे है) */}
        <div>
          <p className="font-semibold">Address :</p>
          <input
            type="text"
            value="P NO. 105B SHYAM MITRA MANDAL ROAD NO. 5 JAIPUR"
                    className="w-full border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg "
            disabled
          />
        </div>
        
      </div>
    </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Profile;
