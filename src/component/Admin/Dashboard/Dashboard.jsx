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
import {
  Bar,
  Line,
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

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

        <Card className="bg-white shadow-md rounded-lg p-6 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

      
     
    
      </div>
    </div>
  );
};

export default Dashboard;
