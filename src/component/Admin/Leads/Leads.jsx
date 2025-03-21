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

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../src/components/ui/dropdown-menu";

import { Checkbox } from "../../src/components/ui/checkbox";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../src/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

const Leads = () => {
  const [date, setDate] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");

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

        <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between gap-2 mb-4">
            <Input
              placeholder="Search Leads..."
              className="w-1/4"
            />
            <Button variant="default" className="bg-blue-600 text-white">
              Search
            </Button>

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
                <Select
                   
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
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

            <Button variant="default" className="bg-blue-600">
              <PlusIcon className="mr-1" /> Add Leads
            </Button>

            <Button variant="default" className="bg-blue-600 ">
              My Leads
            </Button>

            <Button variant="default" className="bg-blue-600 ">
              <PlusIcon className="mr-1" /> Add Category
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-full border rounded-lg">
              <TableHeader className="bg-blue-600 ">
                <TableRow>
                  <TableHead className="w-10 text-center">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile Number</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Lead Source</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lead.map((lead) => (
                  <TableRow key={lead.id} className="border-b">
                    <TableCell className="text-center">
                      <Checkbox />
                    </TableCell>
                    <TableCell>{lead.createdAt}</TableCell>
                    <TableCell>{lead.assignedTo}</TableCell>
                    <TableCell>{lead.firstName}</TableCell>
                    <TableCell>{lead.lastName}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.mobile}</TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>{lead.leadSource}</TableCell>
                    <TableCell>{lead.updatedAt}</TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-blue-600 border-blue-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-red-600 border-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
