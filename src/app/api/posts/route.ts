import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

// ツイート投稿API
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'POST') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { currentUser } = await serverAuth(req)

    const { body } = await req.json()

    const post = await prisma.post.create({ data: { body, userId: currentUser.id } })

    return NextResponse.json({ post }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

// ツイートリスト取得API
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'GET') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const userId = req.nextUrl.searchParams.get('userId')

    let posts
    if (userId && typeof userId === 'string') {
      posts = await prisma.post.findMany({
        where: { userId },
        include: { user: true, comments: true },
        orderBy: { createdAt: 'desc' },
      })
    } else {
      posts = await prisma.post.findMany({ include: { user: true, comments: true }, orderBy: { createdAt: 'desc' } })
    }

    return NextResponse.json(posts, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
