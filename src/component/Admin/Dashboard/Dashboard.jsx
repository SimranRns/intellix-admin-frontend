import React, { useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Header from "../Dashboard/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { AreaChart, Area, CartesianGrid, XAxis, BarChart, Bar } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from "../../src/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/ui/table";
import { Badge } from "../../src/components/ui/badge";
import { Button } from "../../src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../../src/components/ui/table";
// import { Card, CardContent } from "../../src/components/ui/card";
// import { ChevronLeft, ChevronRight, Printer, MoreVertical } from "lucide-react";
import { Printer, MoreVertical } from "lucide-react";

const Dashboard = () => {
  const [page, setPage] = useState(1);

  const influencers = [
    { name: "Malik Wiwoho", projects: 23, followers: "1,620,201" },
    { name: "Nancy Auta", projects: 34, followers: "1,224,620" },
    { name: "Natasha Vresta", projects: 12, followers: "1,100,491" },
    { name: "Wilona Hamda", projects: 8, followers: "927,621" },
    { name: "Riva Nanda", projects: 10, followers: "827,810" },
  ];

  const schoolPerformanceData = [
    { week: "Week 01", thisWeek: 400, lastWeek: 500 },
    { week: "Week 02", thisWeek: 300, lastWeek: 450 },
    { week: "Week 03", thisWeek: 450, lastWeek: 350 },
    { week: "Week 04", thisWeek: 500, lastWeek: 400 },
    { week: "Week 05", thisWeek: 350, lastWeek: 450 },
    { week: "Week 06", thisWeek: 300, lastWeek: 500 },
    { week: "Week 06", thisWeek: 300, lastWeek: 309 },
  ];

  const chartData = [
    { month: "January", desktop: 124, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 120 },
    { month: "June", desktop: 220, mobile: 10 },
    { month: "June", desktop: 227, mobile: 100 },
    { month: "June", desktop: 242, mobile: 30 },
    { month: "June", desktop: 241, mobile: 10 },
    { month: "June", desktop: 248, mobile: 170 },
  ];
  const teachers = [
    {
      name: "Yatin Xarma",
      subject: "Programming",
      qualification: "B.Tech",
      fee: "$117.00",
      performance: "Good",
    },
    {
      name: "Hanu Chang",
      subject: "Basic Algorithm",
      qualification: "B.E",
      fee: "$215.50",
      performance: "Good",
    },
    {
      name: "Jordan Nico",
      subject: "English",
      qualification: "B.A",
      fee: "$210.70",
      performance: "Good",
    },
    {
      name: "Nadila Adja",
      subject: "History",
      qualification: "B.A",
      fee: "$204.50",
      performance: "Bad",
    },
    {
      name: "James Brown",
      subject: "Commerce",
      qualification: "B.Com",
      fee: "$217.70",
      performance: "Good",
    },
    {
      name: "Jack John",
      subject: "Software Engg",
      qualification: "B.Tech",
      fee: "$200.10",
      performance: "Bad",
    },
    {
      name: "Tony Soap",
      subject: "IT Engg",
      qualification: "B.Tech",
      fee: "$217.70",
      performance: "Good",
    },
    {
      name: "Yatin Xarma",
      subject: "Programming",
      qualification: "B.Tech",
      fee: "$117.00",
      performance: "Good",
    },
    {
      name: "Alan Turing",
      subject: "AI & ML",
      qualification: "PhD",
      fee: "$300.00",
      performance: "Good",
    },
    {
      name: "Ada Lovelace",
      subject: "Mathematics",
      qualification: "B.Sc",
      fee: "$250.00",
      performance: "Good",
    },
  ];
  const PAGE_SIZE = 8;

  const totalPages = Math.ceil(teachers.length / PAGE_SIZE);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const paginatedTeachers = teachers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const students = [
    {
      name: "Jordan Nico",
      id: "1234567911",
      class: "XII A",
      fees: "$52.03",
      rank: "First",
      image: "/avatars/1.png",
    },
    {
      name: "Karen Hope",
      id: "1234567101",
      class: "XI B",
      fees: "$45.50",
      rank: "Second",
      image: "/avatars/2.png",
    },
    {
      name: "Nadila Adja",
      id: "1234567001",
      class: "VII C",
      fees: "$25.10",
      rank: "Third",
      image: "/avatars/3.png",
    },
    {
      name: "James Brown",
      id: "1234567231",
      class: "VI A",
      fees: "$10.00",
      rank: "First",
      image: "/avatars/4.png",
    },
    {
      name: "Dack Xarma",
      id: "1234567456",
      class: "XII B",
      fees: "$23.50",
      rank: "Second",
      image: "/avatars/5.png",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 min-h-screen p-4">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div>
          <Header />
        </div>

        {/* Stats Cards */}
        <Card className="shadow-md rounded-lg p-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "Students",
                count: "93K",
                icon: "🎓",
                color: "bg-purple-500",
              },
              {
                label: "Teachers",
                count: "74K",
                icon: "👨‍🏫",
                color: "bg-red-500",
              },
              {
                label: "Events",
                count: "40K",
                icon: "📅",
                color: "bg-yellow-500",
              },
              { label: "Foods", count: "32K", icon: "🍽", color: "bg-blue-900" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg"
              >
                <span
                  className={`text-3xl ${item.color} text-white p-3 rounded-full`}
                >
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{item.label}</h3>
                  <p className="text-2xl font-bold">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4">
                School Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {/* {schoolPerformanceData?.map((data, index) => (
                   <li key={index} className="mb-2">
                     <strong>{data?.week}:</strong> This Week - {data.thisWeek}, Last Week - {data.lastWeek}
                   </li>
                 ))} */}
              </ul>

              <ChartContainer
                config={{
                  mobile: { color: "red" },
                  desktop: { color: "#82ca9d" },
                }}
              >
                <AreaChart width={500} height={250} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <ChartTooltip />
                  <ChartLegend />
                  <Area
                    type="monotone"
                    dataKey="mobile"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="desktop"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4 ">
                School Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {/* {schoolPerformanceData?.map((data, index) => (
                   <li key={index} className="mb-2">
                     <strong>{data?.week}:</strong> This Week - {data.thisWeek}, Last Week - {data.lastWeek}
                   </li>
                 ))} */}
              </ul>

              {/* Wrapped in ChartContainer to provide context */}
              <ChartContainer
                config={{
                  mobile: { color: "#8884d8" },
                  desktop: { color: "#82ca9d" },
                }}
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="p-6 border border-slate-1000 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Teacher Details</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTeachers.map((teacher, index) => (
                  <TableRow key={index}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.qualification}</TableCell>
                    <TableCell>{teacher.fee}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          teacher.performance === "Good"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }
                      >
                        {teacher.performance}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={handlePrev}
                disabled={page === 1}
                variant="ghost"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>
                Page {page} of {totalPages}
              </span>
              <Button
                onClick={handleNext}
                disabled={page === totalPages}
                variant="ghost"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="p-4 " >
            <CardContent>
              <h2 className="text-lg font-semibold mb-4">
                Unpaid Student Intuition
              </h2>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead>Name</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Fees</TableHead>
                    <TableHead>Rank</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell className="flex items-center gap-3">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-8 h-8 rounded-full"
                        />
                        {student.name}
                      </TableCell>
                      <TableCell className="text-blue-600 font-medium">
                        ID {student.id}
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full">
                          {student.class}
                        </span>
                      </TableCell>
                      <TableCell>{student.fees}</TableCell>
                      <TableCell>{student.rank}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Printer size={18} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Showing 1 to 5 of 10 entries
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft size={16} />
                  </Button>
                  <Button variant="default" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
