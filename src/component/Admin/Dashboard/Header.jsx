import React, { useState, useEffect, useContext } from "react";
import { LogOut, Search, Bell, User, Moon, Sun } from "lucide-react";
import {
    Avatar, AvatarFallback, AvatarImage,
} from "../../src/components/ui/avatar";
import { Input } from "../../src/components/ui/input";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../src/components/ui/sidebar";
import AppSidebar from "../../src/components/ui/app-sidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../src/components/ui/dialog";
import { Button } from "../../src/components/ui/Button";
import { useNavigate } from "react-router-dom";
import ThemeContext from "./ThemeContext";

const Header = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [logout, setLogout] = useState(false);
    // const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
    const [activePage, setActivePage] = useState("Dashboard"); // Tracks active page

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (darkMode) {
    //         document.documentElement.classList.add("dark");
    //         localStorage.setItem("theme", "dark");
    //     } else {
    //         document.documentElement.classList.remove("dark");
    //         localStorage.setItem("theme", "light");
    //     }
    // }, [darkMode]);

    useEffect(() => {
        if (logout) {
            const timer = setTimeout(() => setLogout(false), 10000);
            return () => clearTimeout(timer);
        }
    }, [logout]);

    return (
    <>
          
                <header className="flex sticky top-0 shrink-0 gap-2 border-b z-[50] h-16 bg-white dark:bg-gray-900 shadow-md items-center px-6">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex w-full items-center justify-between">
                        {/* Dynamic Page Title */}
                        <h1 className="text-2xl ps-9 font-semibold text-blue-700 dark:text-white">
                            {/* {activePage} */}
                            Dashboard
                        </h1>

                        {/* Search Bar */}
                        <div className="relative hidden lg:flex items-center border border-blue-400 dark:border-gray-600 shadow rounded w-full max-w-md">
                            <Search size={20} className="absolute left-3 text-gray-500 dark:text-gray-400" />
                            <Input type="number" placeholder="By Search Year..." className="border-none bg-transparent focus:ring-0 w-full pl-10 text-gray-900 dark:text-white" />
                        </div>

                        {/* Right Section: Icons & Profile */}
                        <div className="flex items-center space-x-6">
                            <button className="lg:hidden flex items-center focus:outline-none"
                                onClick={() => setSearchOpen(!searchOpen)}
                                aria-label="Toggle search">
                                <Search size={25} className="text-gray-700 dark:text-white" />
                            </button>

                            <div className="hidden lg:flex items-center space-x-4">
                                <button onClick={() => setDarkMode(!darkMode)} className="focus:outline-none">
                                    {darkMode ? <Sun size={25} className="text-yellow-400" /> : <Moon size={25} className="text-gray-700 dark:text-white" />}
                                </button>
                                <div className="relative">
                                    <Bell size={25} className="text-gray-700 dark:text-white cursor-pointer" />
                                    <span className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                                </div>
                            </div>

                            {/* Avatar Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2">
                                    <div className="flex flex-col space-y-2 lg:hidden">
                                        <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-2 text-gray-900 dark:text-white">
                                            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700 dark:text-white" />}
                                            <span>Dark Mode</span>
                                        </button>
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                                            <Bell size={18} />
                                            <span>Notifications</span>
                                        </div>
                                    </div>
                                    <DropdownMenuItem onClick={() => navigate("/settings")} className="flex items-center gap-2 cursor-pointer text-gray-900 dark:text-white">
                                        <User size={18} /> Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setLogout(true)} className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400">
                                        <LogOut size={18} /> Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Logout Confirmation Dialog */}
                            <Dialog open={logout} onOpenChange={setLogout}>
                                <DialogContent className="sm:max-w-[425px] shadow-lg p-6 rounded-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-[22px] font-semibold">
                                            Confirm Logout
                                        </DialogTitle>
                                        <DialogDescription className="text-center text-md">
                                            Are you sure you want to log out?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <hr className="mt-4" />
                                    <div className="flex justify-center gap-4 mt-4">
                                        <Button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                                            onClick={() => setLogout(false)}>
                                            Cancel
                                        </Button>
                                        <Button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                            onClick={() => setLogout(false)}>
                                            Logout
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </header>
        
       


    </>
      
    );
};

export default Header;
