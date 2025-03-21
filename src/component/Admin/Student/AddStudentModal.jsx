import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../src/components/ui/dialog";
import { Button } from "../../src/components/ui/Button";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../src/components/ui/select";
import ProceedModal from "./ProceedModel";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Student.css"


const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").regex(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),
  school: z.string().min(3, "School name must be at least 3 characters long").regex(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),
  email: z.string().email("Enter a valid email"),
  gender: z.string().min(1, "Gender selection is required"),
  contact: z.string().min(10, "Contact number must be 10 digits long").max(10, "Contact number must be 10 digits long"),
  category: z.string().min(1, "Category selection is required"),
  serialNo: z.string().min(1, "Serial number is required"),
  dob: z.string().min(1, "Date of Birth is required"),
});


const AddStudentModal = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPro, setIsModalOpenPro] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/students");
  };


  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });


  const onSubmit = (data) => {
    console.log("Form Data:", data);
    if (!data.gender) {
      setError("gender", { type: "manual", message: "Gender is required" });
    }
    if (!data.category) {
      setError("category", { type: "manual", message: "Category is required" });
    }
    setIsModalOpen(false);
    setTimeout(() => setIsModalOpenPro(true), 200);
  };



  return (
    <div>
      <FaArrowLeftLong
        onClick={handleClose}
        style={{ cursor: "pointer", outline: "none", border: "none" }}
        className="fixed  text-3xl z-[999] "
      />

      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[1000px] z-[99999] ">
          <DialogHeader>
            <DialogTitle className="text-3xl text-center">Add Student Details</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block  font-semibold text-lg sm:text-xl mb-4">Enter Name *</Label>
              <Input type="string" {...register("name")} className="w-full border-gray-30 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="Your name" />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <Label className="block  font-semibold text-lg sm:text-xl mb-4">Previous-School *</Label>
              <Input {...register("school")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="Previous School Name" />
              {errors.school && <p className="text-red-500">{errors.school.message}</p>}
            </div>

            <div>
              <Label className="block  font-semibold text-lg sm:text-xl mb-4">Enter Email *</Label>
              <Input {...register("email")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="example@gmail.com" />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <Label className="block  font-semibold text-lg sm:text-xl mb-4">Select Gender *</Label>
              <Select onValueChange={(value) => {
                setValue("gender", value)
                clearErrors("gender")
              }}>
                <SelectTrigger className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="absolute z-[999999]  shadow-lg">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>

            <div>
              <Label className="block  font-semibold text-lg sm:text-xl mb-4">Enter Contact No.</Label>
              <Input {...register("contact")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="Phone number" />
              {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
            </div>

            <div>
              <Label className="block  font-semibold text-lg sm:text-xl mb-4">Select Category *</Label>
              <Select onValueChange={(value) => {
                setValue("category", value)
                clearErrors("category")
              }}>
                <SelectTrigger className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="absolute z-[999999]  shadow-lg">
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="obc">OBC</SelectItem>
                  <SelectItem value="sc">SC</SelectItem>
                  <SelectItem value="st">ST</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            </div>

            <div>
              <Label className="block  font-semibold text-lg sm:text-xl mb-4">Enter Serial No. *</Label>
              <Input {...register("serialNo")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="Serial number" />
              {errors.serialNo && <p className="text-red-500">{errors.serialNo.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter DOB *</Label><Input
                {...register("dob")}
                type="date"
                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg bg-white dark:bg-black"
                style={{ WebkitAppearance: "none", position: "relative" }}
              />


              {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
            </div>

            <div className="flex justify-center mt-4 col-span-2">
              <Button onClick={() => navigate("/ProceedModal")} type="submit" className="bg-blue-700 hover:bg-blue-500  px-10 py-3 rounded-lg text-white dark:text-white">Proceed</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* <ProceedModal o={isModalOpenPro} c={setIsModalOpenPro} /> */}
    </div>
  );
};

export default AddStudentModal;


