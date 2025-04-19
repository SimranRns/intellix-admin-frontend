import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, BookOpenCheck, Layers3 } from "lucide-react";
import { Button } from "../../src/components/ui/button";

// ✅ Zod Validation Schema
const validationSchema = z.object({
  selectedCourse: z.string().min(1, { message: "Course selection is required" }),
  selectedBatch: z.string().min(1, { message: "Batch selection is required" }),
});

const StudentSelectionPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    navigate("/ParentDetails");
  };
  const goback = () => {
    window.history.back()
  }
  return (

    <div>
      <div className="flex items-center gap-4 p-4 ">
        <Button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 shadow-md"
          onClick={goback}
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline">Back</span>
        </Button>

      </div>
      {/* 📌 Form Container */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="p-6 rounded-2xl shadow-lg z-10 w-[90%] md:w-[580px] h-auto min-h-[320px] max-w-4xl shadow-md shadow-blue-500/50 p-8 mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* 📌 Select Course */}
            <div className="relative mb-4">
              <label className="block font-semibold text-lg sm:text-xl mb-4 flex items-center gap-2">
                <BookOpenCheck size={18} /> Select Course <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full bg-transparent border rounded-xl p-3  sm:p-4 shadow-lg pl-10 ${errors.selectedCourse ? 'border-red-500' : 'border-gray-300'}`}
                {...register("selectedCourse")}
              >
                <option className="text-black" value="">--Select Course--</option>
                <option className="text-black" value="RGB">RGB</option>
                <option className="text-black" value="HSC">HSC</option>
              </select>
              <BookOpenCheck size={18} className="text-gray-500 absolute left-3 top-[58%] transform -translate-y-1/2" />
              {errors.selectedCourse && (
                <p className="text-red-500 text-sm mt-1">{errors.selectedCourse.message}</p>
              )}
            </div>

            {/* 📌 Select Batch */}
            <div className="relative mb-4">
              <label className="block font-semibold text-lg sm:text-xl mb-4 flex items-center gap-2">
                <Layers3 size={18} /> Select Batch <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full bg-transparent border rounded-xl p-3 sm:p-4 shadow-lg pl-10 ${errors.selectedBatch ? 'border-red-500' : 'border-gray-300'}`}
                {...register("selectedBatch")}
              >
                <option className="text-black" value="">--Select Batch--</option>
                <option className="text-black" value="Batch A">Batch A</option>
                <option className="text-black" value="Batch B">Batch B</option>
              </select>
              <Layers3 size={18} className="text-gray-500 absolute left-3 top-[58%] transform -translate-y-1/2" />
              {errors.selectedBatch && (
                <p className="text-red-500 text-sm mt-1">{errors.selectedBatch.message}</p>
              )}
            </div>

            {/* 📌 Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 mt-5 rounded-lg min-w-[250px] w-full sm:w-[300px] h-[40px] text-lg"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>);
};

export default StudentSelectionPage;
