"use client";
 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Settings, LogOut } from "lucide-react";
 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 
const navItems = [
  {
    title: "Posts",
    url: "/dashboard/posts",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];
 
export function AppSidebar() {
  const pathname = usePathname();
 
  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            M
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">MyApp</p>
            <p className="text-xs text-muted-foreground mt-0.5">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
 
      {/* Main Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
 
      {/* Footer: User + Logout */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          {/* User profile */}
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-default">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback className="rounded-lg bg-muted text-xs font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left text-sm leading-tight">
                <span className="font-medium truncate">John Doe</span>
                <span className="text-xs text-muted-foreground truncate">
                  john@example.com
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
 
          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                // handle logout logic here
                console.log("Logging out...");
              }}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}