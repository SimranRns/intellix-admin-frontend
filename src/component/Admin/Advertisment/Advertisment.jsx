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
import Notification from "./Notification";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { get_banner_api, delete_banner, add_banner } from "../../../Redux_store/Api/Baner";
import logo from "../../../assets/Image/intellix.png"

const Advertisment = () => {
  const [images, setImages] = useState([]);
  const [tempImages, setTempImages] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    index: null,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const { banners, loading, error } = useSelector((state) => state.banner || {})

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
  // Add Selected Images (with API call)
  const handleSubmit = async () => {
    if (tempImages.length === 0) {
      setErrors({ images: "At least one image is required." });
      return;
    }

    setErrors({});
    for (const image of tempImages) {
      const resultAction = await dispatch(add_banner(image.file));

      if (add_banner.rejected.match(resultAction)) {
        console.error("Upload failed:", resultAction.payload);
        // Optional: show an error toast or message here
      }
      dispatch(get_banner_api());
    }

    setTempImages([]);
    setDialogOpen(false);
  };


  // api 

  useEffect(() => {
    dispatch(get_banner_api())
  }, [dispatch])
  // if (loading) {
  //   return (
  //     <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
  //       <div className="relative flex  justify-center items-center">
  //         <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
  //         <img
  //           src={logo}
  //           alt="Loading"
  //           className="rounded-full h-28 w-28"
  //         />
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className="w-full min-h-screen flex flex-col">
      <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="w-full">
            <Tabs  className="m-5">
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
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setDialogOpen(true)}>
                        Add Banner
                      </Button>
                    </DialogTrigger>
                    <DialogContent onPointerDownOutside={(e) => e.preventDefault()}
                      onEscapeKeyDown={(e) => e.preventDefault()}>
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
                        <Button onClick={() => { setDialogOpen(false); onsumbit() }}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                          confirm
                        </Button>

                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Display Uploaded Images */}
                {banners?.banners?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {banners.banners.map((img, index) => (
                      <Card
                        key={img.id}
                        className="shadow-md shadow-blue-500/50 rounded-2xl overflow-hidden "
                      >
                        <CardHeader>
                          <img
                            src={img.image_path}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </CardHeader>
                        <CardContent className="flex justify-end">
                          {/* Button to Open Delete Dialog */}
                          <Button
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-all"
                            onClick={() => setDeleteDialog({ open: true, bannerId: img.id })}
                          >
                            <Trash2 size={20} className="mr-2" /> Delete
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
                  <DialogContent onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}>
                    <DialogHeader>
                      <DialogTitle  >Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p>Are you sure you want to delete this course?</p>
                      <p className="text-sm text-gray-500 mt-2">
                        This action cannot be undone.
                      </p>
                    </div>
                    <DialogFooter className="flex justify-between">
                      <Button
                        onClick={() =>
                          setDeleteDialog({ open: false, index: null })
                        }
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => {
                          dispatch(delete_banner(deleteDialog.bannerId));
                          setDeleteDialog({ open: false, bannerId: null });
                        }}
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