import React from "react";
import "./sidebar.css";
import '../../App.css'

import {
  SidebarProvider,
  SidebarTrigger,
} from "../../component/src/components/ui/sidebar";
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
  Sidebar as UISidebar, // Renamed to avoid conflicts
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../component/src/components/ui/sidebar";
import Header from "./Header";

// Sidebar Layout Component
const Sidebar = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

// Sidebar Component
export function AppSidebar() {
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
    <UISidebar className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg border border-3 border-r-blue-500 ">
      <SidebarContent className="p-5 sidebar-content">
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold text-blue-600 mb-8">
            Intelix Icon 
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem className="mb-2" key={title}>
                  <SidebarMenuButton className="button_class" asChild>
                    <a
                      href={url}
                      className="flex items-center gap-4 p-3 rounded-lg transition-colors  hover:bg-blue-500 hover:text-white text-gray-700"
                    >
                      <Icon
                        size={24}
                        className="text-black-500 hover:text-white"
                      />
                      <span className="text-lg font-medium"> {title}</span>
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
