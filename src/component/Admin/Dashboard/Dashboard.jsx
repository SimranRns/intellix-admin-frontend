import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import Header from "../Dashboard/Header";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../src/components/ui/table";
import { Input } from "../../src/components/ui/input";

const Dashboard = () => {
  const influencers = [
    { name: "Malik Wiwoho", projects: 23, followers: "1,620,201" },
    { name: "Nancy Auta", projects: 34, followers: "1,224,620" },
    { name: "Natasha Vresta", projects: 12, followers: "1,100,491" },
    { name: "Wilona Hamda", projects: 8, followers: "927,621" },
    { name: "Riva Nanda", projects: 10, followers: "827,810" },
  ];
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 min-h-screen p-4">
        <Sidebar />
      </div>
      <div className="flex-1 p-4">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <Card className="bg-red-600">
            <CardHeader>
              <CardTitle>Total Missed Fees:</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-green-500">
            <CardHeader>
              <CardTitle>Total Collected Fees:</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-yellow-400">
            <CardHeader>
              <CardTitle>Total Pending Fees:</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div>
            <h2 className="text-lg font-semibold">Total Debit Amount</h2>
            <Input className="w-full" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Total Credit Amount</h2>
            <Input className="w-full" />
          </div>
        </div>

        {/* Table Section */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Influencer</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Followers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {influencers.map((influencer, index) => (
                  <TableRow key={index}>
                    <TableCell>{influencer.name}</TableCell>
                    <TableCell>{influencer.projects}</TableCell>
                    <TableCell>{influencer.followers}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
