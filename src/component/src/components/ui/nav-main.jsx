"use client"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar"

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem>
            <SidebarMenuButton
              className="pt-6 pb-6 hover:bg-blue-500 hover:text-white "
              asChild
              tooltip={item.tooltip || item.title}
            >
              <a href={item.url}>
                {item.icon && <item.icon />}
                <span 
                className="font-semibold  text-[17px]"
                >{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
