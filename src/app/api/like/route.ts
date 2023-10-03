import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

// いいねAPI
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'POST') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { postId } = await req.json()

    if (!postId || typeof postId !== 'string') return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const { currentUser } = await serverAuth(req)

    const post = await prisma.post.findUnique({ where: { id: postId } })

    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 })

    const updateLikedIds = [...(post.likedIds || [])]

    updateLikedIds.push(currentUser.id)

    try {
      const post = await prisma.post.findUnique({ where: { id: postId } })

      if (post?.userId) {
        await prisma.notification.create({
          data: { body: `${currentUser.name} liked your tweet`, userId: post.userId },
        })
        await prisma.user.update({ where: { id: post.userId }, data: { hasNotification: true } })
      }
    } catch (err) {
      console.log(err)
    }

    const updatePost = await prisma.post.update({
      where: { id: post.id },
      data: { likedIds: updateLikedIds },
    })

    return NextResponse.json({ updatePost }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

// いいね解除API
export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'DELETE') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { postId } = await req.json()

    if (!postId || typeof postId !== 'string') return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const { currentUser } = await serverAuth(req)

    const post = await prisma.post.findUnique({ where: { id: postId } })

    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 })

    const updateLikedIds = [...(post.likedIds || [])]

    const filterUpdateLikedIds = updateLikedIds.filter((likedId) => likedId !== currentUser.id)

    const updatePost = await prisma.post.update({
      where: { id: post.id },
      data: { likedIds: filterUpdateLikedIds },
    })

    return NextResponse.json({ updatePost }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
