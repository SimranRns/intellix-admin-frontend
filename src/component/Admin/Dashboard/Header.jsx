import React, { useState, useEffect, useContext } from "react";
import { LogOut, Search, Bell, User, Moon, Sun, ChevronDown } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../src/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../../Redux_store/Api/Logout_admin";
import { clearToken } from "../../../Redux_store/slices/Logout_Admin";
import { fetchSessions } from "../../../Redux_store/Api/SessionApi";

import { Maximize, Minimize } from "lucide-react";
const Header = () => {

    const [logout, setLogout] = useState(false);

    const [selectedOption, setSelectedOption] = useState("");


    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const dispatch = useDispatch()
    const { Session: sessions, loading, error } = useSelector((state) => state.Session);


    useEffect(() => {
        dispatch(fetchSessions());
    }, [dispatch]);

    const navigate = useNavigate();

    useEffect(() => {
        if (logout) {
            const timer = setTimeout(() => setLogout(false), 10000);
            return () => clearTimeout(timer);
        }
    }, [logout]);


    const token = useSelector((state) => state.logout.token);
    

    const handleLogout = async () => {
        const response = await dispatch(logoutAdmin(token)).unwrap();

        if (response.status == '001') {
            setLogout(false);
            dispatch(clearToken());
            localStorage.removeItem("token");
            navigate('/');
        }

    };

    useEffect(() => {
        if (sessions && sessions.length > 0) {
            const defaultSession = sessions.find(s => s.is_default === true);
            if (defaultSession && !selectedOption) {
                setSelectedOption(defaultSession.session_year);
                
            }
        }
    }, [sessions, selectedOption]);
    
    // for minimize screen 
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

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

                    {/* Right Section: Icons & Profile */}
                    <div className="flex items-center space-x-6">
                        {/* Year Dropdown - visible on all screen sizes */}
                        <div className="w-full max-w-lg ms-4 mt-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="w-full font-medium max-w-lg border border-blue-400 dark:border-blue-300 shadow rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-9 py-2 flex justify-between items-center hover:bg-blue-500 hover:text-white"
                                    > <span>
                                            {loading ? "Loading..." : error ? "Failed to load" : selectedOption || "Select Year"}
                                        </span>


                                        <ChevronDown size={18} />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="start"
                                    className="w-full font-medium max-w-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-2 border border-blue-400 dark:border-blue-300 rounded-lg shadow-md"
                                >
                                    {loading ? (
                                        <div className="px-4 py-2 text-center text-gray-500">Loading...</div>
                                    ) : error ? (
                                        <div className="px-4 py-2 text-center text-red-500">Failed to load</div>
                                    ) : (
                                        sessions?.map((year) => (
                                            <DropdownMenuItem key={year.session_year}
                                                onClick={() => setSelectedOption(year.session_year)} className="cursor-pointer hover:bg-blue-600 hover:text-white px-4 py-2 text-center"
                                            >
                                                {year.session_year}
                                            </DropdownMenuItem>

                                        ))
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <Button
                            variant="ghost"
                            onClick={toggleFullscreen}
                            className="p-2 pt-2 hover:bg-muted rounded-full"
                        >
                            {isFullscreen ? <Minimize size={48} /> : <Maximize size={48} />}
                        </Button>


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
                                        onClick={() => handleLogout()}>
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
