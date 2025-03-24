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

import { addDays, format } from "date-fns";
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
import { Checkbox } from "../../src/components/ui/checkbox";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
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
import { Pencil, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "../../src/components/ui/dropdown-menu";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const Leads = () => {
  const stats = [
    { title: "Views", value: "7,265", change: "+11.07%", up: true },
    { title: "Visits", value: "3,671", change: "-0.03%", up: false },
    { title: "New Users", value: "156", change: "+13.57%", up: true },
    { title: "Active Users", value: "2,318", change: "+6.08%", up: true },
  ];
  const [date, setDate] = useState(null);
  const [search, setSearch] = useState("");
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

  const lead = [
    {
      id: 1,
      createdAt: "02-06-2022 10:26",
      assignedTo: "Jayson Webb",
      firstName: "Ellie",
      lastName: "Edgington",
      email: "Ellie.Thompson@southamtyres.co.uk",
      mobile: "+07823 884562",
      company: "Micheldever Tyre Services Ltd",
      leadSource: "Web",
      updatedAt: "02-06-2022 10:26",
    },
    {
      id: 2,
      createdAt: "31-05-2022 10:26",
      assignedTo: "Jayson Webb",
      firstName: "Sunnie",
      lastName: "Browne",
      email: "sunniebrowne@live.com",
      mobile: "+447565540783",
      company: "PrintsPro / Printing",
      leadSource: "Referral",
      updatedAt: "02-06-2022 10:26",
    },
    {
      id: 3,
      createdAt: "26-05-2022 15:08",
      assignedTo: "P Vivek",
      firstName: "P",
      lastName: "Vivek",
      email: "vivek@telsamedia.com",
      mobile: "+917567774639",
      company: "Tesla Media",
      leadSource: "Social Media",
      updatedAt: "26-05-2022 15:08",
    },
    {
      id: 4,
      createdAt: "26-05-2022 15:08",
      assignedTo: "P Vivek",
      firstName: "P",
      lastName: "Vivek",
      email: "vivek@telsamedia.com",
      mobile: "+917567774639",
      company: "Tesla Media",
      leadSource: "Social Media",
      updatedAt: "26-05-2022 15:08",
    },
    {
      id: 5,
      createdAt: "26-05-2022 15:08",
      assignedTo: "P Vivek",
      firstName: "P",
      lastName: "Vivek",
      email: "vivek@telsamedia.com",
      mobile: "+917567774639",
      company: "Tesla Media",
      leadSource: "Social Media",
      updatedAt: "26-05-2022 15:08",
    },
  ];

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        {/* Header Section */}
        {/* <header className="flex h-16 gap-2 items-center px-4">
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
        </header> */}

        <div className="flex  items-center gap-6 p-6 bg-white rounded-lg">
          {/* Lead Generation Chart */}
          <Card className="w-full sm:w-[280px] md:w-[320px] flex-shrink-0 flex items-center p-4">
            <div className="flex-1">
            <CardTitle className="text-left font-semibold text-gray-600">
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
          {/* Analytics Cards - 2x2 Grid */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="w-40 md:w-44 bg-blue-50 p-4 rounded-lg shadow-md"
              >
                <CardContent className="flex flex-col items-center">
                  <span className="text-gray-600 text-sm">{stat.title}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <span
                      className={stat.up ? "text-green-600" : "text-red-600"}
                    >
                      {stat.change}
                    </span>
                    {stat.up ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                  </div>
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
                  // className={`w-[240px] justify-start text-left font-normal ${
                  //   !date ? "text-muted-foreground" : ""
                  // }`}
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
                <Button variant=" " className="bg-blue-600  text-white">
                  <PlusIcon className="mr-0" /> Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add Category </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Label htmlFor="name" className="text-left">
                    Enter Category Name
                  </Label>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input id="name" value="Enter" className="col-span-4" />
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

          <div className="overflow-x-auto">
            <Table className="min-w-full border rounded-lg">
              <TableHeader className>
                <TableRow>
                  <TableHead className="w-10 text-center">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead> Address</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile Number</TableHead>
                  <TableHead> Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lead.map((lead) => (
                  <TableRow key={lead.id} className="border-b">
                    <TableCell className="text-center">
                      <Checkbox />
                    </TableCell>
                    <TableCell>{lead.firstName}</TableCell>
                    <TableCell>{lead.lastName}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.mobile}</TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>{lead.leadSource}</TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">Open</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup>
                            <DropdownMenuRadioItem value="top">
                              Top
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom">
                              Bottom
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Leads;
