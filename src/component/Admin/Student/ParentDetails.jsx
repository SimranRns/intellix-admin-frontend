import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../../../Redux_store/Api/StudentsApiStore";
import { updateNewStudent, resetNewStudent } from "../../../Redux_store/slices/StudentSlice";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { Label } from "../../src/components/ui/label";
import { Card, CardContent } from "../../src/components/ui/card";
import { ArrowLeft, Hash } from "lucide-react";

// Zod Validation Schema for father and mother fields
const zodSchema = z.object({
  father_name: z.string().min(1, "Father's name is required"),
  mother_name: z.string().min(1, "Mother's name is required"),
});

const ParentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newStudent, loading, error } = useSelector((state) => state.students);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      father_name: newStudent.father_name || "",
      mother_name: newStudent.mother_name || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Update newStudent state with form data
      dispatch(updateNewStudent(data));

      // Combine all data from newStudent (previous + current)
      const completeData = {
        ...newStudent,
        ...data,
      };

      // Dispatch addStudent with complete data
      await dispatch(addStudent(completeData)).unwrap();

      // Reset newStudent state after successful submission
      dispatch(resetNewStudent());
      console.log("Dispatched newStudent data:", completeData);

      // Navigate to the next page
      navigate("/add");
    } catch (err) {
      console.error("Failed to add student:", err);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <Button
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 shadow-md mt-3"
        onClick={goBack}
      >
        <ArrowLeft size={18} />
        <span className="hidden md:inline">Back</span>
      </Button>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-4xl rounded-2xl shadow-md shadow-blue-500/50 p-8 mt-5">
          <CardContent>
            <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">
              Enter Parent Details
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
              {/* Father's Name */}
              <div className="relative">
                <Label className="font-semibold text-lg sm:text-xl mb-4 flex items-center gap-2">
                  <Hash size={20} /> Father's Name
                </Label>
                <Input
                  {...register("father_name")}
                  className={`w-full pl-10 border ${
                    errors.father_name ? "border-red-500" : "border-gray-300"
                  } rounded-xl p-3 sm:p-5`}
                  placeholder="Enter Father's Name"
                />
                {errors.father_name && (
                  <p className="text-red-500">{errors.father_name.message}</p>
                )}
              </div>

              {/* Mother's Name */}
              <div className="relative">
                <Label className="font-semibold text-lg sm:text-xl mb-4 flex items-center gap-2">
                  <Hash size={20} /> Mother's Name
                </Label>
                <Input
                  {...register("mother_name")}
                  className={`w-full pl-10 border ${
                    errors.mother_name ? "border-red-500" : "border-gray-300"
                  } rounded-xl p-3 sm:p-5`}
                  placeholder="Enter Mother's Name"
                />
                {errors.mother_name && (
                  <p className="text-red-500">{errors.mother_name.message}</p>
                )}
              </div>

              {/* Error Message from API */}
              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <Button
                  type="submit"
                  className="w-56 bg-blue-700 text-white text-lg py-2 rounded-lg hover:bg-blue-600"
                  disabled={loading}
                >
                  {/* {loading ? "Submitting..." : "Add Parent Details"} */}
                  Add Parent Details
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentDetails;