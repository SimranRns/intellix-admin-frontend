import React, { useState } from "react";
import "./sidebar.css";
import intellix_icon from "../../../assets/Image/intellix.png";
import { X, Grip } from "lucide-react";
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../src/components/ui/sidebar";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main
          className="flex-1 transition-all duration-300"
          style={{ marginLeft: isOpen ? "" : "" }}
        >
          <header className="bg-gray-100 p-6 flex items-center gap-4">
            <button onClick={toggleSidebar} className="cursor-pointer">
              {isOpen ? <Grip size={24} className="text-blue-800" /> : <X size={24} className="text-blue-800" />}
            </button>
          </header>
        </main>
      </div>
    </SidebarProvider>
  );
};

export function AppSidebar({ isOpen, toggleSidebar }) {
  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Inbox", url: "/inbox", icon: Inbox },
    { title: "Teacher", url: "/teacher", icon: User },
    { title: "Students", url: "/students", icon: Users },
    { title: "Accounts", url: "/accounts", icon: Wallet },
    { title: "Attendance", url: "/attendance", icon: ChartColumnIncreasing },
    { title: "Team", url: "/team", icon: Users },
    { title: "Support", url: "/support", icon: CircleHelp },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <UISidebar className={`fixed left-0 top-0  h-full bg-indigo-600 shadow-xl transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      <SidebarContent className="mt-5 ps-3 relative flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <img className="w-15 h-10 ps-3" src={intellix_icon} alt="Intellix Logo" />
            {isOpen && <h5 className="text-xl font-semibold">Intellix</h5>}
          </div>
          <button className="text-white" onClick={toggleSidebar}><X size={24} /></button>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <a href={url} className="flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-blue-600 hover:text-white">
                      <Icon className="hover:text-white" size={20} />
                      {isOpen && <span className="text-lg font-medium">{title}</span>}
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
