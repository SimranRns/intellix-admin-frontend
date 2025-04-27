import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
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
  const { id } = useParams(); // Extract id from URL
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation
  const { student, status, error } = useSelector((state) => state.student); // Redux state

  useEffect(() => {
    if (id) {
      dispatch(getSingleStudent(id)); // Pass id directly or adjust based on API
    } else {
      console.error("No student ID provided in URL");
    }
  }, [id, dispatch]);

  // Map API data to component's expected structure
  const userData = student?.getOne
    ? {
        name: student.getOne.name || "N/A",
        dob: student.getOne.dob
          ? new Date(student.getOne.dob).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A",
        email: student.getOne.email || "N/A",
        phone: student.getOne.contact_no || "N/A",
        joiningDate: student.getOne.created_at
          ? new Date(student.getOne.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A",
        enrollmentId: student.getOne.enrollment_id || "N/A",
        fatherName: student.getOne.father_name || "N/A",
        motherName: student.getOne.mother_name || "N/A",
        aadhar: student.getOne.adhar_no || "N/A",
        address: student.getOne.address || "N/A",
        gender: student.getOne.gender || "N/A",
        courseId: student.getOne.course_id || "N/A",
        batchId: student.getOne.batch_id || "N/A",
        status: student.getOne.status || "N/A",
      }
    : null; // Return null if no student data to handle fallback gracefully

  const personalFields = ["name", "dob", "email", "phone", "joiningDate", "gender"];
  const otherFields = [
    { label: "Enrollment ID", value: userData?.enrollmentId },
    { label: "Father Name", value: userData?.fatherName },
    { label: "Mother Name", value: userData?.motherName },
    { label: "Aadhar", value: userData?.aadhar },
    { label: "Address", value: userData?.address },
    { label: "Course ID", value: userData?.courseId },
    { label: "Batch ID", value: userData?.batchId },
    { label: "Status", value: userData?.status },
  ];

  const goBack = () => {
    navigate(-1); // Navigate back using react-router-dom
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed" || !id) {
    return <div>Error: {error || "Invalid student ID"}</div>;
  }

  if (!userData) {
    return <div>No student data available</div>;
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Button
          onClick={goBack}
          className="w-20 shadow-md rounded-lg flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 gap-3 mt-3 m-2"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        <main className="flex-1 overflow-auto flex justify-center p-6">
          <Card className="w-full max-w-4xl shadow-md border rounded-xl">
            <div className="relative w-full h-40 bg-indigo-700 rounded-t-xl flex items-center px-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg absolute -bottom-12 left-6">
                <AvatarImage src={student?.getOne?.avatar || "https://via.placeholder.com/150"} />
                <AvatarFallback>{userData.name?.slice(0, 2).toUpperCase() || "SD"}</AvatarFallback>
              </Avatar>
              <div className="ml-32 mt-10">
                <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                <p className="text-md text-white opacity-80">Senior Lecturer</p>
              </div>
            </div>
            <CardContent className="mt-16 px-4 sm:px-6 pb-6">
              {/* Personal Details Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-4">
                {personalFields.map((field, index) => (
                  <div key={index}>
                    <p className="font-medium">{field.replace(/([A-Z])/g, " $1").trim()}</p>
                    <p className="text-lg font-semibold">{userData[field] || "N/A"}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              {/* Education & Other Details Section */}
              <h3 className="text-lg font-bold">Education & Other Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-4">
                {otherFields.map((detail, index) => (
                  <div key={index} className="border p-4 rounded-md shadow-md">
                    <p className="font-medium">{detail.label}</p>
                    <p className="text-lg font-semibold">{detail.value || "N/A"}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Profile;