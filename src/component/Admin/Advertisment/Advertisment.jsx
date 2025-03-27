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

// import { Button } from "@headlessui/react";

const Advertisment = () => {
  const [images, setImages] = useState([]);
  const [tempImages, setTempImages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [secDialogOpen, setsecDialogOpen] = useState(false);

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

  return (
    <div className="w-full min-h-screen flex flex-col">
      <SidebarProvider style={{ "--sidebar-width": "19rem" }}>
        <SidebarInset>
          <div className="w-full">
            <div className="w-full">
              <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
                <AppSidebar />
                <SidebarInset>
                  {/* Header Section */}
                  <header className="flex h-16 items-center gap-2 px-4 w-full">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb className="truncate">
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="#">{<Header />}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </header>
                  {/* Tabs Section */}
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
                            <div className="grid gap-4 py-4">
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="picture" className="mb-4">
                                  Upload Picture
                                </Label>
                                <Input
                                  id="picture"
                                  type="file"
                                  onChange={handleTempImageChange}
                                />
                              </div>
                              <div className="flex gap-5 mt-5 justify-end">
                                <Button
                                  className="w-20 bg-white text-black border-2 border-black hover:bg-white hover:text-black"
                                  onClick={() => setIsDialogOpen(false)}
                                >
                                  Close
                                </Button>
                                <Button
                                  className="w-20"
                                  onClick={handleConfirmImages}
                                >
                                  Confirm
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {/* Image cards  */}
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
                                          onClick={() => setsecDialogOpen(false)}
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
                </SidebarInset>
              </SidebarProvider>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Advertisment;
