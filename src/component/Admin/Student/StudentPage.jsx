// import React, { useState } from "react";
// import { Search, ChevronDown, Phone, Mail, MoreVertical } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../src/components/ui/table";

// const students = [
//   {
//     id: "123456789",
//     name: "Samantha William",
//     fatherName: "Mana William",
//     batch: "Batch A",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
//   },
//   {
//     id: "123453254",
//     name: "Tony Soap",
//     fatherName: "James Soap",
//     batch: "Batch B",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ZP9zTf75vBmTD9BJWQmf3DjamXGuvzw44w&s",
//   },
// ];

// const StudentHeader = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="bg-[#e6ebee] min-h-screen flex flex-col items-center">
//       <div className="w-full bg-white shadow-md rounded-lg flex items-center justify-between px-8 py-4 mt-10">
//         <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
//           <Search className="text-[#3d3690]" size={18} />
//           <input
//             type="text"
//             placeholder="Search here..."
//             className="ml-2 w-full outline-none"
//           />
//         </div>

//         <div className="flex items-center space-x-3">
//           <button
//             type="button"
//             className="flex items-center border border-gray-300 rounded-lg px-4 py-2 cursor-pointer bg-white"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <span className="mr-1">Newest</span>
//             <ChevronDown size={16} />
//           </button>
//           {isOpen && (
//             <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
//               <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                 Newest
//               </button>
//               <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                 Oldest
//               </button>
//             </div>
//           )}
//           <button className="bg-[#3d3690] text-white font-semibold px-5 py-2 rounded-lg">
//             + New Student
//           </button>
//         </div>
//       </div>

//       <Table className="w-full border rounded-lg shadow-md mt-5">
//         <TableHeader>
//           <TableRow className="bg-gray-100">
//             <TableHead>ID</TableHead>
//             <TableHead>Student Name</TableHead>
//             <TableHead>Father Name</TableHead>
//             <TableHead>Batch Name</TableHead>
//             <TableHead>+ Add Payment</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {students.map((student, index) => (
//             <TableRow key={index} className="hover:bg-gray-50">
//               <TableCell className="text-blue-600 font-medium">{student.id}</TableCell>
//               <TableCell className="flex items-center space-x-3">
//                 <img
//                   src={student.image}
//                   alt={student.name}
//                   className="w-10 h-10 object-cover rounded-full border-2 border-gray-300 shadow-sm"
//                 />
//                 <span className="font-medium">{student.name}</span>
//               </TableCell>
//               <TableCell>{student.fatherName}</TableCell>
//               <TableCell>{student.batch}</TableCell>
//               <TableCell>
//                 <button className="bg-green-500 text-white px-3 py-1 rounded-lg">
//                   + Add Payment
//                 </button>
//               </TableCell>
//               <TableCell>
//                 <MoreVertical className="text-gray-600 cursor-pointer" size={20} />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default StudentHeader;

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/ui/table";
import { Button } from "../../src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu";

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
    id: "123456789",
    name: "Samantha William",
    fatherName: "Mana William",
    batch: "Batch A",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
  {
    id: "123456789",
    name: "Samantha William",
    fatherName: "Mana William",
    batch: "Batch A",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
  {
    id: "123456789",
    name: "Samantha William",
    fatherName: "Mana William",
    batch: "Batch A",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEnd4A1YCCdwNwZf_O6cyreyiAruR0UMWPw&s",
  },
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
  {
    id: "678912345",
    name: "Emily Clarke",
    fatherName: "John Clarke",
    batch: "Batch E",
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
  {
    id: "678912345",
    name: "Emily Clarke",
    fatherName: "John Clarke",
    batch: "Batch E",
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

const PAGE_SIZE = 5; // 🔹 Ek page par kitne students dikhane hain (3 students per page)
const MAX_PAGES = 5; // 🔹 Maximum sirf 2 pages hi dikhne chahiye

const StudentHeader = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Total pages ka calculation (but max sirf 2 pages dikhne chahiye)
  let totalPages = Math.ceil(studentGroups.length / PAGE_SIZE);
  if (totalPages > MAX_PAGES) totalPages = MAX_PAGES;

  // 🔹 Current page ke students dikhana
  const displayedStudents = studentGroups.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="bg-[#e6ebee] min-h-screen flex flex-col items-center">
      <div className="w-full bg-white shadow-md rounded-lg flex items-center justify-between px-8 py-4 mt-10">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
          <Search className="text-[#3d3690]" size={18} />
          <input
            type="text"
            placeholder="Search here..."
            className="ml-2 w-full outline-none"
          />
        </div>

        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center space-x-2 border border-gray-300"
              >
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
          <button className="bg-[#3d3690] text-white font-semibold px-5 py-2 rounded-lg">
            + Add Student
          </button>
        </div>
      </div>

      {/* 🔹 Table */}
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

      {/* 🔹 Pagination (Only 1 & 2 Pages) */}
      {/* 🔹 Pagination (Only 1 & 2 Pages) */}
      <div className="flex items-center justify-end space-x-3 mt-5 w-full pr-8">
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
            className={`px-4 py-2 ${
              currentPage === page
                ? "bg-[#3d3690] text-white"
                : "bg-gray-100 text-gray-700"
            } rounded-lg`}
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
  );
};

export default StudentHeader;
