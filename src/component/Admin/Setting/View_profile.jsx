import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../src/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
import "./Setting.css";
import { Camera } from "lucide-react";

const ViewProfile = () => {
    const [profileImg, setProfileImg] = useState("https://github.com/shadcn.png");
    const fileInputRef = useRef(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImg(imageUrl);
        }
    };
    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 pt-4 ">
            <div>
                <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg rounded-2xl p-5 bg-white">
                    <CardHeader className="flex flex-col items-center text-center">
                        <div className="relative avatar w-25 h-25">
                            <Avatar className="w-full h-full border-4 border-blue-700 shadow-md">
                                <AvatarImage src={profileImg} alt="Profile Image" />
                                <AvatarFallback>CN</AvatarFallback>
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
                        <CardTitle className="mt-4 text-xl text-gray-600 font-semibold">Nella Vita</CardTitle>
                        <CardDescription className="text-gray-500">Developer</CardDescription>
                    </CardHeader>

                    <CardContent className="text-center">
                        <ul className="space-y-3">
                            <li className="profile_list font-medium">
                                <a href="Models">Models</a>
                                <span className="profile_list_number text-blue-600 font-bold">36</span>
                            </li>
                            <li className="profile_list font-medium">
                                <a href="Plan">Plan</a>
                                <span className="profile_list_number text-green-600 font-bold">Active</span>
                            </li>

                        </ul>

                    </CardContent>

                    <CardFooter className="flex justify-center gap-4">
                        <span className="profile_portfolio">Portfolio</span>
                    </CardFooter>
                </Card>
            </div>
            <div className="ms-6 w-full h-full">
                <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg rounded-2xl bg-white p-6">
                    <CardHeader>
                        <div className="text-md font-semibold text-gray-600">
                            <h1>Admin Details</h1>
                        </div>
                        <hr className="mt-2" />
                    </CardHeader>

                    <CardContent className="p-5">
                        <ul className="space-y-3">
                            <li className="flex justify-between text-gray-600 font-medium">
                                <p>Name</p>
                                <span className=" font-bold">Nella</span>
                            </li>
                            <hr></hr>
                            <li className="flex justify-between text-gray-600 font-medium">
                                <p>Surname</p>
                                <span className=" font-bold">Brahim</span>
                            </li>
                            <hr></hr>
                            <li className="flex justify-between text-gray-600 font-medium">
                                <p>Email</p>
                                <span className=" font-bold">Jhon@gamil.com</span>
                            </li>
                            <hr></hr>
                            <li className="flex justify-between text-gray-600 font-medium">
                                <p>Phone Number</p>
                                <span className=" font-bold">0987654321</span>
                            </li>
                            <hr></hr>
                            <li className="flex justify-between text-gray-600 font-medium">
                                <p>City</p>
                                <span className=" font-bold">Jaipur</span>
                            </li>
                            <hr></hr>
                            <li className="flex justify-between text-gray-600 font-medium">
                                <p>State</p>
                                <span className=" font-bold">Rajasthan</span>
                            </li>
                            <hr></hr>
                            <li className="flex justify-between text-gray-600 font-medium">
                                <p>Pincode</p>
                                <span className=" font-bold">000000</span>
                            </li>
                            <hr></hr>
                        </ul>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default ViewProfile;
