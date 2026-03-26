"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { DeleteIcon, Eye, MessageCircle, Plus, SquarePenIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
} from "@/components/ui/alert-dialog"
import { getToken } from "@/lib/token";
import { useRouter } from "next/navigation";
// ── Mock data (12 posts = 3 pages × 4 per page) ──
const ALL_POSTS = [
    { id: 1, title: "หลักการ Typography ที่ดีสำหรับเว็บไซต์", excerpt: "การเลือกฟอนต์ที่เหมาะสมและการจัดวางตัวอักษรส่งผลต่อประสบการณ์ผู้ใช้", tag: "Design", views: "1.2k", comments: 24, date: "20 มี.ค. 2026" },
    { id: 2, title: "เริ่มต้นกับ React Hooks ใน 2026", excerpt: "useState, useEffect, useCallback — ทำความเข้าใจ hooks พื้นฐานที่ทุกคนควรรู้", tag: "Tech", views: "3.5k", comments: 58, date: "15 มี.ค. 2026" },
    { id: 3, title: "สร้าง Personal Brand บนโลกออนไลน์", excerpt: "แนวทางการสร้างตัวตนและความน่าเชื่อถือในยุคดิจิทัล", tag: "Business", views: "2.1k", comments: 41, date: "10 มี.ค. 2026" },
    { id: 4, title: "Deep Work: ศิลปะแห่งการโฟกัส", excerpt: "เทคนิคที่จะช่วยให้คุณทำงานได้ลึกขึ้น เร็วขึ้น โดยไม่ต้องทำงานนานขึ้น", tag: "Lifestyle", views: "4.8k", comments: 92, date: "5 มี.ค. 2026" },
    { id: 5, title: "CSS Grid vs Flexbox เลือกอะไรดี?", excerpt: "เปรียบเทียบข้อดีข้อเสียของเลย์เอาท์สองรูปแบบ พร้อมตัวอย่างการใช้งานจริง", tag: "Tech", views: "2.9k", comments: 37, date: "1 มี.ค. 2026" },
    { id: 6, title: "Color Theory สำหรับนักพัฒนา", excerpt: "ไม่ต้องเป็นนักออกแบบก็เข้าใจทฤษฎีสีได้ เพื่อสร้าง UI ที่สวยและใช้งานได้จริง", tag: "Design", views: "1.7k", comments: 29, date: "24 ก.พ. 2026" },
    { id: 7, title: "Next.js App Router คืออะไร?", excerpt: "ทำความรู้จัก App Router ใน Next.js 14 และความแตกต่างจาก Pages Router", tag: "Tech", views: "5.1k", comments: 74, date: "18 ก.พ. 2026" },
    { id: 8, title: "Micro-interactions ที่ทำให้ UX ดีขึ้น", excerpt: "รายละเอียดเล็กๆ น้อยๆ ที่สร้างความประทับใจให้กับผู้ใช้งานได้อย่างมาก", tag: "Design", views: "2.3k", comments: 45, date: "12 ก.พ. 2026" },
    { id: 9, title: "สร้าง Side Income จากทักษะ Coding", excerpt: "แนวทางและแพลตฟอร์มที่นักพัฒนาสามารถหารายได้เสริมได้จริงในปี 2026", tag: "Business", views: "6.2k", comments: 103, date: "5 ก.พ. 2026" },
    { id: 10, title: "Tailwind CSS Tips ที่คุณอาจยังไม่รู้", excerpt: "เทคนิคและ utility classes ที่ซ่อนอยู่ใน Tailwind ที่ช่วยประหยัดเวลาได้มาก", tag: "Tech", views: "3.8k", comments: 61, date: "28 ม.ค. 2026" },
    { id: 11, title: "Notion Setup สำหรับ Content Creator", excerpt: "ระบบ workflow และ template ที่ช่วยให้การสร้าง content เป็นเรื่องง่ายขึ้น", tag: "Lifestyle", views: "4.0k", comments: 88, date: "20 ม.ค. 2026" },
    { id: 12, title: "TypeScript Generics อธิบายแบบเข้าใจง่าย", excerpt: "เจาะลึก Generics ใน TypeScript ผ่านตัวอย่างที่ใช้งานได้จริงในโปรเจกต์", tag: "Tech", views: "2.6k", comments: 50, date: "14 ม.ค. 2026" },
];

const TAG_VARIANT: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    Design: "secondary",
    Tech: "default",
    Business: "outline",
    Lifestyle: "secondary",
};

const POSTS_PER_PAGE = 4;

export interface Post {
    id: number;
    title: string;
    content: string;
    tag: string;
    created_at: string;
    updated_at: string;
}


export function ConfirmDeletePost({ id }: { id: number }) {
    const router = useRouter();

    async function deletePost(id: number) {
        const token = await getToken()
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete post");
        }
        router.refresh()
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="cursor-pointer" asChild>
                <DeleteIcon color="#db0f0f" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deletePost(id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default function PostsPage() {
    const [refresh, setRefresh] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState<{ posts: Post[], total: number, limit: number }>({ posts: [], total: 0, limit: POSTS_PER_PAGE });

    const totalPages = Math.ceil((posts ? posts.total : 0) / POSTS_PER_PAGE);

    const getPageNumbers = (): (number | "ellipsis")[] => {
        if (!totalPages || totalPages <= 0) return [] 
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }
        if (currentPage <= 3) {
            return [1, 2, 3, 4, "ellipsis", totalPages]
        }
        if (currentPage >= totalPages - 2) {
            return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        }
        return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages]
    }

    const goTo = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const token = await getToken()
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts?page=${currentPage}&limit=${POSTS_PER_PAGE}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, [currentPage, refresh]);

    return (
        <div className="p-6 space-y-6">
            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        บทความทั้งหมด{" "}
                        <span className="font-medium text-foreground">{posts ? posts.total : 0}</span>{" "}
                        ชิ้น · หน้า{" "}
                        <span className="font-medium text-foreground">{currentPage}</span>{" "}
                        จาก{" "}
                        <span className="font-medium text-foreground">{totalPages}</span>
                    </p>
                </div>
                <Link href="/dashboard/posts/new">
                    <Button size="sm" className="gap-1.5">
                        <Plus className="h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </div>

            {/* ── Posts Grid ── */}
            <div className="grid gap-4 sm:grid-cols-2">
                {posts.posts && posts.posts.map((post) => (
                    <Card
                        key={post.id}
                        className="hover:shadow-md transition-shadow cursor-pointer group"
                    >
                        <CardHeader className="pb-2">
                            <Badge
                                variant={TAG_VARIANT[post.tag] ?? "secondary"}
                                className="w-fit text-xs mb-1"
                            >
                                {post.tag}
                            </Badge>
                            <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                                {post.title}
                            </CardTitle>
                            <CardDescription className="text-xs leading-relaxed">
                                {post.content}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t">
                                <Link href={`/dashboard/posts/manage?id=${post.id}`}>
                                    <span className="flex items-center gap-1">
                                        <SquarePenIcon color="#eccd32" />
                                    </span>
                                </Link>
                                <button onClick={() => setRefresh(refresh + 1)}>
                                    <ConfirmDeletePost id={post.id} />
                                </button>
                                <span className="ml-auto">{post.created_at.slice(0, 10)}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* ── Pagination ── */}
            <Pagination>
                <PaginationContent>
                    {/* Previous */}
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => { e.preventDefault(); goTo(currentPage - 1); }}
                            aria-disabled={currentPage === 1}
                            className={currentPage === 1 ? "pointer-events-none opacity-40" : ""}
                        />
                    </PaginationItem>

                    {/* Page numbers */}
                    {getPageNumbers().map((page, idx) =>
                        page === "ellipsis" ? (
                            <PaginationItem key={`ellipsis-${idx}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(e) => { e.preventDefault(); goTo(page); }}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}

                    {/* Next */}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => { e.preventDefault(); goTo(currentPage + 1); }}
                            aria-disabled={currentPage === totalPages}
                            className={currentPage === totalPages ? "pointer-events-none opacity-40" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}