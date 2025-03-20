import React from 'react'
import { Button } from "../../src/components/ui/button";
import { Input } from "../../src/components/ui/input";
import { Card, CardContent } from "../../src/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../src/components/ui/table";
import { Calendar } from "../../src/components/ui/calendar";
import { Download, Search, Plus, Filter, X } from "lucide-react";

const Leads = () => {
  return (
    <>
          <div className="p-6 space-y-6">
      {/* Top Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline">Hot Leads</Button>
        <Button variant="outline">Converted Leads</Button>
        <Button variant="outline">In-Converted Leads</Button>
        <Button variant="outline">Dropped Leads</Button>
        <Button variant="outline">Total Leads</Button>
        <Button variant="default" className="flex items-center gap-2"><Plus size={16} /> Add Category</Button>
        <Button variant="default" className="flex items-center gap-2"><Plus size={16} /> Add Lead</Button>
        <Button variant="outline">My Leads</Button>
        <Button variant="outline" className="flex items-center gap-2"><Download size={16} /> Export Excel</Button>
        <Button variant="outline">All Status</Button>
        <Button variant="outline">All Category</Button>
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input placeholder="Search by Name" className="p-2" />
        <Input placeholder="Search by Email" className="p-2" />
        <Input placeholder="Search by Phone No." className="p-2" />
        <Input placeholder="Search by Assigned Name" className="p-2" />
        <Button variant="default" className="flex items-center gap-2"><Search size={16} /> Search</Button>
        <Button variant="outline" className="flex items-center gap-2"><X size={16} /> Clear</Button>
      </div>

      {/* Leads Calendar */}
      <div className="flex items-center gap-4">
        <Calendar />
        <span className="text-lg font-semibold">Select Date</span>
      </div>

      {/* Leads Table */}
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell>+1234567890</TableCell>
                <TableCell>Hot Lead</TableCell>
                <TableCell>Converted</TableCell>
              </TableRow>
              {/* More rows here */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
      
    </>
  )
}

export default Leads
