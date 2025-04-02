import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";

import { SidebarInset, SidebarProvider } from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import Header from "../Dashboard/Header";
import { Book, BookOpen, CalendarCheck, Users } from "lucide-react";

const Academics = () => {
    const navigate = useNavigate();

    const cardData = [
        { 
          title: "Courses / Classes", 
          value: 0, 
          icon: <Book className="w-6 h-6 text-blue-600" />, 
          link: "/Courses",
          Total: "Total Courses Active" 
        },
        { 
          title: "Sessions", 
          value: 42, 
          icon: <CalendarCheck className="w-6 h-6 text-green-600" />, 
          link: "/Sessions",
          Total: "Total Sessions" 
        },
        { 
          title: "Subjects", 
          value: 35, 
          icon: <BookOpen className="w-6 h-6 text-yellow-600" />, 
          link: "/Subjects",
          Total: "Total Subjects Active" 
        },
        { 
          title: "Batches / Section", 
          value: 56, 
          icon: <Users className="w-6 h-6 text-red-600" />, 
          link: "/Batches",
          Total: "Total Batches" 
        }
      ];
      

    return (
        <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="flex-1 overflow-auto">
                    <div className="flex flex-col items-center min-h-screen p-4 space-y-6">
                        {/* 3 Cards Below in a Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-8xl">
                            {cardData.map((card, index) => (
                                <div key={index} className="w-full">
                                    <Card className="w-full p-4 shadow-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                                        <CardHeader className="flex items-center justify-between">
                                            <CardTitle className="text-xl font-bold text-center">{card.title}</CardTitle>
                                            {card.icon}
                                        </CardHeader>
                                        <CardContent className="flex items-center justify-center">
                                            <span className="text-3xl font-bold text-blue-600">
                                                {card.value.toLocaleString()}
                                            </span>
                                        </CardContent>
                                        <CardFooter className="flex flex-col items-center space-y-2">
                                            <CardDescription className="text-gray-700 font-bold dark:text-gray-300">{card.Total}</CardDescription>
                                            <Button
                                                className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                                                onClick={() => navigate(card.link)} // Navigate to the respective page
                                            >
                                                More Details
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

            </SidebarInset>
        </SidebarProvider>
    );
};

export default Academics;
