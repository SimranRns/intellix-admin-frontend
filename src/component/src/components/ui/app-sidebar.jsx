import React from "react";
import "../../../Admin/Dashboard/Sidebar.css";
import intellix_icon from "../../../../assets/Image/intellix.png";
import { Grip, Home, User, Users, Wallet, ChartColumnIncreasing, CircleHelp, Settings, Clipboard, ListFilterPlus, FileBadge } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    useSidebar,
    SidebarRail
} from "../ui/sidebar";

const AppSidebar = (props) => {
    const { isOpen, toggleSidebar } = useSidebar();

    const items = [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Academics", url: "/academy", icon: FileBadge },
        { title: "Students", url: "/students", icon: Users },
        { title: "Accounts", url: "/accounts", icon: Wallet },
        { title: "Attendance", url: "/attendance", icon: ChartColumnIncreasing },
        { title: "Team", url: "/team", icon: Users },
        { title: "Leads", url: "/leads", icon: ListFilterPlus },
        { title: "Advertisement", url: "/advertisement", icon: Clipboard },
        { title: "Support", url: "/support", icon: CircleHelp },
        { title: "Settings", url: "/settings", icon: Settings },
    ];

    return (
        <Sidebar
            collapsible="icon"
            className={`transition-all duration-300 ${!isOpen ? "w-[240px]" : "w-[90px]"}`}
            {...props}
        >
            {/* <SidebarHeader className="flex items-center justify-between px-3">
                <div className="flex items-center gap-3">
                    <img className="w-10 h-10" src={intellix_icon} alt="Intellix Logo" />
                    {!isOpen && <h5 className="text-xl font-semibold">Intellix</h5>}
                </div>
               
               
            </SidebarHeader> */}

            {/* <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map(({ title, url, icon: Icon }) => (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton asChild>
                                    <a
                                        href={url}
                                        className="flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-blue-600 hover:text-white"
                                    >
                                        <Icon className="hover:text-white" size={25} />
                                        {isOpen && <span className="text-lg font-medium">{title}</span>}
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent> */}

            {/* <SidebarFooter>
                <div className="p-4 text-center text-sm text-gray-400">© 2024 Intellix</div>
            </SidebarFooter> */}

            <SidebarHeader>
            <div className="flex items-center gap-3">
                    <img className="w-10 h-10" src={intellix_icon} alt="Intellix Logo" />
                    {!isOpen && <h5 className="text-xl font-semibold">Intellix</h5>}
                </div>
            </SidebarHeader>
            <SidebarContent>
                   <SidebarMenu>
                        {items.map(({ title, url, icon: Icon }) => (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton  asChild>
                                    <a
                                        href={url}
                                        className="flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-blue-600 hover:text-white"
                                    >
                                        <Icon className="hover:text-white" size={25} />
                                       <span className="text-lg font-medium">{title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
            <div className="p-4 text-center text-sm text-gray-400">© 2024 Intellix</div>
            </SidebarFooter>
            {/* <SidebarRail /> */}




        </Sidebar>
    );
};

export default AppSidebar;
