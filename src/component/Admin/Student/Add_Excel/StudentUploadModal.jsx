import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../../src/components/ui/button";
import { Input } from "../../../src/components/ui/input";
import { Label } from "../../../src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../src/components/ui/select";
import { Card, CardContent } from "../../../src/components/ui/card";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { addStudentsExcel } from "../../../../Redux_store/Api/StudentsApiStore";
import { get_course } from "../../../../Redux_store/Api/Add_popular_course";
import { get_Batches } from "../../../../Redux_store/Api/Batches";

// Zod schema for form validation
const studentSchema = z.object({
  course: z.string().min(1, "Course selection is required"),
  batch: z.string().min(1, "Batch selection is required"),
  file: z
    .instanceof(File)
    .refine((file) => !!file, "A file is required")
    .refine(
      (file) =>
        ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"].includes(file.type) ||
        ["xlsx", "xls"].includes(file.name.split(".").pop().toLowerCase()),
      "Only .xlsx or .xls files are allowed"
    ),
});

export default function StudentUploadModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state selectors
  const {
    students,
    loading: studentsLoading,
    error: studentsError,
  } = useSelector((state) => state.students);
  const {
    Batches: batches = [], // Default to empty array
    loading: batchesLoading,
    error: batchesError,
  } = useSelector((state) => state.Batch);
  const {
    course: courses = [], // Default to empty array
    loading: coursesLoading,
    error: coursesError,
  } = useSelector((state) => state.courses);

  // Form setup with react-hook-form
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

  // Fetch courses and batches on mount only if not already loaded
  useEffect(() => {
    if (!courses?.length) dispatch(get_course());
    if (!batches?.length) dispatch(get_Batches());
  }, [dispatch, courses?.length, batches?.length]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await dispatch(
        addStudentsExcel({
          file: data.file,
          batch_id: parseInt(data.batch, 10),
          course_id: parseInt(data.course, 10),
        })
      ).unwrap();
      navigate("/add", { state: { success: "Students uploaded successfully!" } });
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message || "Failed to upload students. Please try again.",
      });
    }
  };

  // Handle file input change
  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) {
        setError("file", { type: "manual", message: "A file is required" });
        return;
      }
      setValue("file", file);
      clearErrors("file");
    },
    [setValue, setError, clearErrors]
  );

  // Navigate back to the previous page
  const goBack = () => navigate(-1);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <FaArrowLeftLong
        onClick={goBack}
        className="fixed left-4 top-4 cursor-pointer text-3xl"
        aria-label="Go back"
        role="button"
      />
      <Card className="w-full max-w-2xl rounded-xl p-8">
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Course Selection */}
            <div>
              <Label htmlFor="course" className="text-lg font-semibold">
                Select Course <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("course", value);
                  clearErrors("course");
                }}
              >
                <SelectTrigger
                  id="course"
                  className="h-12 rounded-xl border-gray-300"
                  aria-describedby={errors.course ? "course-error" : undefined}
                >
                  <SelectValue placeholder="--Select Course--" />
                </SelectTrigger>
                <SelectContent>
                  {coursesLoading && <SelectItem disabled>Loading...</SelectItem>}
                  {coursesError && (
                    <SelectItem disabled>Error: {coursesError}</SelectItem>
                  )}
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <SelectItem
                        key={course.id}
                        value={course.id.toString()}
                      >
                        {course.title || `Course ${course.id}`}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No courses available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {errors.course && (
                <p id="course-error" className="mt-1 text-sm text-red-500">
                  {errors.course.message}
                </p>
              )}
            </div>

            {/* Batch Selection */}
            <div>
              <Label htmlFor="batch" className="text-lg font-semibold">
                Select Batch <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("batch", value);
                  clearErrors("batch");
                }}
              >
                <SelectTrigger
                  id="batch"
                  className="h-12 rounded-xl border-gray-300"
                  aria-describedby={errors.batch ? "batch-error" : undefined}
                >
                  <SelectValue placeholder="--Select Batch--" />
                </SelectTrigger>
                <SelectContent>
                  {batchesLoading && (
                    <SelectItem disabled>Loading...</SelectItem>
                  )}
                  {batchesError && (
                    <SelectItem disabled>Error: {batchesError}</SelectItem>
                  )}
                  {batches.length > 0 ? (
                    batches.map((batch) => (
                      <SelectItem
                        key={batch.id}
                        value={batch.id.toString()}
                      >
                        {batch.batchesName || `Batch ${batch.id}`}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No batches available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {errors.batch && (
                <p id="batch-error" className="mt-1 text-sm text-red-500">
                  {errors.batch.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <Label htmlFor="file" className="text-lg font-semibold">
                Upload Excel <span className="text-red-500">*</span>
              </Label>
              <div className="mb-2 flex items-center text-lg text-blue-600">
                <a href="/sample.xlsx" download className="underline">
                  Download Sample.xlsx
                </a>
                <UploadCloud className="ml-2" size={20} />
              </div>
              <Input
                id="file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="h-12 rounded-xl border-gray-300"
                aria-describedby={errors.file ? "file-error" : undefined}
              />
              {errors.file && (
                <p id="file-error" className="mt-1 text-sm text-red-500">
                  {errors.file.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={studentsLoading || batchesLoading || coursesLoading}
                className="h-12 w-60 rounded-lg bg-blue-600 text-lg font-semibold text-white"
              >
                {studentsLoading ? "Uploading..." : "Add Students"}
              </Button>
            </div>

            {/* API Error Display */}
            {(errors.root || studentsError || batchesError || coursesError) && (
              <p className="text-center text-sm text-red-500">
                {errors.root?.message || studentsError || batchesError || coursesError}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}