import React, { useState } from "react";
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

import { Button } from "../../src/components/ui/button";
import { Input } from "../../src/components/ui/input";

import { format } from "date-fns";
import { CalendarIcon, DownloadIcon, PlusIcon } from "lucide-react";

import { Calendar } from "../../src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../src/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/ui/select";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../src/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../src/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import { Label } from "../../src/components/ui/label";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../src/components/ui/dropdown-menu";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ChevronRight } from "lucide-react";

const Leads = () => {
  
  const [categoryName, setCategoryName] = useState("");
  const stats = [
    { title: "Views", value: "7,265", change: "+11.07%", up: true },
    { title: "Visits", value: "3,671", change: "-0.03%", up: false },
    { title: "New Users", value: "156", change: "+13.57%", up: true },
    { title: "Active Users", value: "2,318", change: "+6.08%", up: true },
  ];
  const [date, setDate] = useState(null);
  // const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");

  const data = [
    { name: "JavaScript", value: 30, color: "#E91E63" }, // Pink
    { name: "HTML/CSS", value: 20, color: "#FF9800" }, // Orange
    { name: "Python", value: 25, color: "#FFEB3B" }, // Yellow
    { name: "SQL", value: 20, color: "#4CAF50" }, // Green
    { name: "TypeScript", value: 5, color: "#673AB7" }, // Purple
  ];

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Ellie Edgington",
      company: "Micheldev Tyre Services Ltd",
      status: "New",
      category: "Automobile",
    },
    {
      id: 2,
      name: "Sunnie Browne",
      company: "PrintsPro / Printing",
      status: "In Progress",
      category: "Marketing",
    },
    {
      id: 3,
      name: "P Vivek",
      company: "Tesla Media",
      status: "Completed",
      category: "Technology",
    },
  ]);

  const data1 = [
    {
      name: "dvsn",
      address: "jaipur",
      email: "myselfyashu6@gmail.com",
      phone: "78787643565",
      category: "industory2",
      status: "Converted",
      assigned: "shivi",
      time: "24-02-2024",
    },
    {
      name: "dvsn",
      address: "jaipur",
      email: "myselfyashu6@gmail.com",
      phone: "78787643565",
      category: "industory2",
      status: "Inconservation",
      assigned: "veer",
      time: "24-02-2024",
    },
    {
      name: "dvsn",
      address: "jaipur",
      email: "myselfyashu6@gmail.com",
      phone: "78787643565",
      category: "Inconservation",
      status: "Inconservation",
      assigned: "Amrita",
      time: "24-02-2024",
    },
  ];
  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        {/* Header Section */}
        <header className="flex h-16 gap-2 items-center px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4 mr-2" />
          <Breadcrumb>
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

        <div className="flex flex-col md:flex-row items-center gap-6 p-6  rounded-lg">
          {/* Lead Generation Chart */}
          <Card className="w-full sm:w-[280px] md:w-[320px] flex-shrink-0 flex flex-col items-center p-4">
            <div className="flex-1 w-full">
              <CardTitle className="text-left font-semibold">
                Highest Source of Lead Generation
              </CardTitle>
              <CardHeader>
                <CardTitle className="text-left text-lg font-semibold">
                  Total Leads: 10
                </CardTitle>
              </CardHeader>
            </div>
            <div className="h-20 w-40 flex justify-center items-center">
              <PieChart width={120} height={120}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  innerRadius={20}
                  dataKey="value"
                  label={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full ">
            {[
              { title: "Hot Leads", value: "30.00", change: "+5", up: true },
              { title: "Converted Leads", value: "10.00", change: "-2", up: false },
              { title: "In Conversation Leads", value: "50.00", change: "+8", up: true },
              { title: "Dropped Leads", value: "10.00", change: "-3", up: false }
            ].map((stat, index) => (
              <Card
                key={index}
                className="w-full md:w-44  p-4 rounded-lg shadow-md "
              >
                <CardContent className="flex flex-col align-center pt-9 text-center">
                  <span className="text-sm ">{stat.title}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                 
                </CardContent>
              </Card>
            ))}
          </div>

        </div>

        <div className="p-6 rounded-lg shadow-md max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between gap-2 mb-4">
            <Input placeholder="Search Leads..." className="w-1/4" />
            <Button className="bg-blue-600 text-white ">Search</Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{category}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategory("All Categories")}>
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategory("Automobile")}>
                  Automobile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategory("Marketing")}>
                  Marketing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{status}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatus("All Status")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatus("New")}>
                  New
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatus("In Progress")}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatus("Completed")}>
                  Completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline">
              <DownloadIcon className="h-4 w-4 mr-2" /> Export to Excel
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-[240px] justify-start text-left font-normal ${
                    !date ? "text-muted-foreground" : ""
                  }`}
                >
                  <CalendarIcon className="mr-2" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="flex w-auto flex-col space-y-2 p-2"
              >
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select " />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="1">Tomorrow</SelectItem>
                    <SelectItem value="3">In 3 days</SelectItem>
                    <SelectItem value="7">In a week</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
              </PopoverContent>
            </Popover>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-600 text-white">
                  <PlusIcon className="mr-1" /> Add Leads
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add Leads </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="name"
                      value="Enter Name"
                      className="col-span-4"
                    />
                    <Input
                      id="name"
                      value="Enter Email"
                      className="col-span-4"
                    />
                    <Input
                      id="name"
                      value="Enter Address"
                      className="col-span-4"
                    />
                    <Input
                      id="name"
                      value="Enter Contect"
                      className="col-span-4"
                    />
                    <Select>
                      <SelectTrigger>
                        <SelectValue
                          className="span-10"
                          placeholder="Select Categories"
                        />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Nextjs</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxtjs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
      <DialogTrigger asChild>
        <Button variant=" " className="bg-blue-600 text-white">
          <PlusIcon className="mr-0" /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="name" className="text-left">
            Enter Category Name
          </Label>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            <Button variant="default" className="bg-blue-600 ">
              My Leads
            </Button>
          </div>

          <Card className="p-4 w-full overflow-hidden">
            <div className="w-full h-40 overflow-y-auto border rounded-md">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Name</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data1.map((item, index) => (
                    <TableRow key={index} className="">
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.assigned}</TableCell>
                      <TableCell>{item.time}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              <ChevronRight size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuItem>Assign Leads</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Leads;
