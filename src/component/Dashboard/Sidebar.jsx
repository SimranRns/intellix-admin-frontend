import React from "react";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../../component/src/components/ui/sidebar";
import { Calendar, Home, Inbox, User, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../component/src/components/ui/sidebar";

// Sidebar Layout Component
const SidebarLayout = ({ children }) => {
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
    <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">Intelix icon </SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem className="h-10" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span className="text-lg base/8 ">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SidebarLayout;
