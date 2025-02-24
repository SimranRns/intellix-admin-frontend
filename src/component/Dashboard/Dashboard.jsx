import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../src/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../src/components/ui/table";
import Sidebar from "./Sidebar";
import { Input } from "../src/components/ui/input"




const Dashboard = () => {
  const influencers = [
    { name: "Malik Wiwoho", projects: 23, followers: "1,620,201" },
    { name: "Nancy Auta", projects: 34, followers: "1,224,620" },
    { name: "Natasha Vresta", projects: 12, followers: "1,100,491" },
    { name: "Wilona Hamda", projects: 8, followers: "927,621" },
    { name: "Riva Nanda", projects: 10, followers: "827,810" },
  ];
  return (
    <>

<div class="grid grid-flow-col grid-rows-3  mt-5 m-5">
  <div class="row-span-3"><Sidebar/></div>
  <div class="col-span-3"> <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Missed Fees:</CardTitle>
          </CardHeader>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Total collect Fees:</CardTitle>
          </CardHeader>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Total Missed Fees:</CardTitle>
          </CardHeader>
        </Card>


         
         
         

        <div className="">

          <div className="pt-3">
            <h2>Total Debit Amount</h2>
          <Input/>
          </div>
          <div className="pt-3">
          <h2>Total credit   Amount</h2>
          <Input />
          </div>
        </div>
        
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Engagement</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            48.07%
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Campaign Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">12 country</p>
            <p className="text-lg">180,807,839 user</p>
            <p className="text-lg">9 month</p>
            <p className="text-sm text-gray-500">Updated 2s ago</p>
            <button className="text-sm text-blue-500">Click to refresh</button>
          </CardContent>
        </Card>
      </div>

      <Card>
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
      </Card></div>
  {/* <div class="col-span-2 row-span-2 ...">03</div> */}
</div>
    
    



      
    </>
  );
};

export default Dashboard;


// import { Card, CardContent, CardHeader, CardTitle } from "../src/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../src/components/ui/table";
// // import { Sidebar } from "./Sidebar";
// import Sidebar from "./Sidebar";
// import { Progress } from "../src/components/ui/progress";

// export default function Dashboard() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6 space-y-6">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-4 gap-4">
//           {stats.map((stat) => (
//             <Card key={stat.title} className="shadow-md">
//               <CardHeader>
//                 <CardTitle>{stat.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-2xl font-bold">{stat.value}</p>
//                 <Progress value={stat.progress} className="mt-2" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
        
//         {/* Data Table */}
//         <Card className="shadow-md">
//           <CardHeader>
//             <CardTitle>Data Student</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Gender</TableHead>
//                   <TableHead>Course</TableHead>
//                   <TableHead>Fees</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {students.map((student) => (
//                   <TableRow key={student.id}>
//                     <TableCell>{student.name}</TableCell>
//                     <TableCell>{student.gender}</TableCell>
//                     <TableCell>{student.course}</TableCell>
//                     <TableCell>${student.fees}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }

// const stats = [
//   { title: "New Student", value: "5,100", progress: 20 },
//   { title: "Income", value: "2,000", progress: 65 },
//   { title: "Expense", value: "3,000", progress: 80 },
//   { title: "Other Income", value: "550", progress: 15 },
// ];

// const students = [
//   { id: 1, name: "John", gender: "Male", course: "Java", fees: "300.00" },
//   { id: 2, name: "Eliza", gender: "Female", course: "C#", fees: "320.00" },
//   { id: 3, name: "Dora", gender: "Female", course: "Python", fees: "310.00" },
// ];
