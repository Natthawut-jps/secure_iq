import { cookies } from "next/headers"
import PostsClient from "./PostsClient"

interface Props {
    searchParams: Promise<{ page?: string }>
}

export default async function PostsPage({ searchParams }: Props) {
    const params = await searchParams
    const currentPage = Number(params.page) || 1
    const token = (await cookies()).get('_ssid')?.value

    const res = await fetch(
        `${process.env.API_URL}/api/v1/posts?page=${currentPage}&limit=4`,
        {
            headers: { Authorization: `Bearer ${token}` },
            next: { revalidate: 0 },
        }
    )
    const data = await res.json()

    return <PostsClient data={data} currentPage={currentPage} />
}