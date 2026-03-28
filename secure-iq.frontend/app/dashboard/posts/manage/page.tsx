import { cookies } from "next/headers"
import PostsClient from "./postsClient"

interface Props {
    searchParams: Promise<{ id?: string }>
}

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams
  if (!params.id) {
    return <div>Post not found</div>
  }
    const postId = params.id
    const token = (await cookies()).get('_ssid')?.value

    const res = await fetch(
        `${process.env.API_URL}/api/v1/posts/update?id=${postId}`,
        {
            headers: { Authorization: `Bearer ${token}` },
            next: { revalidate: 0 },
        }
    )
    const data = await res.json()
    return <PostsClient dataProp={data} />
}