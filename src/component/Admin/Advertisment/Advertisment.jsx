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
const base_img_url = "https://adminv2-api-dev.intellix360.in/"
const Advertisment = () => {
  const [images, setImages] = useState([]);
  const [tempImages, setTempImages] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    index: null,
  });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("tab1"); // Default first tab
  const dispatch = useDispatch();
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

  const handleSubmit = async () => {
    if (tempImages.length === 0) {
      setErrors({ images: "At least one image is required." });
      return;
    }

    try {
      setErrors({});

      // Upload sab images parallel
      const uploadPromises = tempImages.map((image) =>
        dispatch(add_banner(image.file))
      );

      const results = await Promise.all(uploadPromises);

      // Check karo koi upload fail hua ya nahi
      const anyFailed = results.some((result) => add_banner.rejected.match(result));

      if (anyFailed) {
        console.error("One or more uploads failed");
        setErrors({ images: "Upload failed. Please try again." });
        return; // Agar fail hua to band mat karo, bas error dikhao
      }

      // Agar sab upload success hain, to:
      setDialogOpen(false); // 1. Modal band karo
      setTempImages([]);    // 2. Temp images clear karo
      await dispatch(get_banner_api()); // 3. Data reload karo

    } catch (error) {
      console.error("Something went wrong during uploading:", error);
      setErrors({ images: "Unexpected error occurred. Try again!" });
    }
  };




  const handleDeleteConfirm = async (bannerId) => {
    try {
      const resultAction = await dispatch(delete_banner(bannerId));
      if (delete_banner.rejected.match(resultAction)) {
        console.error("Delete failed:", resultAction.payload);
      }
    } catch (error) {
      console.error("Something went wrong during deletion:", error);
    }
  };



  // api 
  useEffect(() => {
    dispatch(get_banner_api());
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="w-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="m-5"
            >
              <div className="overflow-x-auto md:overflow-hidden shadow-md shadow-blue-300/30">
                <TabsList className="flex md:grid md:grid-cols-4 gap-8  px-4  lg:px-8 mb-5 ">
                  <TabsTrigger
                    value="tab1"
                    // className={ ? "bg-blue-500 text-white" : ""}
                    className={`rounded-md px-3 py-2 text-[12px] font-medium ${activeTab === "tab1" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white '}`}
                  >
                    Add Banner
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab2"
                    className={`rounded-md px-3 py-2 text-[12px] font-medium ${activeTab === "tab2" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                  >
                    Add School Image
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab3"
                    className={`rounded-md px-3 py-2 text-[12px] font-medium ${activeTab === "tab3" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                  >
                    Add Popular Course
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab4"
                    className={`rounded-md px-3 py-2 text-[12px] font-medium ${activeTab === "tab4" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                  >
                    Add Notification
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* {loading ? (
                <div className="h-[400px] flex items-center justify-center text-white">
                  <div className="relative flex justify-center items-center">
                    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
                    <img
                      src={logo}
                      alt="Loading"
                      className="rounded-full h-28 w-28"
                    />
                  </div>
                </div>
              ) : 
              
              error ? (
                <div className="h-[400px] flex justify-center items-center">
                  <div className="text-red-700 text-lg">
                    {error?.message ? error.message : "Something went wrong!"}
                  </div>
                </div>
              ) : banners?.banners?.length > 0 ? (
                <> */}


              {/* Tab for Adding Banner Images */}
              < TabsContent value="tab1" className="p-4 text-left">
                {/* Tab content for "Add Banner" */}
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
                      <DialogFooter className="flex justify-end gap-3 mt-4">
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                          Confirm
                        </Button>
                      </DialogFooter>


                    </DialogContent>
                  </Dialog>
                </div>

                {/* Display Uploaded Images */}
                {banners?.banners?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {banners?.banners?.map((img, index) => (
                      <Card
                        key={img.id}
                        className="shadow-md shadow-blue-500/50 rounded-2xl overflow-hidden"
                      >
                        <CardHeader>
                          <img
                            src={img.image_path ? `${base_img_url}${img.image_path}` : "https://via.placeholder.com/300x150?text=Banner+Image"}
                            alt="Banner Image"
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </CardHeader>
                        <CardContent className="flex justify-end">
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
                      <DialogTitle>Confirm Deletion</DialogTitle>
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
                        onClick={async () => {
                          await handleDeleteConfirm(deleteDialog.bannerId); // wait deletion
                          await dispatch(get_banner_api()); // then refresh
                          setDeleteDialog({ open: false, index: null }); // close modal after success
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
              {/* </>
              ) : (
                <div className="h-[400px] flex justify-center items-center">
                  <div className="text-gray-400 text-lg">No banners found</div>
                </div>
              )} */}
            </Tabs>

          </div>
        </SidebarInset>
      </SidebarProvider>
    </div >
  );
};

export default Advertisment;
