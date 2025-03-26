import React from "react";
import { Button } from "../../../src/components/ui/button";
import { Card } from "../../../src/components/ui/card";
import { Input } from "../../../src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../src/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../src/components/ui/dropdown-menu";
// import { Calendar } from "../../../src/components/ui/calendar";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const MyLeads = () => {
  const [data, setData] = useState([]);
  return (
    <div>
      <div className=" md:p-8 bg-gray-50 min-h-screen">
        <Card className="p-4 mb-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input type="date" className="w-full" />
            <Button variant="outline" className="bg-blue-600 hover:bg-blue-500">All Status</Button>
            <Button variant="outline" className="bg-blue-600 hover:bg-blue-500">All Category</Button>
            <Button variant="outline" className="bg-blue-600 hover:bg-blue-500">Export data</Button>
          </div>
          <div className="flex justify-between mt-4">
          <div>
            <Input className="w-[200px]" placeholder="Search all fields" />
          </div>
          <div className="flex justify-end gap-2">
            <Button className="bg-blue-600 text-white">Search</Button>
            <Button variant="destructive" className="bg-blue-600 text-white">Clear</Button>
          </div>
          </div>
          
        </Card>

        {/* Leads Table */}
        <Card className="p-4 overflow-auto shadow-md">
          <Table className="w-full min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Name</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center text-red-500 font-medium py-4"
                  >
                    No Results Found!
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.assigned}</TableCell>
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
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default MyLeads;
