import React, { useState } from "react";
import { Menu as LucideMenu, LogOut, Search, Bell } from "lucide-react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu as HeadlessMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [{ name: "Dashboard", href: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Disclosure
      as="nav"
      className="bg-white border border-b-blue-700 shadow-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className={!isSidebarOpen ? "block h-6 w-6" : "hidden"}
              />
              <XMarkIcon
                className={isSidebarOpen ? "block h-6 w-6" : "hidden"}
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <h3
                    key={item.name}
                    className="font-semibold font-serif tracking-wide text-xl"
                  >
                    {item.name}
                  </h3>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-lg border border-gray-300">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent focus:outline-none"
              />
            </div>
            <button className="relative rounded-full p-2 text-gray-600 hover:text-blue-600 focus:ring-2 focus:ring-gray-500">
              <BellIcon className="h-6 w-6" />
            </button>
            <HeadlessMenu as="div" className="relative">
              <div>
                <MenuButton className="flex rounded-full bg-gray-100 p-1 text-sm focus:ring-2 focus:ring-gray-500">
                  <img
                    alt="User"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
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
      </div>
    </Disclosure>
  );
};

export default Header;
