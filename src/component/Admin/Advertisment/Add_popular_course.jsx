import React, { useRef, useState } from "react";
import { Button } from "../../src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";
import { Input } from "../../src/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { ScrollArea } from "../../src/components/ui/scroll-area";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  desc: z.string().min(1, { message: "Description is required!" }),
  image: z
    .any()
    .refine((file) => file instanceof File, { message: "Image is required!" }),
});

const AddPopularCourse = () => {
  const [cards, setCards] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      desc: "",
      image: null,
    },
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      form.setValue("image", file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data) => {
    setCards((prevCards) => [
      ...prevCards,
      {
        title: data.title,
        desc: data.desc,
        image: imagePreview,
      },
    ]);

    form.reset();
    setImagePreview(null);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4 sm:p-6 md:p-8">
      <div className=" w-full flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="px-6 py-2 text-lg rounded-md shadow-md">
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent
            className="w-full max-w-md p-6 rounded-lg"
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogHeader> 
              <DialogTitle className="text-center text-2xl font-semibold">
                Add Course
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter course description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormControl>
                    <input
                      id="picture"
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={handleButtonClick}
                    className="w-full"
                  >
                    Upload Picture
                  </Button>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 w-full h-32 object-cover rounded-md"
                    />
                  )}
                  <FormMessage />
                </FormItem>

                <Button
                  type="submit"
                  className="w-full py-2 text-lg rounded-lg"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {cards.map((card, index) => (
          <Card key={index} className="shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {card.image && (
                <img
                  src={card.image}
                  alt="Course"
                  className="w-full h-40 object-cover rounded-md"
                />
              )}
            </CardContent>
            <ScrollArea className="h-[150px] w-full rounded-md border p-4">
              <CardDescription>{card.desc}</CardDescription>
            </ScrollArea>
            <CardFooter className="mt-5 flex justify-center">
              <Button className="bg-red-500 text-white hover:bg-red-600 hover:text-white">
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddPopularCourse;
