import { ArrowLeft, BookOpenCheck, Layers3 } from "lucide-react";
import { Button } from "../../src/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { updateNewStudent } from "../../../Redux_store/slices/StudentSlice";
import { get_course } from "../../../Redux_store/Api/Add_popular_course";
import { get_Batches } from "../../../Redux_store/Api/Batches";
import { useEffect } from "react";

// Zod Validation Schema
const validationSchema = z.object({
  selectedCourse: z.string().min(1, { message: "Course selection is required" }),
  selectedBatch: z.string().min(1, { message: "Batch selection is required" }),
});

const StudentSelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const {
    Batches: batches = [],
    loading: batchesLoading,
    error: batchesError,
  } = useSelector((state) => state.Batch);
  const {
    course: courses = { data: [] },
    loading: coursesLoading,
    error: coursesError,
  } = useSelector((state) => state.courses);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  // Fetch data on mount
  useEffect(() => {
    dispatch(get_course());
    dispatch(get_Batches());
  }, [dispatch]);

  // Debug logging (optional, remove in production)
  useEffect(() => {
    console.log("🔍 Courses:", courses);
    console.log("🔍 Batches:", batches);
    console.log("🔍 Courses Loading:", coursesLoading, "Error:", coursesError);
    console.log("🔍 Batches Loading:", batchesLoading, "Error:", batchesError);
  }, [courses, batches, coursesLoading, coursesError, batchesLoading, batchesError]);

  // Handle form submission
  const onSubmit = (data) => {
    dispatch(
      updateNewStudent({
        course_id: data.selectedCourse,
        batch_id: data.selectedBatch,
      })
    );
    navigate("/ParentDetails");
  };

  // Navigate back
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen ">
      <div className="flex items-center gap-4 p-4">
        <Button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 shadow-md"
          onClick={goBack}
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
          <span className="md:inline">Back</span>
        </Button>
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="rounded-2xl w-full max-w-md p-8  shadow-md shadow-blue-500/50">
          {(coursesLoading || batchesLoading) && (
            <p className="text-center text-gray-600">Loading...</p>
          )}
          {(coursesError || batchesError) && (
            <p className="text-center text-red-500">
              Error: {coursesError || batchesError}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Select Course */}
            <div className="mb-6">
              <label
                htmlFor="selectedCourse"
                className="font-semibold text-lg flex items-center gap-2 mb-2"
              >
                <BookOpenCheck size={18} /> Select Course{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                id="selectedCourse"
                className={`w-full border rounded-xl p-3 shadow-sm bg-transparent focus:ring-2 focus:ring-blue-500, ${
                  errors.selectedCourse ? "border-red-500" : "border-gray-300 "
                }`}
                {...register("selectedCourse")}
                aria-invalid={errors.selectedCourse ? "true" : "false"}
              >
                <option value="">--Select Course--</option>
                {courses?.data?.map((course) => (
                  <option className="text-black" key={course.id} value={course.id}>
                    {course.title || `Course ${course.id}`}
                  </option>
                ))}
              </select>
              {errors.selectedCourse && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.selectedCourse.message}
                </p>
              )}
            </div>

            {/* Select Batch */}
            <div className="mb-6">
              <label
                htmlFor="selectedBatch"
                className="font-semibold text-lg flex items-center gap-2 mb-2"
              >
                <Layers3 size={18} /> Select Batch{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                id="selectedBatch"
                className={`w-full border rounded-xl p-3 shadow-sm focus:ring-2 bg-transparent focus:ring-blue-500 ${
                  errors.selectedBatch ? "border-red-500" : "border-gray-300"
                }`}
                {...register("selectedBatch")}
                aria-invalid={errors.selectedBatch ? "true" : "false"}
              >
                <option value="">--Select Batch--</option>
                {batches.map((batch) => (
                  <option className="text-black" key={batch.id} value={batch.id}>
                    {batch.BatchesName || `Batch ${batch.id}`}
                  </option>
                ))}
              </select>
              {errors.selectedBatch && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.selectedBatch.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg w-full max-w-xs h-10 text-lg disabled:opacity-50"
                disabled={coursesLoading || batchesLoading}
              >
                Proceed
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSelectionPage;