import React from "react";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../../component/src/components/ui/sidebar";
import { Calendar, Home, Inbox, User, Settings } from "lucide-react";
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
    { title: "Calendar", url: "Calendar", icon: Calendar },
    { title: "Students", url: "Students", icon: User },
    { title: "Teacher", url: "Teacher", icon: User },
    { title: "Settings", url: "Settings", icon: Settings },
  ];

  return (
    <UISidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">
            Intelix Icon
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem className="h-10" key={title}>
                  <SidebarMenuButton asChild>
                    <a href={url} className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="text-lg">{title}</span>
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
