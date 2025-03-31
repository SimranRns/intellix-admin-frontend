import React, { useEffect, useState } from "react";
import AppSidebar from "../../src/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../src/components/ui/tabs";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../src/components/ui/sidebar";
import Header from "../Dashboard/Header";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../../src/components/ui/button";
import { Card, CardContent, CardHeader } from "../../src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { Bell, LogOut, Moon, Search, Sun, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../src/components/ui/avatar";
// import { Button } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// validation for file upload
const formSchema = z.object({
  upload: z
    .custom((file) => file instanceof File, { message: "File is required." })
    .refine((file) => file?.size > 0, { message: "Invalid file." }),
});

const Advertisment = () => {
  const [images, setImages] = useState([]);
  const [tempImages, setTempImages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [secDialogOpen, setsecDialogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Handle file selection (store in tempImages)
  const handleTempImageChange = (event) => {
    const files = event.target.files;
    const newTempImages = [];
    for (let i = 0; i < files.length; i++) {
      newTempImages.push(URL.createObjectURL(files[i]));
    }
    setTempImages(newTempImages);
  };

  // Confirm and add images to the main state
  const handleConfirmImages = () => {
    setImages((prevImages) => [...prevImages, ...tempImages]);
    setTempImages([]);
    setIsDialogOpen(false);
  };
  // Delete an image
  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // file upload valid
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upload: undefined,
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("upload", file, { shouldValidate: true });
      clearErrors("upload"); // Clear error when a valid file is selected
    }
  };

  const onSubmit = (data) => {
    if (!data.upload) {
      setError("upload", { type: "manual", message: "File is required." });
      return;
    }
    console.log("Uploaded File:", data.upload);
    setIsDialogOpen(false); // Close dialog on success
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        {/* Pass setActivePage to Sidebar */}
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* Tabs Section */}
          <main className="flex-1 overflow-auto">
            <Tabs defaultValue="tab1" className="m-5">
              <div className="overflow-x-auto md:overflow-hidden">
                <TabsList className="flex bg-white-500  md:grid md:grid-cols-4 gap-3 whitespace-nowrap">
                  <TabsTrigger
                    value="tab1"
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white "
                  >
                    Add Banner
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab2"
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white "
                  >
                    Add School Image
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab3"
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white "
                  >
                    Add Popular Course
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab4"
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white  "
                  >
                    Add Notification
                  </TabsTrigger>
                </TabsList>
                {/* <Button>hii</Button> */}
              </div>

              <TabsContent value="tab1" className="p-4 text-left">
                {/* Image select button */}
                <div className="flex justify-end">
                  <Dialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button onClick={() => setIsDialogOpen(true)}>
                        Add Banner
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="sm:max-w-[425px]"
                      onPointerDownOutside={(e) => e.preventDefault()}
                      onEscapeKeyDown={(e) => e.preventDefault()}
                    >
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Choose Banner
                        </DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                      >
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="upload" className="mb-4">
                            Upload Picture
                          </Label>
                          <Input
                            id="upload"
                            type="file"
                            accept=".png,.jpeg,.jpg,.pdf"
                            {...register("upload")}
                            onChange={handleFileChange}
                          />
                          {errors.upload && (
                            <p className="text-red-500">
                              {errors.upload.message}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-5 mt-5 justify-end">
                          <Button
                            className="w-20 bg-white text-black border-2 border-black hover:bg-white hover:text-black"
                            type="button"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Close
                          </Button>
                          <Button className="w-20" type="submit">
                            Confirm
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                {/* image card */}
                <div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-4 mt-5">
                      {images.map((img, index) => (
                        <Card key={index} className="w-[350px]">
                          <CardHeader className="mb-3">
                            <img
                              src={img}
                              alt={`Selected ${index + 1}`}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          </CardHeader>
                          <CardContent className="flex justify-end">
                            <Dialog
                              open={secDialogOpen}
                              onOpenChange={setsecDialogOpen}
                            >
                              <DialogTrigger>
                                <Button
                                  className="bg-red-500 text-white hover:bg-red-600"
                                  onClick={() => setsecDialogOpen(true)}
                                >
                                  Delete
                                </Button>
                              </DialogTrigger>
                              <DialogContent
                                className="sm:max-w-[400px]"
                                onPointerDownOutside={(e) =>
                                  e.preventDefault()
                                }
                                onEscapeKeyDown={(e) =>
                                  e.preventDefault()
                                }
                              >
                                <DialogHeader>
                                  <DialogTitle className="text-center text-lg font-semibold">
                                    Confirm Delete
                                  </DialogTitle>
                                </DialogHeader>

                                <p className="text-center text-gray-600">
                                  Are you sure you want to delete image
                                </p>

                                <DialogFooter className="flex justify-between">
                                  <Button
                                    variant="outline"
                                    className="border-2 border-black"
                                    onClick={() =>
                                      setsecDialogOpen(false)
                                    }
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() =>
                                      handleDeleteImage(index)
                                    }
                                  >
                                    Confirm
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="tab2" className="p-4 text-left">
                <p className="font-semibold text-xl">
                  School Info 3 Content
                </p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4 text-left">
                <p className="font-semibold text-xl">
                  School Info 4 Content
                </p>
              </TabsContent>
              <TabsContent value="tab4" className="p-4 text-left">
                <p className="font-semibold text-xl">
                  School Info 5 Content
                </p>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </SidebarProvider>


    </div>
  );
};

export default Advertisment;
