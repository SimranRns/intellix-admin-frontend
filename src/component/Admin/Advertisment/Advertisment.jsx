import React, { useState } from "react";
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
import Notification from "./Notification";

const Advertisment = () => {
  const [images, setImages] = useState([]);
  const [tempImages, setTempImages] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    index: null,
  });
  const [errors, setErrors] = useState({});

  // Handle Image Upload (Temporary)
  const handleTempImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newTempImages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9), // Temporary ID
      url: URL.createObjectURL(file),
      file,
    }));
    setTempImages(newTempImages);
    setErrors({});
  };

  // Add Selected Images
  const handleSubmit = () => {
    if (tempImages.length === 0) {
      setErrors({ images: "At least one image is required." });
      return;
    }
    setImages([...images, ...tempImages]);
    setTempImages([]);
    setDialogOpen(false);
    setErrors({});
  };

  // Open Delete Dialog
  const confirmDelete = (index) => {
    setDeleteDialog({ open: true, index });
  };

  // Delete Image
  const handleDeleteImage = () => {
    setImages(images.filter((_, i) => i !== deleteDialog.index));
    setDeleteDialog({ open: false, index: null });
  };
  const handleDialogClose = () => {
    setDialogOpen(true);
    setTempImages([]); // ✅ Clear images
    setErrors({}); // ✅ Clear errors
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
                <TabsList className="flex bg-white-500 md:grid md:grid-cols-4 gap-8">
                  <TabsTrigger value="tab1">Add Banner</TabsTrigger>
                  <TabsTrigger value="tab2">Add School Image</TabsTrigger>
                  <TabsTrigger value="tab3">Add Popular Course</TabsTrigger>
                  <TabsTrigger value="tab4">Add Notification</TabsTrigger>
                </TabsList>
              </div>

              {/* Tab for Adding Banner Images */}
              <TabsContent value="tab1" className="p-4 text-left">
                <div className="flex justify-end">
                  <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setDialogOpen(true)}>
                        Add Banner
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Choose Banner
                        </DialogTitle>
                      </DialogHeader>
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
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          {tempImages.map((img, index) => (
                            <img
                              key={index}
                              src={img.url}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex justify-end gap-3 mt-4">
                        <Button onClick={() => setDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmit}>Confirm</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Display Uploaded Images */}
                {images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {images.map((img, index) => (
                      <Card
                        key={img.id}
                        className="w-[350px] shadow-md shadow-blue-500/50"
                      >
                        <CardHeader>
                          <img
                            src={img.url}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </CardHeader>
                        <CardContent className="flex justify-end">
                          {/* Button to Open Delete Dialog */}
                          <Button
                            className="bg-red-500 text-white hover:bg-red-600"
                            onClick={() => confirmDelete(index)}
                          >
                            Delete
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Delete Confirmation Dialog */}
                <Dialog
                  open={deleteDialog.open}
                  onOpenChange={(open) =>
                    setDeleteDialog({ open, index: null })
                  }
                >
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
                        onClick={() =>
                          setDeleteDialog({ open: false, index: null })
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-green-600 text-white hover:bg-green-700 "
                        onClick={handleDeleteImage}
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TabsContent>

              {/* Other Tabs */}
              <TabsContent value="tab2" className="p-4 text-left">
                <Add_school_img />
              </TabsContent>
              <TabsContent value="tab3" className="p-4 text-left">
                <Add_popular_course />
              </TabsContent>
              <TabsContent value="tab4" className="p-4 text-left">
                <Notification />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Advertisment;
