import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

// コメント投稿API
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'POST') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { currentUser } = await serverAuth(req)

    const { body } = await req.json()
    const postId = req.nextUrl.searchParams.get('postId')

    if (!postId || typeof postId !== 'string') return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    })

    return NextResponse.json({ comment }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
