import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../src/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { view_admin_profile } from "../../../Redux_store/Api/adminProfile";
import "./Setting.css";

const View_Profile = () => {
  const [profileImg, setProfileImg] = useState("https://github.com/shadcn.png");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { view, loading, error } = useSelector((state) => state.profile || {});

  useEffect(() => {
    dispatch(view_admin_profile());
  }, [dispatch]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
    }
  };

  const admin = view?.admin;

  return (
    <>
      {admin && (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 pt-4 w-full px-4 md:px-8">
          {/* Left Card - Profile */}
          <div>
            <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg rounded-2xl p-5">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32">
                  <Avatar className="w-full h-full border-4 border-blue-700 shadow-md">
                    <AvatarImage src={profileImg} alt="Profile Image" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <button
                    className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-700 transition"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                </div>
                <CardTitle className="mt-4 text-xl text-gray-600 font-semibold">
                  {admin.full_name || "Admin"}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Developer
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <ul className="space-y-3">
                  <li className="profile_list font-medium">
                    <a href="#">Models</a>
                    <span className="profile_list_number text-blue-600 font-bold">36</span>
                  </li>
                  <li className="profile_list font-medium">
                    <a href="#">Plan</a>
                    <span className="profile_list_number text-green-600 font-bold">
                      {admin.status}
                    </span>
                  </li>
                </ul>
              </CardContent>

              <CardFooter className="flex justify-center gap-4">
                <span className="profile_portfolio">Portfolio</span>
              </CardFooter>
            </Card>
          </div>

          {/* Right Card - Details */}
          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
            <Card className="w-full shadow-lg rounded-2xl p-6">
              <CardHeader>
                <div className="text-md font-semibold text-gray-600">
                  <h1>Admin Details</h1>
                </div>
                <hr className="mt-2" />
              </CardHeader>

              <CardContent className="p-5 mb-5">
                <ul className="space-y-3">
                  {[
                    { label: "Full Name", value: admin.full_name },
                    { label: "Email", value: admin.email },
                    { label: "Phone Number", value: admin.m_number },
                    { label: "Status", value: admin.status },
                    { label: "Created At", value: new Date(admin.createdAt).toLocaleString() },
                  ].map((item, index) => (
                    <React.Fragment key={index}>
                      <li className="flex justify-between text-gray-600 font-medium">
                        <p>{item.label}</p>
                        <span className="font-bold">{item.value}</span>
                      </li>
                      {index !== 4 && <hr />}
                    </React.Fragment>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default View_Profile;