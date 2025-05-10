import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleStudent } from "../../../../Redux_store/Api/StudentsApiStore";
import { Card, CardContent } from "../../../src/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../src/components/ui/avatar";
import { SidebarInset, SidebarProvider } from "../../../src/components/ui/sidebar";
import AppSidebar from "../../../src/components/ui/app-sidebar";
import { Separator } from "../../../src/components/ui/separator";
import { Button } from "@headlessui/react";
import { ArrowLeft } from "lucide-react";
import Header from "../../Dashboard/Header";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Profile = useSelector((state) => state.students.Profile);

  useEffect(() => {
    if (id) {
      dispatch(getSingleStudent({ id }));
    } else {
      console.error("No student ID provided in URL");
    }
  }, [id, dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Button
          className="w-[160px] bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
          onClick={goBack}
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline">Back to Student</span>
        </Button>
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 w-full h-screen flex flex-col items-center">
            <Card className="w-full max-w-4xl shadow-md border rounded-xl ">
              <div className="relative w-full h-40 bg-indigo-700 rounded-t-xl flex items-center px-6">
                <div className="ml-32 mt-10">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg absolute -bottom-12 left-6">
                    <AvatarImage
                      className="rounded-full border-4 border-blue-600"
                      src={Profile?.data?.image || "https://img.freepik.com/premium-vector/man-profile_1083548-15963.jpg"}
                      alt={Profile?.data?.name || "student"}
                    />
                    <AvatarFallback>{Profile?.data?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-white">{Profile?.data?.name}</h2>
                  <p className="text-md text-white opacity-80">{Profile?.data?.course_id}</p>
                </div>
              </div>

              <CardContent className="mt-16 px-4 sm:px-6 pb-6">
                <div className="flex flex-col sm:flex-row gap-6 mt-6">
                  {/* Profile Info Box */}
                  <div className="flex-1 shadow-md rounded-2xl p-3">
                    <h2 className="text-2xl font-bold mb-6">Student Details</h2>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-500">Enrollment ID</p>
                        <p className="text-lg font-semibold text-gray-500">{Profile?.data?.enrollment_id || "N/A"}</p>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="text-lg font-semibold text-gray-500">
                          {new Date(Profile?.data?.dob).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="text-lg font-semibold text-gray-500">{Profile?.data?.gender || "N/A"}</p>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-lg font-semibold text-gray-500">{Profile?.data?.email || "N/A"}</p>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-500">Contact Number</p>
                        <p className="text-lg font-semibold text-gray-500">{Profile?.data?.contact_no || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <div className="p-6 border rounded-2xl mt-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-500">Permanent Address</h2>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-lg font-semibold text-gray-500">{Profile?.data?.address || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">Parent Details</h3>
                <div className="p-6 border rounded-2xl mt-6">
                  <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Father's Name</p>
                      <p className="text-lg font-semibold text-gray-500">{Profile?.data?.father_name || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Mother's Name</p>
                      <p className="text-lg font-semibold text-gray-500">{Profile?.data?.mother_name || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-2">Personal Details</h3>
                <div className="p-6 border rounded-2xl mt-6">
                  <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Count EMI</p>
                      <p className="text-lg font-semibold text-gray-500">{Profile?.data?.count_emi || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Aadhar Card No</p>
                      <p className="text-lg font-semibold text-gray-500">{Profile?.data?.adhar_no || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Pancard No</p>
                      <p className="text-lg font-semibold text-gray-500">{Profile?.data?.pancard_no || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Discount Fees</p>
                      <p className="text-lg font-semibold text-gray-500">{Profile?.data?.discount_amount || "N/A"}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Final Fees</p>
                      <p className="text-lg font-semibold text-gray-500">{Profile?.data?.final_amount || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Profile;
