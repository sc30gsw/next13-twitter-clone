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

    try {
      const post = await prisma.post.findUnique({ where: { id: postId } })

      if (post?.userId) {
        await prisma.notification.create({
          data: { body: `${currentUser.name} replied to your tweet`, userId: post.userId },
        })
        await prisma.user.update({ where: { id: post.userId }, data: { hasNotification: true } })
      }
    } catch (err) {
      console.log(err)
    }

    return NextResponse.json({ comment }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
