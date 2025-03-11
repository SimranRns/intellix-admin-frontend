import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../src/components/ui/dialog";
import { Button } from "../../src/components/ui/Button";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../src/components/ui/select";
import ProceedModal from "./ProceedModel";


const AddStudentModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPro, setIsModalOpenPro] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    email: "",
    gender: "",
    contact: "",
    category: "",
    serialNo: "",
    dob: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/students");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  const handleProceed = () => {
    if (isFormValid()) {
      setIsModalOpen(false);
      setTimeout(() => setIsModalOpenPro(true), 200);
    } else {
      alert("Please fill all required fields!");
    }
  };

  return (
    <div>


      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[1300px]">
          <DialogHeader>
            <DialogTitle className='text-3xl'>Add Student Details</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Name *</Label>
              <Input name="name" value={formData.name} onChange={handleChange} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Your name" />
            </div>
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Previous-School *</Label>
              <Input name="school" value={formData.school} onChange={handleChange} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Previous School Name" />
            </div>
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Email</Label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="example@gmail.com" />
            </div>
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Select Gender *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg">
                  <SelectValue placeholder="none" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Contact No.</Label>
              <Input name="contact" type="tel" value={formData.contact} onChange={handleChange} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Phone number" />
            </div>
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Select Category *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg">
                  <SelectValue placeholder="none" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="obc">OBC</SelectItem>
                  <SelectItem value="sc">SC</SelectItem>
                  <SelectItem value="st">ST</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Serial No. *</Label>
              <Input name="serialNo" value={formData.serialNo} onChange={handleChange} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg" placeholder="serial number" />
            </div>
            <div>
              <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter DOB *</Label>
              <Input name="dob" type="date" value={formData.dob} onChange={handleChange} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-0 focus:outline-none shadow-lg" />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Button
              onClick={handleProceed} 
              className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg min-w-[250px] w-full sm:w-[500px] h-[40px] text-lg"
            >
              Proceed
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <ProceedModal o={isModalOpenPro} c={setIsModalOpenPro} />
    </div>
  );
};

export default AddStudentModal;
