import { Separator } from '@radix-ui/react-separator';
import AppSidebar from '../../../src/components/ui/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../../src/components/ui/sidebar';
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../../src/components/ui/breadcrumb';
import Header from '../../Dashboard/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../src/components/ui/tabs";
// import { ArrowBack } from '@mui/icons-material';
import { Button } from '@headlessui/react';

const Payment_History = () => {

    const missedPayments = [
        { id: 1, amount: "₹5000", missed: "3000", dueDate: "2025-04-10  " },
        { id: 2, amount: "₹3000", missed: "3000", dueDate: "2025-04-15" }
    ];

    const upcomingPayments = [
        { id: 3, amount: "₹7000", upcoming: "4000", dueDate: "2025-04-20" },
        { id: 4, amount: "₹4500", upcoming: "4000", dueDate: "2025-04-25" }
    ];

    const paidPayments = [
        { id: 5, amount: "₹2000", paid: "5000", dueDate: "2025-03-01" },
        { id: 6, amount: "₹8000", paid: "5000", dueDate: "2025-03-05" }
    ];

    const goback = () => {
        window.history.back();
    }

    return (
        <div className="min-h-screen flex">
            <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 items-center gap-4 px-6 shadow-md rounded-b-lg">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-6" />
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
                                        Payment History
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>

                    <div className='p-6'>
                        <Tabs defaultValue="missed" className="w-full">
                            <div className='flex justify-between p-6'>
                                <Button className="border-2 border-gray-300 rounded-lg flex items-center gap-2 py-2 px-6" onClick={goback}>
                                    <ArrowBack />
                                    Payment Details
                                </Button>
                                <TabsList className="h-12 bg-transparent">
                                    <TabsTrigger value="missed" className="px-4 py-2 font-semibold">Missed</TabsTrigger>
                                    <TabsTrigger value="upcoming" className="px-4 py-2 font-semibold">Upcoming</TabsTrigger>
                                    <TabsTrigger value="paid" className="px-4 py-2 font-semibold">Paid</TabsTrigger>
                                </TabsList>
                            </div>

                            {['missed', 'upcoming', 'paid'].map((tab) => (
                                <TabsContent key={tab} value={tab} className="p-6 mt-4 rounded-lg shadow-lg">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr>
                                                <th className="p-3 border border-gray-300 text-center font-medium">ID</th>
                                                <th className="p-3 border border-gray-300 text-center font-medium">Total Amount</th>
                                                <th className="p-3 border border-gray-300 text-center font-medium">{tab === 'missed' ? 'Missed' : tab === 'upcoming' ? 'Upcoming' : 'Paid'}</th>
                                                <th className="p-3 border border-gray-300 text-center font-medium">Due Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(tab === 'missed' ? missedPayments : tab === 'upcoming' ? upcomingPayments : paidPayments).map((item) => (
                                                <tr key={item.id}>
                                                    <td className="border border-gray-300 p-2 text-center">{item.id}</td>
                                                    <td className="border border-gray-300 p-2 text-center">{item.amount}</td>
                                                    <td className="border border-gray-300 p-2 text-center">{tab === 'missed' ? item.missed : tab === 'upcoming' ? item.upcoming : item.paid}</td>
                                                    <td className="border border-gray-300 p-2 text-center">{item.dueDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default Payment_History;
