import React, { useState } from "react";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "../../../src/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../../src/components/ui/breadcrumb";

import { Button } from "../../src/components/ui/Button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../../src/components/ui/dialog";
import AppSidebar from "../../Dashboard/Sidebar";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" }}>
      <AppSidebar    />
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
                <BreadcrumbPage>Profile Page</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Header>

        <div className="min-h-screen flex flex-col items-center p-4">
          <div className="w-full shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 mt-5">
            <h2 className="text-xl font-bold">User Profile</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-[#3d3690] text-white font-semibold px-5 py-2 rounded-lg hover:opacity-90">
                  Open Modal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Profile Details</DialogTitle>
                <DialogDescription>
                  यहाँ पर आपकी Profile Details Show होगी।
                </DialogDescription>
                <Button onClick={() => setIsOpen(false)}>Close</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProfilePage;