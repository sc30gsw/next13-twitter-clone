import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

// ツイート詳細取得API
export const GET = async (req: NextRequest, { params }: { params: { postId: string } }) => {
  try {
    if (req.method !== 'GET') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const postId = params.postId

    if (!postId || typeof postId !== 'string') return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true, comments: { include: { user: true }, orderBy: { createdAt: 'desc' } } },
    })

    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 })

    return NextResponse.json(post, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
