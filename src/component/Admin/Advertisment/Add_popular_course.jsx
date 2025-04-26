import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../src/components/ui/card";
import { ScrollArea } from "../../src/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { add_course, get_course } from "../../../Redux_store/Api/Add_popular_course";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [addCourse, setAddCourse] = useState({courseImage:"",courseName:"",courseDescription:""})
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_course())
  }, [])

  const { course, loading, error } = useSelector((state) => state.courses)
  
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      desc: "",
      image: null,
    },
  });
  console.log(addCourse)

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file.name,"********************************")
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      form.setValue("image", file);
      setAddCourse({...addCourse,courseImage:file.name})
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data) => {
    console.log("onsubmit")
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

  const handleDeleteClick = (index) => {
    setCardToDelete(index);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (cardToDelete !== null) {
      setCards((prevCards) => prevCards.filter((_, i) => i !== cardToDelete));
      setDeleteDialogOpen(false);
      setCardToDelete(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4 sm:p-6 md:p-8">
      <div className="w-full flex justify-end">
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
                        <Input placeholder="Enter course title" {...field} 
                        onChange={(e) => {
                          field.onChange(e); // To keep react-hook-form in sync
                          setAddCourse({ ...addCourse, courseName: e.target.value }); // To update your custom state
                        }}
                        />
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
                          onChange={(e) => {
                            field.onChange(e); // To keep react-hook-form in sync
                            setAddCourse({ ...addCourse, courseDescription: e.target.value }); // To update your custom state
                          }}
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
  type="button" // <-- changed submit to button
  className="w-full py-2 text-lg rounded-lg"
  onClick={() => {
    // onSubmit()
    const formdata = new FormData();
    formdata.append("courseName", addCourse.courseName); // key: title
    formdata.append("courseDescription", addCourse.courseDescription); // key: description
    formdata.append("courseImage", addCourse.courseImage); // key: image (File type)
  
    console.log([...formdata.entries()]); // Debugging: क्या जा रहा है server पे
    
    dispatch(add_course(formdata)); ; // Pass your form data
  }}
>
  Submit
</Button>

              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {course?.data?.map((card, index) => (
          <Card key={index} className="shadow-md shadow-blue-500/50 rounded-2xl overflow-hidden ">
            <CardHeader>
              <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {course.image && (
                <img
                  src={card.image}
                  alt="Course"
                  className="w-full h-40 object-cover rounded-md"
                />
              )}
            </CardContent>
            <ScrollArea className="h-[150px] w-full rounded-lg   p-4 shadow-sm">
              <p className="text-sm sm:text-base leading-relaxed border p-4 rounded-xl">
                {card.description}
              </p>
            </ScrollArea>
            <CardFooter className="mt-5 flex justify-center">
              <Button
                onClick={() => handleDeleteClick(index)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-all"
              >
                <Trash2 size={20} className="mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}

      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()} >
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this course?</p>
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
              // onClick={confirmDelete}
              onClick={() => setDeleteDialogOpen(false)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPopularCourse;