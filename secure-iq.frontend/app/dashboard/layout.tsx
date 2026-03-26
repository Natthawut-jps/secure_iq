import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        {/* Topbar with toggle button */}
        <header className="flex h-14 items-center border-b px-4 gap-3">
          <SidebarTrigger />
          <h1 className="text-sm font-medium text-muted-foreground">Dashboard</h1>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6">{children}</div>
      </main>
    </SidebarProvider>
    </TooltipProvider>
  );
}