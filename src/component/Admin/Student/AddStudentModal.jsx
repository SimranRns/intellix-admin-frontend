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
import { schema } from "./Student.validation";



const AddStudentModal = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);

  }, []);

  const handleClose = () => {

    navigate("/students");
  };

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
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

  const main = async (e) => {
    e.preventDefault(); 
  
    const isValid = await handleSubmit.trigger(); 
  
    if (!isValid) {
      console.log("Validation failed:", additionalForm.formState.errors);
      return;
    }
  
    const formData = additionalForm.getValues();
    const validationResult = schema.safeParse(formData);
  
    if (validationResult.success) {
      console.log("Data submitted:", formData);
      setTeacher(false); 
      setAddDetails(true); 
    } else {
      console.log("Validation errors:", validationResult.error.format());
  
      Object.entries(validationResult.error.format()).forEach(([key, value]) => {
        additionalForm.setError(key, {
          type: "manual",
          message: value._errors?.[0] || "Invalid field",
        });
      });
    }
  };


  return (
    <div>
      <FaArrowLeftLong
        onClick={handleClose}
        style={{ cursor: "pointer", outline: "none", border: "none" }}
        className="fixed text-3xl z-[999]"
      />

      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[1000px] z-[99999]">
          <DialogHeader>
            <DialogTitle className="text-3xl text-center">Add Student Details</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit())} className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter Name *</Label>


              <Input {...register("name")}
                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg"
                placeholder="Your name"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                }}
              />

              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Previous-School *</Label>
              <Input type="text" {...register("school")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="Previous School Name"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                }} />
              {errors.school && <p className="text-red-500">{errors.school.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter Email *</Label>
              <Input type="text" {...register("email")} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg" placeholder="example@gmail.com" />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Select Gender *</Label>
              <Select onValueChange={(value) => {
                setValue("gender", value, { shouldValidate: true });
                clearErrors("gender");
              }}>
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

              <Input type="number"
                {...register("contact")}
                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg"
                placeholder="Phone number"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                maxLength={10}
              />
              {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Select Category *</Label>
              <Select onValueChange={(value) => {
                setValue("category", value, { shouldValidate: true });
                clearErrors("category");
              }}>
                <SelectTrigger className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="absolute z-[999999] shadow-lg">
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
              <Input
                type="text"
                {...register("serialNo")}
                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg"
                placeholder="Serial number"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
              {errors.serialNo && <p className="text-red-500">{errors.serialNo.message}</p>}
            </div>

            <div>
              <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter DOB *</Label>
              <Input {...register("dob")} type="date" className="w-full border-gray-300 rounded-xl p-3 sm:p-5 shadow-lg bg-white" />
              {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
            </div>

            <div className="flex justify-center mt-4 col-span-2">
              <Button type="submit" className="bg-blue-700 hover:bg-blue-500 px-10 py-3 rounded-lg text-white">Proceed</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddStudentModal;
