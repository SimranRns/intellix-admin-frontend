import React, { useState } from "react";
import intellix_icon from "../../../../assets/Image/intellix.png";
import { X, Grip, Home, Inbox, User, Users, Wallet, ChartColumnIncreasing, CircleHelp, Settings, Clipboard } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter
} from "../ui/sidebar";

const AppSidebar = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const items = [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Inbox", url: "/inbox", icon: Inbox },
        { title: "Students", url: "/students", icon: Users },
        { title: "Accounts", url: "/accounts", icon: Wallet },
        { title: "Attendance", url: "/attendance", icon: ChartColumnIncreasing },
        { title: "Team", url: "/team", icon: Users },
        { title: "Advertisment", url: "/Advertisment", icon: Clipboard },
        { title: "Support", url: "/support", icon: CircleHelp },
        { title: "Settings", url: "/settings", icon: Settings },
    ];

    return (
        <Sidebar collapsible="icon" variant="" {...props}>
            <div className="relative h-screen">
                <SidebarHeader>           <div className="flex items-center gap-3 px-4 py-4">
                    <img sizes={25} className="w-12 h-10" src={intellix_icon} alt="Intellix Logo" />
                    <div
                        className={`transition-all duration-300 overflow-hidden ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                            }`}
                    >
                        <h5 className="text-xl font-semibold whitespace-nowrap">Intellix</h5>
                    </div>
                </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {items.map(({ title, url, icon: Icon }) => (
                                <SidebarMenuItem key={title}>
                                    <SidebarMenuButton asChild>
                                        <a
                                            href={url}
                                            className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all hover:bg-blue-600 hover:text-white"
                                        >
                                            <Icon size={25} className="hover:text-white" />
                                            {isOpen && <span className="text-lg font-medium">{title}</span>}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </div>
        </Sidebar>
    );
};

export default AppSidebar;