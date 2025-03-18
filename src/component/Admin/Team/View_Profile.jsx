import React from "react";
import { Card, CardContent } from "../../src/components/ui/card";
import { Badge } from "../../src/components/ui/badge";
import { Avatar, AvatarImage } from "../../src/components/ui/avatar";

const View_Profile = ({ user = {} }) => {
    return (
        <div className="flex flex-col items-center p-6 bg-blue-50 min-h-screen">
            <Card className="w-full max-w-4xl p-6 shadow-lg bg-white rounded-xl">
                <div className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 border-4 border-blue-500">
                        <AvatarImage src={user.avatar || "https://via.placeholder.com/100"} alt={user.name || "User"} />
                    </Avatar>
                    <h2 className="text-2xl font-semibold mt-4">{user.name || "N/A"} <span className="text-blue-500">✔</span></h2>
                    <p className="text-gray-500">{user.email || "N/A"}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <CardContent className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Personal Details</h3>
                        <p><strong>Full Name:</strong> {user.fullName || "N/A"}</p>
                        <p><strong>Date of Birth:</strong> {user.dob || "N/A"}</p>
                        <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
                        <p><strong>Nationality:</strong> {user.nationality || "N/A"}</p>
                        <p><strong>Address:</strong> {user.address || "N/A"}</p>
                        <p><strong>Phone Number:</strong> {user.phone || "N/A"}</p>
                    </CardContent>
                    <CardContent className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Account Details</h3>
                        <p><strong>Display Name:</strong> {user.displayName || "N/A"}</p>
                        <p><strong>Account Created:</strong> {user.accountCreated || "N/A"}</p> 
                        <p><strong>Last Login:</strong> {user.lastLogin || "N/A"}</p>
                        <p><strong>Membership Status:</strong> {user.membershipStatus || "N/A"}</p>
                        <p><strong>Account Verification:</strong> <Badge className="bg-green-500 text-white">{user.accountVerification || "N/A"}</Badge></p>
                        <p><strong>Language Preference:</strong> {user.language || "N/A"}</p>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

export default View_Profile;
