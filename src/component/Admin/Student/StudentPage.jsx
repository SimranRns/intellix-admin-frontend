// import React, { useState } from "react";
// import {
//   Search,
//   ChevronDown,
//   MoreVertical,
//   ChevronRight,
//   ChevronLeft,
// } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../src/components/ui/table";

// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../src/components/ui/dropdown-menu";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../src/components/ui/dialog";


// import { Button } from "../../src/components/ui/Button";
// import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../src/components/ui/sidebar";
// import AppSidebar from "../../src/components/ui/app-sidebar";
// import { Separator } from "@radix-ui/react-separator";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../src/components/ui/breadcrumb";
// import Header from "../Dashboard/Header";
// import { Label } from "../../src/components/ui/label";
// import { Input } from "../../src/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../src/components/ui/select";

// const studentGroups = [
//   {
//     id: "123456789",
//     name: "Samantha William",
//     fatherName: "Mana William",
//     batch: "Batch A",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
//   },
//   {
//     id: "678912345",
//     name: "Emily Clarke",
//     fatherName: "John Clarke",
//     batch: "Batch E",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
//   },
// ];

// const PAGE_SIZE = 5;

// const StudentHeader = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   let totalPages = Math.ceil(studentGroups.length / PAGE_SIZE);

//   const displayedStudents = studentGroups.slice(
//     (currentPage - 1) * PAGE_SIZE,
//     currentPage * PAGE_SIZE
//   );

//   return (
//     <SidebarProvider style={{ "--sidebar-width": "19rem" }}>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-16 items-center gap-2 px-4">
//           <SidebarTrigger className="-ml-1" />
//           <Separator orientation="vertical" className="mr-2 h-4" />
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem className="hidden md:block">
//                 <BreadcrumbLink href="#">{<Header />}</BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator className="hidden md:block" />
//               <BreadcrumbItem>
//                 <BreadcrumbPage>Data Fetching</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </header>

//         <div className="bg-[#e6ebee] min-h-screen flex flex-col items-center p-4">
    
//           <div className="w-full bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 mt-5">
//             <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
//               <Search className="text-[#3d3690]" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search here..."
//                 className="ml-2 w-full outline-none"
//               />
//             </div>

//             <div className="flex items-center space-x-3 mt-3 md:mt-0">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="flex items-center space-x-2 border border-gray-300">
//                     <span>Newest</span>
//                     <ChevronDown size={16} />
//                   </Button>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent align="end" className="w-36">
//                   <DropdownMenuItem>Newest</DropdownMenuItem>
//                   <DropdownMenuItem>Oldest</DropdownMenuItem>
//                   <DropdownMenuItem>Recent</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               <Dialog>
//       <DialogTrigger asChild>
//         <Button className="bg-[#3d3690] text-white font-semibold px-5 py-2 rounded-lg">
//           + Add Student
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[1300px]">
//         <DialogHeader>
//           <DialogTitle>Add Student Details</DialogTitle>
          
//         </DialogHeader>
//         <div className="grid grid-cols-2 gap-4">

//         <div>
//   <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//     Enter Name *
//   </Label>
//   <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Your name" />
// </div>

//           <div>
//             <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Previous-School *</Label>
//             <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Previous School Name" />
//           </div>
//           <div>
//             <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Email</Label>
//             <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" type="email" placeholder="example@gmail.com" />
//           </div>

          
//           <div>
//   <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//     Select Gender *
//   </Label>
//   <Select>
//     <SelectTrigger className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg">
//       <SelectValue  placeholder="none" />
//     </SelectTrigger>
//     <SelectContent>
//       <SelectItem value="male">Male</SelectItem>
//       <SelectItem value="female">Female</SelectItem>
//       <SelectItem value="other">Other</SelectItem>
//     </SelectContent>
//   </Select>
// </div>

//           <div>
//             <Label  className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Contact No.</Label>
//             <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" type="tel" placeholder="Phone number" />
//           </div>
//           <div>
//             <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4" >Select Category *</Label>
//             <Select>
//               <SelectTrigger className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg">
//                 <SelectValue placeholder="none" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="general">General</SelectItem>
//                 <SelectItem value="obc">OBC</SelectItem>
//                 <SelectItem value="sc">SC</SelectItem>
//                 <SelectItem value="st">ST</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Serial No. *</Label>
//             <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg" placeholder="serial number" />
//           </div>
//           <div>
//             <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter DOB *</Label>
//             <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg" type="date" />
//           </div>
//         </div>
//         <div className="flex justify-center mt-4">
//   <Button className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg min-w-[250px] w-full sm:w-[1100px] h-[40px] text-lg">
//     Proceed
//   </Button>
// </div>


//       </DialogContent>
//     </Dialog>
            
            
            
//             </div>
//           </div>

       
//           <div className="w-full overflow-x-auto">
//             <Table className="w-full border rounded-lg shadow-md mt-5">
//               <TableHeader>
//                 <TableRow className="bg-gray-100">
//                   <TableHead>ID</TableHead>
//                   <TableHead>Student Name</TableHead>
//                   <TableHead>Father Name</TableHead>
//                   <TableHead>Batch Name</TableHead>
//                   <TableHead>+ Add Payment</TableHead>
//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {displayedStudents.map((student, index) => (
//                   <TableRow key={index} className="hover:bg-gray-50">
//                     <TableCell className="text-blue-600 font-medium">
//                       {student.id}
//                     </TableCell>
//                     <TableCell className="flex items-center space-x-3">
//                       <img
//                         src={student.image}
//                         alt={student.name}
//                         className="w-10 h-10 object-cover rounded-full border-2 border-gray-300 shadow-sm"
//                       />
//                       <span className="font-medium">{student.name}</span>
//                     </TableCell>
//                     <TableCell>{student.fatherName}</TableCell>
//                     <TableCell>{student.batch}</TableCell>
//                     <TableCell>
//                       <button className="bg-green-500 text-white px-3 py-1 rounded-lg">
//                         + Add Payment
//                       </button>
//                     </TableCell>
//                     <TableCell>
//                       <MoreVertical
//                         className="text-gray-600 cursor-pointer"
//                         size={20}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

        
//           <div className="flex items-center justify-center md:justify-end space-x-3 mt-5 w-full pr-8">
//             <Button
//               variant="ghost"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </Button>

//             {[1, 2].map((page) => (
//               <Button
//                 key={page}
//                 variant={currentPage === page ? "default" : "ghost"}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-4 py-2 ${currentPage === page ? "bg-[#3d3690] text-white" : "bg-gray-100 text-gray-700"} rounded-lg`}
//               >
//                 {page}
//               </Button>
//             ))}

//             <Button
//               variant="ghost"
//               disabled={currentPage === 2}
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 2))}
//             >
//               <ChevronRight className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// };

// export default StudentHeader;








import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/ui/table";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../src/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";


import { Button } from "../../src/components/ui/Button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../src/components/ui/breadcrumb";
import Header from "../Dashboard/Header";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../src/components/ui/select";

const studentGroups = [
  {
    id: "123456789",
    name: "Samantha William",
    fatherName: "Mana William",
    batch: "Batch A",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
  {
    id: "678912345",
    name: "Emily Clarke",
    fatherName: "John Clarke",
    batch: "Batch E",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
];

const PAGE_SIZE = 5;

const StudentHeader = () => {


  
  
  const [currentPage, setCurrentPage] = useState(1);

  let totalPages = Math.ceil(studentGroups.length / PAGE_SIZE);

  const displayedStudents = studentGroups.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" }}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
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

        <div className="bg-[#e6ebee] min-h-screen flex flex-col items-center p-4">
    
          <div className="w-full bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 mt-5">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
              <Search className="text-[#3d3690]" size={18} />
              <input
                type="text"
                placeholder="Search here..."
                className="ml-2 w-full outline-none"
              />
            </div>

            <div className="flex items-center space-x-3 mt-3 md:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2 border border-gray-300">
                    <span>Newest</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem>Newest</DropdownMenuItem>
                  <DropdownMenuItem>Oldest</DropdownMenuItem>
                  <DropdownMenuItem>Recent</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#3d3690] text-white font-semibold px-5 py-2 rounded-lg">
          + Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1300px]">
        <DialogHeader>
          <DialogTitle>Add Student Details</DialogTitle>
          
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">

        <div>
  <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
    Enter Name *
  </Label>
  <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Your name" />
</div>

          <div>
            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Previous-School *</Label>
            <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Previous School Name" />
          </div>
          <div>
            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Email</Label>
            <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" type="email" placeholder="example@gmail.com" />
          </div>

          
          <div>
  <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
    Select Gender *
  </Label>
  <Select>
    <SelectTrigger className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg">
      <SelectValue  placeholder="none" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="male">Male</SelectItem>
      <SelectItem value="female">Female</SelectItem>
      <SelectItem value="other">Other</SelectItem>
    </SelectContent>
  </Select>
</div>

          <div>
            <Label  className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Contact No.</Label>
            <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" type="tel" placeholder="Phone number" />
          </div>
          <div>
            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4" >Select Category *</Label>
            <Select>
              <SelectTrigger className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg">
                <SelectValue placeholder="none" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="obc">OBC</SelectItem>
                <SelectItem value="sc">SC</SelectItem>
                <SelectItem value="st">ST</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Serial No. *</Label>
            <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg" placeholder="serial number" />
          </div>
          <div>
            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter DOB *</Label>
            <Input className="w-full border-gray-300 rounded-xl pl-12 p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg" type="date" />
          </div>
        </div>
        <div className="flex justify-center mt-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg min-w-[250px] w-full sm:w-[1100px] h-[40px] text-lg">
            Proceed
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[700px] p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Enter Your Details</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Address Field */}
            <div>
              <Label>Enter Address</Label>
              <Input placeholder="Enter your address" className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Aadhaar Number Field */}
              <div>
                <Label>Enter Aadhaar Number</Label>
                <Input placeholder="Aadhaar number" className="mt-1" />
              </div>

              {/* PAN Number Field */}
              <div>
                <Label>Enter Pan No.</Label>
                <Input placeholder="Pan number" className="mt-1" />
                <p className="text-red-500 text-sm">PAN card number is invalid.</p>
              </div>
            </div>

            {/* File Upload Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Upload Aadhaar photo</Label>
                <p className="text-gray-500 text-sm">(upload front and back in pdf)</p>
                <Button variant="outline" className="w-full mt-1">Upload pdf</Button>
              </div>
              <div>
                <Label>Upload Pan photo</Label>
                <p className="text-gray-500 text-sm">(upload front and back in pdf)</p>
                <Button variant="outline" className="w-full mt-1">Upload pdf</Button>
              </div>
            </div>

            {/* Proceed Button Inside Modal */}
            <div className="flex justify-center mt-4">
              <Button className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg w-full sm:w-[500px] text-lg">
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>




      </DialogContent>
    </Dialog>
            
            
            
            </div>
          </div>

       
          <div className="w-full overflow-x-auto">
            <Table className="w-full border rounded-lg shadow-md mt-5">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Father Name</TableHead>
                  <TableHead>Batch Name</TableHead>
                  <TableHead>+ Add Payment</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {displayedStudents.map((student, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="text-blue-600 font-medium">
                      {student.id}
                    </TableCell>
                    <TableCell className="flex items-center space-x-3">
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-10 h-10 object-cover rounded-full border-2 border-gray-300 shadow-sm"
                      />
                      <span className="font-medium">{student.name}</span>
                    </TableCell>
                    <TableCell>{student.fatherName}</TableCell>
                    <TableCell>{student.batch}</TableCell>
                    <TableCell>
                      <button className="bg-green-500 text-white px-3 py-1 rounded-lg">
                        + Add Payment
                      </button>
                    </TableCell>
                    <TableCell>
                      <MoreVertical
                        className="text-gray-600 cursor-pointer"
                        size={20}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        
          <div className="flex items-center justify-center md:justify-end space-x-3 mt-5 w-full pr-8">
            <Button
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {[1, 2].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 ${currentPage === page ? "bg-[#3d3690] text-white" : "bg-gray-100 text-gray-700"} rounded-lg`}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="ghost"
              disabled={currentPage === 2}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 2))}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
// 
export default StudentHeader;
