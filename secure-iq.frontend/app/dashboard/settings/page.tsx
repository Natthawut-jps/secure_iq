"use client";
 
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
 
export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    comments: true,
    weekly: true,
    marketing: false,
  });
 
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showViews: true,
  });
 
  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">จัดการการตั้งค่าบัญชีของคุณ</p>
      </div>
 
      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">บัญชีผู้ใช้</CardTitle>
          <CardDescription>ข้อมูลพื้นฐานที่แสดงในโปรไฟล์</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="displayName">ชื่อแสดงผล</Label>
            <Input id="displayName" defaultValue="Somchai P." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">อีเมล</Label>
            <Input id="email" type="email" defaultValue="somchai@example.com" />
          </div>
          <Button size="sm" className="mt-1">บันทึกการเปลี่ยนแปลง</Button>
        </CardContent>
      </Card>
 
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">การแจ้งเตือน</CardTitle>
          <CardDescription>เลือกว่าต้องการรับการแจ้งเตือนประเภทใดบ้าง</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {[
            {
              key: "comments" as const,
              label: "แจ้งเตือนเมื่อมีความคิดเห็นใหม่",
              desc: "รับอีเมลเมื่อมีคนแสดงความคิดเห็น",
            },
            {
              key: "weekly" as const,
              label: "แจ้งเตือนสรุปรายสัปดาห์",
              desc: "รับรายงานสถิติทุกวันจันทร์",
            },
            {
              key: "marketing" as const,
              label: "แจ้งเตือนการตลาด",
              desc: "ข้อมูลอัปเดตและฟีเจอร์ใหม่",
            },
          ].map((item, i, arr) => (
            <div key={item.key}>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={(v) =>
                    setNotifications((prev) => ({ ...prev, [item.key]: v }))
                  }
                />
              </div>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
 
      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">ความเป็นส่วนตัว</CardTitle>
          <CardDescription>ควบคุมการมองเห็นและการแสดงผลโปรไฟล์</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {[
            {
              key: "publicProfile" as const,
              label: "โปรไฟล์สาธารณะ",
              desc: "ให้ผู้อื่นค้นหาโปรไฟล์คุณได้",
            },
            {
              key: "showViews" as const,
              label: "แสดงจำนวนผู้เข้าชม",
              desc: "แสดงสถิติบนบทความทุกชิ้น",
            },
          ].map((item, i, arr) => (
            <div key={item.key}>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={privacy[item.key]}
                  onCheckedChange={(v) =>
                    setPrivacy((prev) => ({ ...prev, [item.key]: v }))
                  }
                />
              </div>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}