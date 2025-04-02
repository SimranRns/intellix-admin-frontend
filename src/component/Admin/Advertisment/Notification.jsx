import React, { useState, useRef } from "react";
import { Button } from "../../src/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../src/components/ui/popover";
import { Calendar } from "../../src/components/ui/calendar";
import { Input } from "../../src/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../src/components/ui/dialog";
import { Checkbox } from "../../src/components/ui/checkbox";
import { Label } from "../../src/components/ui/label";
import { Textarea } from "../../src/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  desc: z.string().min(1, "Description is required!"),
});

const Notification = () => {
  const [date, setDate] = useState(null);
  const inputRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const handleCheckboxChange = (type) => {
    setSelected(type);
    setError(false);
  };

  const handleProceed = () => {
    if (!selected) {
      setError(true);
      return;
    }
    setOpen(false);
    setEditProfileOpen(true);
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    setEditProfileOpen(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center text-gray-500 justify-between border border-blue-400 rounded-xl px-4 py-2 shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  inputRef.current?.showPicker();
                }}
              >
                {date ? (
                  format(new Date(date), "yyyy-MM-dd")
                ) : (
                  <span className="text-gray-500">Select Date</span>
                )}
                <CalendarIcon className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => setDate(newDate)}
              />
            </PopoverContent>
          </Popover>
          <Input
            ref={inputRef}
            type="date"
            className="opacity-0 cursor-pointer absolute"
            value={date ? format(new Date(date), "yyyy-MM-dd") : ""}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="w-full md:w-auto">
          {/* First Modal */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md transition hover:bg-blue-600 flex items-center gap-2 text-base font-medium w-full md:w-auto">
                <Plus size={20} /> Add Notification
              </Button>
            </DialogTrigger>
            <DialogContent
              className="p-6 w-full max-w-md mx-auto rounded-lg shadow-lg border border-gray-300"
              onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-semibold mb-4">
                  Select Notification Type
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col space-y-4 mb-4">
                {["public", "private"].map((type) => (
                  <div
                    key={type}
                    className="flex items-center space-x-3 p-3 rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 transition cursor-pointer w-full"
                    onClick={() => handleCheckboxChange(type)}
                  >
                    <Checkbox
                      id={type}
                      checked={selected === type}
                      onCheckedChange={() => handleCheckboxChange(type)}
                    />
                    <Label
                      htmlFor={type}
                      className="text-sm font-medium text-gray-800 cursor-pointer"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">
                  Please select a notification type
                </p>
              )}

              <Button
                onClick={handleProceed}
                className="w-full bg-green-500 hover:bg-green-600 transition text-base font-medium py-2 rounded-md shadow-md"
              >
                Proceed
              </Button>
            </DialogContent>
          </Dialog>

          {/* Second Modal */}
          <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
            <DialogContent
              className="sm:max-w-[500px] p-6 rounded-lg shadow-lg border border-gray-300"
              onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Create Notification
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter Title"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea
                    id="desc"
                    placeholder="Enter Description"
                    {...register("desc")}
                  />
                  {errors.desc && (
                    <p className="text-red-500 text-sm">
                      {errors.desc.message}
                    </p>
                  )}
                </div>

                <DialogFooter className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Submit
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Notification;
