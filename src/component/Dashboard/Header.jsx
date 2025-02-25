import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import {
  Disclosure,
  DisclosureButton,
  Menu as HeadlessMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [{ name: "Dashboard", href: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-md border-b border-gray-200"
    >
      <div className="fixed top-0 left-64 right-0 h-16 bg-white px-6 shadow flex items-center justify-between z-50">
        {/* Sidebar Toggle Button */}
        <div className="flex items-center sm:hidden">
          <DisclosureButton
            className="p-2 rounded-md text-gray-600 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </DisclosureButton>
        </div>
        {/* Title */}
        <div className="text-xl font-semibold text-gray-800">Dashboard</div>
        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 w-64">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent focus:outline-none w-full"
            />
          </div>
          {/* Notification Bell */}
          <button className="relative p-2 text-gray-600 hover:text-blue-600 focus:ring-2 focus:ring-gray-500">
            <Bell className="h-6 w-6" />
          </button>
          {/* Profile Dropdown */}
          <HeadlessMenu as="div" className="relative">
            <div>
              <MenuButton className="flex rounded-full bg-gray-100 p-1 focus:ring-2 focus:ring-gray-500">
                <img
                  alt="User"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-10 w-10 rounded-full border border-gray-300"
                />
              </MenuButton>
            </div>
            <MenuItems className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Your Profile
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Settings
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Log out
                  </a>
                )}
              </MenuItem>
            </MenuItems>
          </HeadlessMenu>
        </div>
      </div>
    </Disclosure>
  );
};

export default Header;
