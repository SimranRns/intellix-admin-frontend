import React, { useState } from "react";
import "./sidebar.css";
import intellix_icon from "../../../assets/Image/intellix.png";
import { X, Grid } from "lucide-react";
import { SidebarProvider } from "../../src/components/ui/sidebar";
import {
  ChartColumnIncreasing,
  Home,
  Inbox,
  User,
  Settings,
  Wallet,
  CircleHelp,
  Users,
} from "lucide-react";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../src/components/ui/sidebar";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarProvider>
      <div className="relative flex">
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1">
          <button
            onClick={toggleSidebar}
            className="m-4 cursor-pointer fixed top-4 left-4 z-50"
          >
            {isOpen ? <X size={24} /> : <Grid size={24} />}
          </button>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export function AppSidebar({ isOpen, toggleSidebar }) {
  const items = [
    { title: "Dashboard", url: "Dashboard", icon: Home },
    { title: "Inbox", url: "Inbox", icon: Inbox },
    { title: "Teacher", url: "Teacher", icon: User },
    { title: "Students", url: "Students", icon: User },
    { title: "Accounts", url: "Accounts", icon: Wallet },
    { title: "Attendance", url: "Attendance", icon: ChartColumnIncreasing },
    { title: "Team", url: "Team", icon: Users },
    { title: "Support", url: "Support", icon: CircleHelp },
    { title: "Settings", url: "Settings", icon: Settings },
  ];

  return (
    <UISidebar
      className={`fixed left-0 top-0 w-64 h-full bg-[#4b3fff] shadow-lg text-white z-50 transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SidebarContent className="p-5 sidebar-content relative">
        <button
          className="absolute top-4 right-4 text-white"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Grid size={24} />}
        </button>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold text-blue-600 mb-8">
            <div className="flex items-center">
              <img className="logo" src={intellix_icon} alt="Intellix Logo" />
              <h5 className="font-mono ml-2">Intellix</h5>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem className="mb-2" key={title}>
                  <SidebarMenuButton className="button_class" asChild>
                    <a
                      href={url}
                      className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-blue-500 hover:text-white text-gray-700"
                    >
                      <Icon
                        size={20}
                        className="text-black-500 hover:text-white"
                      />
                      <span className="text-lg font-medium">{title}</span> 
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </UISidebar>
  );
}

export default Sidebar;
