import React, { useState, useEffect } from "react";
import { LogOut, Search, Bell, User, Moon, Sun } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../src/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuList,
} from "../../src/components/ui/navigation-menu";
import { Input } from "../../src/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className=" bg-white fixed top-0  dark:bg-gray-900  p-3 w-[75%] nav_1 z-50 border-b border-gray-200 dark:border-gray-700 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-semibold text-blue-700 dark:text-white">
          Dashboard
        </h1>

        {/* Search Bar */}
        <div className="relative flex-1 mx-4 max-w-md hidden md:flex items-center border border-1 border-blue-400 dark:border-gray-600 shadow rounded">
          <Search
            size={20}
            className="absolute left-3 text-gray-500 dark:text-gray-400"
          />
          <Input
            type="search"
            placeholder="Search"
            className="border-none bg-transparent focus:ring-0 w-full pl-10 text-gray-900 dark:text-white"
          />
        </div>

        {/* Mobile Search Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <Search size={25} className="text-gray-700 dark:text-white" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="focus:outline-none"
            >
              {darkMode ? (
                <Sun size={25} className="text-yellow-400" />
              ) : (
                <Moon size={25} className="text-gray-700" />
              )}
            </button>
            <Bell size={25} className="text-gray-700 dark:text-white" />
            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2">
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-900 dark:text-white">
                  <User size={18} /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut size={18} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden p-2 absolute w-full top-16 left-0 bg-white dark:bg-gray-900 shadow-md">
          <div className="relative flex items-center border border-1 border-blue-400 dark:border-gray-600 shadow rounded p-2">
            <Search
              size={20}
              className="absolute left-3 text-gray-500 dark:text-gray-400"
            />
            <Input
              type="search"
              placeholder="Search"
              className="border-none bg-transparent focus:ring-0 w-full pl-10 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
