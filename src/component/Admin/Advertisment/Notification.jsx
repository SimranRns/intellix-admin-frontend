import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../src/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../src/components/ui/popover";
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
import { ScrollArea } from "../../src/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";
import { useDispatch, useSelector } from "react-redux";
import { add_notification, delete_notify, get_notification } from "../../../Redux_store/Api/Notification";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  desc: z.string().min(1, "Description is required!"),
});

const Notification = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null); // Track which card to delete
  const inputRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [error, setError] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_notification())
  }, [])
  const { notii, loading } = useSelector((s) => s.notify)
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
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
    const payload = {
      head: data.head,
      description: data.description,
      // date,
      // time,
      // type: selected || "public",
    };

    dispatch(add_notification(payload)).then((res) => {
      if (!res.error) {
        reset();
        setEditProfileOpen(false);
        setSelected(null);
        setDate(null);
        setTime("");
      }
    });
  };

  const handleDeleteClick = (index) => {
    setCardToDelete(index);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (cardToDelete !== null) {
      setNotifications((prev) => prev.filter((_, i) => i !== cardToDelete));
      setDeleteDialogOpen(false);
      setCardToDelete(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="w-full sm:w-auto flex-1">
            <Button
              variant="outline"
              className="w-[260px] flex items-center justify-between border border-blue-400 rounded-xl px-4 py-2 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                inputRef.current?.showPicker();
              }}
            >
              {date ? format(new Date(date), "yyy-MM-dd") : "Select Date"}
              <CalendarIcon className="h-5 w-5" />
            </Button>
            <Input
              ref={inputRef}
              type="date"
              className="opacity-0 absolute -z-10"
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Add Notification Button */}
          {/* <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 flex items-center gap-2">
                <Plus size={20} /> Add Notification
              </Button>
            </DialogTrigger>
            <DialogContent onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()} className="max-w-sm w-full">
              <DialogHeader>
                <DialogTitle>Select Notification Type</DialogTitle>
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
                    <Label htmlFor={type}>
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
          </Dialog> */}
          <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 flex items-center gap-2">
                <Plus size={20} /> Add Notification
              </Button>
            </DialogTrigger>
            <DialogContent onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()} className="max-w-sm w-full">
              <DialogHeader>
                <DialogTitle>Create Notification</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter Title"
                    {...register("title")}
                  />
                  {errors.head && (
                    <p className="text-red-500 text-sm">{errors.head.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="desc">Description</Label>
                  <Textarea
                    id="desc"
                    placeholder="Enter Description"
                    {...register("desc")}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                  )}
                </div>
                <DialogFooter>
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

      
       

        {/* Notifications List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notii?.data?.map((notif, index) => (
            <Card
              key={index}
              className="shadow-md shadow-blue-500/50 rounded-2xl overflow-hidden "
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-blue-500">
                    {notif.head}
                  </h3>
                  <span
                    className={`mt-2 sm:mt-0 px-2 py-1 rounded-full text-xs font-semibold uppercase ${notif.type === "urgent"
                      ? "bg-red-500/10 text-red-600 border border-red-500/20"
                      : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                      }`}
                  >
                    {notif.type ? '' : 'Public'}
                  </span>
                </div>
                <ScrollArea className="h-[150px] w-full rounded-lg border border-gray-200 p-4 shadow-sm">
                  <p className="text-sm sm:text-base leading-relaxed  p-4 rounded-xl ">
                    {notif.description}
                  </p>
                </ScrollArea>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500 border-2 border-gray-100 p-2 rounded-xl">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4$w-4 mr-2" />
                    <span>
                      {notif.date
                        ? format(new Date(notif.date), "MMM dd, yyyy")
                        : "02/04/2025"}
                    </span>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                </div>
                <Button
                  onClick={() => dispatch(delete_notify(notif.id))}
                  disabled={loading}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-all"
                >Delete
                </Button>
              </div>
            </Card>
          ))}



        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to delete this notification?</p>
              <p className="text-sm text-gray-500 mt-2">
                This action cannot be undone.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setDeleteDialogOpen(false)}
                // onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  );
};

export default Notification;