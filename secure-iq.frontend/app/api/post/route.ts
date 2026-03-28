import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

// export async function GET(req: NextRequest) {
//     const token = (await cookies()).get('_ssid')?.value
//     const page = req.nextUrl.searchParams.get('page') || '1'
//     const limit = req.nextUrl.searchParams.get('limit') || '10'

//     const res = await fetch(`${process.env.API_URL}/api/v1/posts?page=${page}&limit=${limit}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     })

//     return NextResponse.json(await res.json(), { status: res.status })
// }

export async function POST(req: NextRequest) {
    const token = (await cookies()).get('_ssid')?.value
    if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}
    const body = await req.json()

    const res = await fetch(`${process.env.API_URL}/api/v1/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    return NextResponse.json(await res.json(), { status: res.status })
}

export async function PUT(req: NextRequest) {
    const token = (await cookies()).get('_ssid')?.value
    const body = await req.json()

    const res = await fetch(`${process.env.API_URL}/api/v1/posts`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    return NextResponse.json(await res.json(), { status: res.status })
}

export async function DELETE(req: NextRequest) {
    const token = (await cookies()).get('_ssid')?.value
    const id = req.nextUrl.searchParams.get('id')

    const res = await fetch(`${process.env.API_URL}/api/v1/posts?id=${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return NextResponse.json(await res.json(), { status: res.status })
}