import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  selectedCourse: z.string().min(1, { message: "Course select karna zaroori hai" }),
  selectedBatch: z.string().min(1, { message: "Batch select karna zaroori hai" }),
});

const StudentSelectionPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    navigate("/add_student_model3");
  };

  return (
    <div>
      <FaArrowLeftLong
        onClick={() => navigate("/add_student_model4")}
        style={{ cursor: "pointer" }}
        className="fixed top-5 left-5 text-3xl z-[9999] bg-white p-2 rounded-full shadow-lg"
      />
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-lg z-10 w-[90%] md:w-[580px] h-auto min-h-[320px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-lg font-semibold mb-2">
              Select Course<span className="text-red-500">*</span>
            </h2>
            <select
              className="w-full p-2 border rounded-lg mb-1"
              {...register("selectedCourse")}
            >
              <option value="">--Select Course--</option>
              <option value="RGB">RGB</option>
              <option value="HSC">HSC</option>
            </select>
            {errors.selectedCourse && (
              <p className="text-red-500 text-sm">{errors.selectedCourse.message}</p>
            )}

            <h2 className="text-lg font-semibold mt-4 mb-2">
              Select Batch<span className="text-red-500">*</span>
            </h2>
            <select
              className="w-full p-2 border rounded-lg mb-1"
              {...register("selectedBatch")}
            >
              <option value="">--Select Batch--</option>
              <option value="Batch A">Batch A</option>
              <option value="Batch B">Batch B</option>
            </select>
            {errors.selectedBatch && (
              <p className="text-red-500 text-sm">{errors.selectedBatch.message}</p>
            )}

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
    </div>
  );
};

export default StudentSelectionPage;
