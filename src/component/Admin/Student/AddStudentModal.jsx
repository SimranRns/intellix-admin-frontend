import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../src/components/ui/dialog";
import { Button } from "../../src/components/ui/Button";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../src/components/ui/select";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Student.css";
import { set } from "date-fns";

const addSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .regex(/^[A-Za-z\s]+$/, "Only alphabets (A-Z, a-z) and spaces are allowed"),

  school: z
    .string()
    .min(3, "School name must be at least 3 characters long")
    .regex(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),

  email: z.string().email("Enter a valid email"),

  gender: z.string().min(1, "Gender selection is required"),

  contact: z
    .string()
    .length(10, "Contact number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Only numbers are allowed"),

  category: z.string().min(1, "Category selection is required"),

  serialNo: z.string().min(1, "Serial number is required"),

  dob: z.string().min(1, "Date of Birth is required"),
});

const AddStudentModal = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

 

  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/students"); // ✅ Direct navigate karna
  };


  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addSchema),
    defaultValues: {
      name: "",
      school: "",
      email: "",
      gender: "",
      contact: "",
      category: "",
      serialNo: "",
      dob: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Validation successful:", data);
    navigate('/ProceedModal');
  };

  return (
    <div>

      <FaArrowLeftLong
        onClick={handleClose}
        style={{ cursor: "pointer", outline: "none", border: "none", zIndex: 999999 }}
        className="fixed top-4 left-4 text-3xl"
      />

      <Dialog open={isModalOpen} onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}>


        <DialogContent
          className="sm:max-w-[1000px] z-[99999] bg-white dark:bg-black text-black dark:text-white"
          onPointerDownOutside={handleClose} // ✅ Modal ke bahar click karne par close hoga
          onEscapeKeyDown={handleClose} // ✅ Escape dabane par bhi close hoga
        >


          <DialogHeader>
            <DialogTitle className="text-3xl text-center">Add Student Details</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter Name *</Label>
              <Input {...register("name")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="Your name" />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Previous School *</Label>
              <Input {...register("school")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="Previous School Name" />
              {errors.school && <p className="text-red-500">{errors.school.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter Email *</Label>
              <Input {...register("email")} type="email" className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="example@gmail.com" />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Select Gender *</Label>
              <Select onValueChange={(value) => { setValue("gender", value); clearErrors("gender"); }}>
                <SelectTrigger className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="absolute z-[999999] shadow-lg">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter Contact No. *</Label>
              <Input {...register("contact")} type="number" className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="Phone number" />
              {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Select Category *</Label>
              <Select onValueChange={(value) => { setValue("category", value); clearErrors("category"); }}>
                <SelectTrigger className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="absolute z-[999999] shadow-lg" >
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="obc">OBC</SelectItem>
                  <SelectItem value="sc">SC</SelectItem>
                  <SelectItem value="st">ST</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter Serial No. *</Label>
              <Input {...register("serialNo")} type="number" className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="Serial number" />
              {errors.serialNo && <p className="text-red-500">{errors.serialNo.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter DOB *</Label>
              <Input {...register("dob")} type="date" className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg " />
              {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
            </div>

            <div className="flex justify-center mt-4 col-span-2">
              <Button type="submit" className="bg-blue-700 
              hover:bg-blue-500 px-10 py-3 rounded-lg text-white">
                Proceed
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddStudentModal;
