"use client";

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
import { DeleteIcon, Plus, SquarePenIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        const response = await fetch(`/api/posts?id=${id}`, {
            method: "DELETE",
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
            const response = await fetch(`/api/posts?page=${currentPage}&limit=${POSTS_PER_PAGE}`)
            const data = await response.json()
            setPosts(data)
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
                        <span className="font-medium text-foreground">{posts ? posts.total : 1}</span>{" "}
                        ชิ้น · หน้า{" "}
                        <span className="font-medium text-foreground">{currentPage ? currentPage : 0}</span>{" "}
                        จาก{" "}
                        <span className="font-medium text-foreground">{totalPages ? totalPages : 0}</span>
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
                                variant="secondary"
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