import React, { useEffect, useState } from "react";
import AppSidebar from "../../src/components/ui/app-sidebar";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../src/components/ui/tabs";
import { SidebarInset, SidebarProvider } from "../../src/components/ui/sidebar";
import Header from "../Dashboard/Header";
import { Button } from "../../src/components/ui/button";
import { Card, CardContent, CardHeader } from "../../src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import { Input } from "../../src/components/ui/input";
import Add_school_img from "./Add_school_img";
import Add_popular_course from "./Add_popular_course";

const Advertisment = () => {
  const [images, setImages] = useState([]); // Stores confirmed images
  const [tempImages, setTempImages] = useState([]); // Stores selected images before confirmation
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [secDialogOpen, setsecDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle file selection (store in tempImages)
  const handleTempImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newTempImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file, // Store actual file reference
    }));
    setTempImages(newTempImages);
  };

  // Confirm and add images to the main state
  const handleSubmit = () => {
    if (tempImages.length === 0) {
      setErrors({ images: "At least one image is required." });
      return;
    }
    setImages((prevImages) => [...prevImages, ...tempImages]); // Save images
    setTempImages([]); // Clear temp images
    setIsDialogOpen(false); // Close modal
  };

  // Delete an image
  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Reset temp images when modal is reopened
  const handleDialogOpenChange = (isOpen) => {
    setIsDialogOpen(isOpen);
    if (!isOpen) {
      setTempImages([]); // Clear temp images on close
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="w-full">
            <Tabs defaultValue="tab1" className="m-5">
              <div className="overflow-x-auto md:overflow-hidden shadow-sm shadow-blue-300/50">
                <TabsList className="flex bg-white-500 md:grid md:grid-cols-4 gap-3 whitespace-nowrap">
                  <TabsTrigger
                    value="tab1"
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    Add Banner
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab2"
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    Add School Image
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab3"
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    Add Popular Course
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab4"
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    Add Notification
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Add Banner Section */}
              <TabsContent value="tab1" className="p-4 text-left">
                <div className="flex justify-end">
                  <Dialog
                    open={isDialogOpen}
                    onOpenChange={handleDialogOpenChange}
                  >
                    <DialogTrigger asChild>
                      <Button onClick={() => setIsDialogOpen(true)}>
                        Add Banner
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Choose Banner
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <label htmlFor="upload" className="mb-4">
                          Upload Picture
                        </label>
                        <Input
                          id="upload"
                          type="file"
                          multiple
                          onChange={handleTempImageChange}
                        />
                        {errors.images && (
                          <p className="text-red-500">{errors.images}</p>
                        )}
                        {tempImages.length > 0 && (
                          <div className="grid grid-cols-2 gap-4">
                            {tempImages.map((img, index) => (
                              <img
                                key={index}
                                src={img.url}
                                alt={`Selected ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex gap-5 mt-5 justify-end">
                          <Button
                            onClick={() => {
                              setIsDialogOpen(false);
                              setTempImages([]); 
                              setErrors({}); 
                            }}
                          >
                            Cancel
                          </Button>

                          <Button onClick={handleSubmit}>Confirm</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Display Confirmed Images */}
                <div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                      {images.map((img, index) => (
                        <Card key={index} className="w-[350px]">
                          <CardHeader>
                            <img
                              src={img.url}
                              alt={`Banner ${index + 1}`}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          </CardHeader>
                          <CardContent className="flex justify-end">
                            <Dialog
                              open={secDialogOpen}
                              onOpenChange={setsecDialogOpen}
                            >
                              <DialogTrigger>
                                <Button className="bg-red-500 text-white hover:bg-red-600 hover:text-white">
                                  Delete
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="text-center">
                                    Confirm Delete
                                  </DialogTitle>
                                </DialogHeader>
                                <p className="text-center">
                                  Are you sure you want to delete this image?
                                </p>
                                <DialogFooter className="flex justify-between">
                                  <Button
                                    onClick={() => setsecDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleDeleteImage(index)}
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

              {/* Other Sections */}
              <TabsContent value="tab2" className="p-4 text-left">
                <Add_school_img />
              </TabsContent>
              <TabsContent value="tab3" className="p-4 text-left">
                <Add_popular_course />
              </TabsContent>
              <TabsContent value="tab4" className="p-4 text-left">
                <p className="font-semibold text-xl">School Info 5 Content</p>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Advertisment;
