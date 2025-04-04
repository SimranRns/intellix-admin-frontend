import React, { useState, useRef } from "react";
import { Button } from "../../src/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
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
import { Card } from "../../src/components/ui/card";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  desc: z.string().min(1, "Description is required!"),
});

const Notification = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [notifications, setNotifications] = useState([]);
  const inputRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    setNotifications((prev) => [
      ...prev,
      { ...data, date, time, type: selected },
    ]);
    setEditProfileOpen(false);
    setSelected(null);
    setDate(null);
    setTime("");
    reset();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-auto flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-3xl text-gray-500 border border-blue-400 rounded-xl px-4 py-2 shadow-lg flex justify-between items-center"
                >
                  {date ? format(new Date(date), "yyyy-MM-dd") : "Select Date"}
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
            <Input
              ref={inputRef}
              type="date"
              className="hidden"
              value={date ? format(new Date(date), "yyyy-MM-dd") : ""}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Add Notification Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 flex items-center gap-2">
                <Plus size={20} /> Add Notification
              </Button>
            </DialogTrigger>
            <DialogContent
              className="w-full max-w-[90vw] sm:max-w-md p-6 rounded-lg shadow-lg border"
              onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle className="text-center text-lg sm:text-xl font-semibold">
                  Select Notification Type
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 my-4">
                {["public", "private"].map((type) => (
                  <div
                    key={type}
                    className="flex items-center space-x-3 p-3 rounded-md border cursor-pointer"
                    onClick={() => handleCheckboxChange(type)}
                  >
                    <Checkbox
                      id={type}
                      checked={selected === type}
                      onCheckedChange={() => handleCheckboxChange(type)}
                    />
                    <Label
                      htmlFor={type}
                      className="text-sm font-medium cursor-pointer"
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
                className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-md"
              >
                Proceed
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Create Notification Modal */}
        <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
          <DialogContent className="w-full max-w-[90vw] sm:max-w-md p-6 rounded-lg shadow-lg border">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl font-semibold">
                Create Notification
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter Title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  placeholder="Enter Description"
                  {...register("desc")}
                />
                {errors.desc && (
                  <p className="text-red-500 text-sm">{errors.desc.message}</p>
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

        {/* Notifications List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notifications.map((notif, index) => (
            <Card
              key={index}
              className="shadow-md shadow-blue-500/50 rounded-2xl overflow-hidden border border-gray-100/50 "
            >
              <div className="p-4 sm:p-6 relative">
                <div className="" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {notif.title}
                  </h3>
                  <span
                    className={`mt-2 sm:mt-0 px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                      notif.type === "urgent"
                        ? "bg-red-500/10 text-red-600 border border-red-500/20"
                        : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                    }`}
                  >
                    {notif.type}
                  </span>
                </div>
                <p className=" text-sm sm:text-base leading-relaxed bg-gray-50/20 p-3 rounded-xl">
                  {notif.desc}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-gray-500 border-2 border-gray-100 p-2 rounded-xl">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>
                      {notif.date
                        ? format(new Date(notif.date), "MMM dd, yyyy")
                        : "N/A"}{" "}
                      
                    </span>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                </div>
                <Button
                  className="mt-4 w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all"
                  // onClick={() =>
                  //   setNotifications(
                  //     notifications.filter((_, i) => i !== index)
                  //   )
                  // }
                >
                  <Trash2 size={20} className="mr-2" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
