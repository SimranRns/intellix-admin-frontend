import React from "react";
import { Button } from "../src/components/ui/Button";
import { Input } from "../src/components/ui/input";
import { cn } from "../src/lib/utils";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        <nav className="hidden md:flex gap-6">
          <a href="#" className="text-gray-700 hover:text-black">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Features
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Pricing
          </a>
          <a
            href="#"
            className="text-gray-400 pointer-events-none cursor-not-allowed"
          >
            Disabled
          </a>
        </nav>
        <form className="flex items-center gap-2">
          <Input type="search" placeholder="Search" className="w-full md:w-auto" />
          <Button variant="outline">Search</Button>
        </form>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
