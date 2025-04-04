// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Button } from "../../../src/components/ui/button";
// import { Input } from "../../../src/components/ui/input";
// import { Label } from "../../../src/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../src/components/ui/select";
// import { Card, CardContent } from "../../../src/components/ui/card";
// import { ArrowLeft, UploadCloud } from "lucide-react";
// import { useNavigate } from "react-router";

// const studentSchema = z.object({
//   course: z.string().min(1, "Course selection is required."),
//   batch: z.string().min(1, "Batch selection is required."),
//   emiCount: z.preprocess(
//     (val) => Number(val),
//     z.number().min(1, "Emi Count must be greater than 0.")
//   ),
//   file: z
//     .instanceof(File)
//     .refine((file) => ["xlsx", "xls"].includes(file.name.split(".").pop().toLowerCase()), {
//       message: "Only .xlsx or .xls files are allowed.",
//     }),
// });

// export default function StudentUploadModal() {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     setError,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(studentSchema),
//   });

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//     navigate("/add");
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       const validExtensions = ["xlsx", "xls"];
//       const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

//       if (!validExtensions.includes(fileExtension)) {
//         setError("file", { type: "manual", message: "Only .xlsx or .xls files are allowed." });
//       } else {
//         setValue("file", selectedFile);
//       }
//     }
//   };

//   const goback = () => {
//     window.history.back();
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen p-4">
//       <Card className="w-full max-w-2xl p-8 relative rounded-xl">
//         <ArrowLeft onClick={goback} className="absolute top-4 left-4 cursor-pointer" />
//         <CardContent className="space-y-6">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Select Course */}
//             <div>
//               <Label className="font-semibold text-lg">Select Course<span className="text-red-500">*</span></Label>
//               <Select onValueChange={(value) => setValue("course", value)}>
//                 <SelectTrigger className="w-full h-12 border-gray-300 rounded-xl p-3 sm:p-2">
//                   <SelectValue placeholder="--Select Course--" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="course1">Course 1</SelectItem>
//                   <SelectItem value="course2">Course 2</SelectItem>
//                 </SelectContent>
//               </Select>
//               {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
//             </div>

//             {/* Select Batch */}
//             <div>
//               <Label className="font-semibold text-lg">Select Batch<span className="text-red-500">*</span></Label>
//               <Select onValueChange={(value) => setValue("batch", value)}>
//                 <SelectTrigger className="w-full h-12 border-gray-300 rounded-xl p-3 sm:p-2">
//                   <SelectValue placeholder="--Select Batch--" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="batch1">Batch 1</SelectItem>
//                   <SelectItem value="batch2">Batch 2</SelectItem>
//                 </SelectContent>
//               </Select>
//               {errors.batch && <p className="text-red-500 text-sm">{errors.batch.message}</p>}
//             </div>

//             {/* EMI Count */}
//             <div>
//               <Label className="font-semibold text-lg">Emi Count<span className="text-red-500">*</span></Label>
//               <Input
//                 {...register("emiCount")}
//                 type="number"
//                 min={1}
//                 className="w-full h-12 border-gray-300 rounded-xl p-3 sm:p-2"
//               />
//               {errors.emiCount && <p className="text-red-500 text-sm">{errors.emiCount.message}</p>}
//             </div>

//             {/* Upload File */}
//             <div>
//               <Label className="font-semibold text-lg">Upload Excel<span className="text-red-500">*</span></Label>
//               <div className="text-lg text-blue-600 cursor-pointer underline flex items-center">
//                 <a href="/sample.xlsx" download>Download Sample.xlsx</a>
//                 <UploadCloud className="ml-2" size={20} />
//               </div>
//               <Input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="w-full h-12 border-gray-300 rounded-xl p-3 sm:p-2" />
//               {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
//             </div>

//             {/* Submit Button */}
//             <Button type="submit" className="w-60 h-12 ml-[160px] bg-blue-600 text-white font-semibold py-3 text-lg rounded-lg">
//               Add Students
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../../src/components/ui/button";
import { Input } from "../../../src/components/ui/input";
import { Label } from "../../../src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../src/components/ui/select";
import { Card, CardContent } from "../../../src/components/ui/card";
import {  UploadCloud } from "lucide-react";
import { useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";

const studentSchema = z.object({
  course: z.string().min(1, "Course selection is required."),
  batch: z.string().min(1, "Batch selection is required."),
  emiCount: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Emi Count must be greater than 0.")
  ),
  file: z
    .instanceof(File)
    .refine((file) => ["xlsx", "xls"].includes(file.name.split(".").pop().toLowerCase()), {
      message: "Only .xlsx or .xls files are allowed.",
    }),
});

export default function StudentUploadModal() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    navigate("/add");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validExtensions = ["xlsx", "xls"];
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        setError("file", { type: "manual", message: "Only .xlsx or .xls files are allowed." });
      } else {
        setValue("file", selectedFile);
        clearErrors("file");
      }
    }
  };

  const goback = () => {
    window.history.back();
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
              <FaArrowLeftLong onClick={goback} 
              style={{ cursor: "pointer", outline: "none", border: "none", zIndex: 999999 }}
        className="fixed top-4 left-4 text-3xl" />
      <Card className="w-full max-w-2xl p-8 relative rounded-xl">

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Select Course */}
            <div>
              <Label className="font-semibold text-lg">Select Course<span className="text-red-500">*</span></Label>
              <Select onValueChange={(value) => { setValue("course", value); clearErrors("course"); }}>
                <SelectTrigger className="w-full h-12 border-gray-300 rounded-xl p-3 sm:p-2">
                  <SelectValue placeholder="--Select Course--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course1">Course 1</SelectItem>
                  <SelectItem value="course2">Course 2</SelectItem>
                </SelectContent>
              </Select>
              {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
            </div>

            {/* Select Batch */}
            <div>
              <Label className="font-semibold text-lg">Select Batch<span className="text-red-500">*</span></Label>
              <Select onValueChange={(value) => { setValue("batch", value); clearErrors("batch"); }}>
                <SelectTrigger className="w-full h-12 border-gray-300 rounded-xl p-3 sm:p-2">
                  <SelectValue placeholder="--Select Batch--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="batch1">Batch 1</SelectItem>
                  <SelectItem value="batch2">Batch 2</SelectItem>
                </SelectContent>
              </Select>
              {errors.batch && <p className="text-red-500 text-sm">{errors.batch.message}</p>}
            </div>

            {/* EMI Count */}
            <div>
              <Label className="font-semibold text-lg">Emi Count<span className="text-red-500">*</span></Label>
              <Input
                {...register("emiCount", { onChange: () => clearErrors("emiCount") })}
                type="number"
                min={1}
                className="w-full h-12 border-gray-300 rounded-xl p-3 sm:p-2"
              />
              {errors.emiCount && <p className="text-red-500 text-sm">{errors.emiCount.message}</p>}
            </div>

            {/* Upload File */}
            <div>
              <Label className="font-semibold text-lg">Upload Excel<span className="text-red-500">*</span></Label>
              <div className="text-lg text-blue-600 cursor-pointer underline flex items-center">
                <a href="/sample.xlsx" download>Download Sample.xlsx</a>
                <UploadCloud className="ml-2" size={20} />
              </div>
              <Input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="w-full h-12 border-gray-300 rounded-xl p-3 sm:p-2" />
              {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit"  className="w-60 h-12  ml-[160px] bg-blue-600 text-white font-semibold py-3 text-lg rounded-lg">
              Add Students
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
