import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../../src/components/ui/card";
import { Badge } from "../../src/components/ui/badge";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../src/components/ui/avatar";
import { SidebarInset, SidebarProvider } from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import Header from "../Dashboard/Header";
import { Button } from "../../src/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../src/components/ui/tabs";
import { Input } from "../../src/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../../src/components/ui/form";
import { useForm } from "react-hook-form";

const View_Profile = () => {
    const form = useForm();

    return (
        <SidebarProvider style={{ "--sidebar-width": "19rem" }}>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-4 px-6 border-b shadow-md bg-white w-full">
                    <Header />
                </header>

                <div className="flex justify-center p-4 sm:p-6 w-full">
                    <Card className="w-full max-w-4xl p-4 sm:p-6 shadow-lg border rounded-xl bg-white">
                        <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Avatar className="w-20 h-20 border-2 border-blue-500">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="Anna Johnson"
                                    />
                                    <AvatarFallback>AJ</AvatarFallback>
                                </Avatar>
                                <div className="text-center sm:text-left">
                                    <h4 className="text-xl font-bold text-gray-800">Anna Johnson</h4>
                                    <p className="text-md text-gray-600">01/01/1990</p>
                                    <Badge variant="outline" className="mt-2">FEMALE</Badge>
                                </div>
                            </div>
                            <Button variant="destructive" className="flex items-center gap-2 w-full sm:w-auto">
                                <Trash className="w-5 h-5" /> Delete Client
                            </Button>
                        </CardContent>
                        <CardFooter className="flex justify-end mt-4">
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Pencil className="w-5 h-5" /> Edit
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="flex justify-center w-full mt-4 sm:mt-6">
                    <Tabs defaultValue="Profile_info" className="w-full max-w-4xl">
                        <TabsList className="grid w-full grid-cols-2 bg-blue-100 rounded-lg">
                            <TabsTrigger value="Profile_info">Profile Info</TabsTrigger>
                            <TabsTrigger value="Task">Task</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Profile_info">
                            <Card className="mt-4 p-4 sm:p-6 shadow-md border rounded-xl bg-white">
                                <CardHeader className="text-2xl font-semibold text-gray-800">
                                    Personal Details
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form className="space-y-4 sm:space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                <FormField
                                                    name="firstName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>First Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Shadcn" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name="lastName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Last Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="John" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    name="number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Enrollment Id</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="12333" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name="number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Salary</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="200000" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Highest Qualification</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="BCA" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name="date"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>DOB</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="12/2/2000" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                                <FormField
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Gender</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Female" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>


                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    name="time"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>In Time</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="10:00 AM" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name="time"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Out Time</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="7:00 PM" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>


                            <Card className="mt-4 p-4 sm:p-6 shadow-md border rounded-xl bg-white">
                                <CardHeader className="text-2xl font-semibold text-gray-800">
                                    Contact Details
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form className="space-y-4 sm:space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                <FormField
                                                    name="number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Contact No.</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="8787654989" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="email@gmail.com" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                            <Card className="mt-4 p-4 sm:p-6 shadow-md border rounded-xl bg-white">
                                <CardHeader className="text-2xl font-semibold text-gray-800">
                                    Address
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form className="space-y-4 sm:space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                <FormField
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>State</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Rajesthan" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>City</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Jaipur" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                <FormField
                                                    name="number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Zip Code</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="23232" {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Address</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Jaipur 23 " {...field} disabled />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </TabsContent>  
                        <TabsContent value="Task">
                            <Card className="mt-4 p-4 sm:p-6 shadow-md border rounded-xl bg-white">
                                <CardHeader>
                                    <h5 className="text-2xl font-semibold text-gray-800">Assigned Task</h5>
                                </CardHeader>
                                <CardContent>
                                    <Card className="p-4 shadow-md border rounded-lg bg-gray-50">
                                        <CardContent>
                                            <p className="text-lg font-medium">Assigned by: Anna Johnson</p>
                                            <p className="text-lg font-medium">Title: Course</p>
                                            <p className="text-lg font-medium">Description: Course Detail</p>
                                            <p className="text-lg font-medium">File: -</p>
                                            <p className="text-lg font-medium">Due Date: 20/02/2000</p>
                                        </CardContent>
                                    </Card>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default View_Profile;
