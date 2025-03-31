import React from "react";
import { useNavigate } from "react-router-dom";
import intellix_icon from "../../../../assets/Image/intellix.png";
import { Grip, Home, User, Users, Wallet, ChartColumnIncreasing, CircleHelp, Settings, Clipboard, ListFilterPlus, FileBadge, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "../ui/sidebar";

const AppSidebar = ({ ...props }) => {
  const navigate = useNavigate();
  const { isOpen, toggleSidebar } = useSidebar();

  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Academics", url: "/Academics", icon: FileBadge },
    { title: "Students", url: "/students", icon: Users },
    { title: "Accounts", url: "/Accounts", icon: Wallet },
    { title: "Attendance", url: "/attendance", icon: ChartColumnIncreasing },
    { title: "Team", url: "/team", icon: Users },
    { title: "Leads", url: "/leads", icon: ListFilterPlus },
    { title: "Advertisement", url: "/Advertisement", icon: Clipboard },
    { title: "Support", url: "/support", icon: CircleHelp },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className={`transition-all duration-300 flex flex-col h-screen ${
        !isOpen ? "w-[240px]" : "w-[90px]"
      } overflow-hidden`}
      {...props}
    >
      {/* Sidebar Header */}
      <SidebarHeader className="bg-white dark:bg-gray-900" />

      {/* Sidebar Content */}
      <SidebarContent className="flex-grow overflow-auto bg-white dark:bg-gray-900">
        <SidebarMenu>
          {/* Sidebar Logo & Close Button */}
          <div className="flex items-center justify-between gap-4 ps-2">
            <div className="flex items-center gap-4">
              <img className="w-10 h-10" src={intellix_icon} alt="Intellix Logo" />
              {!isOpen && <h5 className="text-xl font-semibold">Intellix</h5>}
            </div>

            {/* Close Button (Only for Small Screens) */}
            <button
              onClick={() => toggleSidebar(false)}
              className="block sm:hidden p-2 z-50 h-10 w-10 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Menu Items */}
          {items.map(({ title, url, icon: Icon }) => (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton asChild>
                <button
                  onClick={() => {
                    // setActivePage(title);
                    navigate(url);
                  }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-600 hover:text-white w-full"
                >
                  <Icon className="min-w-[25px]" size={25} />
                  {!isOpen && <h5 className="text-xl font-semibold">{title}</h5>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="text-center text-[11px] bg-white dark:bg-gray-900">
        © 2024 Intellix
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
