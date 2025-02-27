import React, { useState } from "react";
import { Menu, X, LogOut, Search, Bell, User } from "lucide-react";
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-none  p-4  w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-semibold text-blue-700">Dashboard</h1>

        {/* Search Bar */}
        <div className="relative flex items-center border border-1 border-blue-400 shadow rounded flex-1 mx-4 max-w-md">
          <Search size={20} className="absolute left-3 text-gray-500" />
          <Input
            type="search"
            placeholder="Search"
            className="border-1 border-blue-400 bg-transparent focus:ring-0 w-full pl-10"
          />
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex space-x-6 items-center">
            <Bell size={25} />

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white shadow-lg rounded-md p-2">
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <User size={18} /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
                  <LogOut size={18} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 absolute w-full top-16 left-0">
          <NavigationMenuList className="flex flex-col space-y-3 items-center">
            {/* Avatar Dropdown for Mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white shadow-lg rounded-md p-2">
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <User size={18} /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
                  <LogOut size={18} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuList>
        </div>
      )}
    </nav>
  );
};

export default Header;
