"use client";
 
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SidebarMenuButton } from "@/components/ui/sidebar";
 
export function LogoutButton() {
  const router = useRouter();
 
  const handleLogout = async () => {
    console.log("Logging out...");
    await fetch("/api/auth/logout", {
      method: "GET",
      credentials: "include"
    });
    router.replace("/login");
    router.refresh();
  };
 
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <SidebarMenuButton 
         className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </SidebarMenuButton>
      </AlertDialogTrigger>
 
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ออกจากระบบ</AlertDialogTitle>
          <AlertDialogDescription>
            คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?
            ข้อมูลที่ยังไม่ได้บันทึกอาจสูญหาย
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            ออกจากระบบ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}