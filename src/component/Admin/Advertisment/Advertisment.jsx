import React, { useState } from 'react'
import AppSidebar from "../../src/components/ui/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../src/components/ui/tabs";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../../src/components/ui/sidebar";
import Header from "../Dashboard/Header";
import { Separator } from '@radix-ui/react-separator';
// import { Button } from "@headlessui/react";

const Advertisment = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    return (
        <div className="w-full min-h-screen flex flex-col">
            <SidebarProvider style={{ "--sidebar-width": "19rem" }}>
                <SidebarInset>
                    <div className="w-full">
                        <div className="w-full">
                            <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
                                <AppSidebar />
                                <SidebarInset>
                                    {/* Header Section */}
                                    <header className="flex h-16 items-center gap-2 px-4 w-full">
                                        <SidebarTrigger className="-ml-1" />
                                        <Separator orientation="vertical" className="mr-2 h-4" />
                                        <Breadcrumb className="truncate">
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
                                    {/* Tabs Section */}
                                    <Tabs defaultValue="tab1" className="m-5">
                                        <div className="overflow-x-auto md:overflow-hidden">
                                            <TabsList className="flex bg-white-500  md:grid md:grid-cols-5 gap-3 whitespace-nowrap">
                                                <TabsTrigger value="tab1" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                                                    School Info 1
                                                </TabsTrigger>
                                                <TabsTrigger value="tab2" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                                                    School Info 2
                                                </TabsTrigger>
                                                <TabsTrigger value="tab3" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                                                    School Info 3
                                                </TabsTrigger>
                                                <TabsTrigger value="tab4" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                                                    School Info 4
                                                </TabsTrigger>
                                                <TabsTrigger value="tab5" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                                                    School Info 5
                                                </TabsTrigger>
sq
                                            </TabsList>
                                        </div>
                                        <TabsContent value="tab1" className="p-4 text-left">
                                            <p className='font-semibold text-xl'>School Info 1 Content</p>
                                        </TabsContent>
                                        <TabsContent value="tab2" className="p-4 text-left">
                                            <p className='font-semibold text-xl'>School Info 2 Content</p>
                                        </TabsContent>
                                        <TabsContent value="tab3" className="p-4 text-left">
                                            <p className='font-semibold text-xl'>School Info 3 Content</p>
                                        </TabsContent>
                                        <TabsContent value="tab4" className="p-4 text-left">
                                            <p className='font-semibold text-xl'>School Info 4 Content</p>
                                        </TabsContent>
                                        <TabsContent value="tab5" className="p-4 text-left">
                                            <p className='font-semibold text-xl'>School Info 5 Content</p>
                                        </TabsContent>
                                    </Tabs>
                                </SidebarInset>
                            </SidebarProvider>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default Advertisment
