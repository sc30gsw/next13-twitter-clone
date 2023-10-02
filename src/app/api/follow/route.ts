import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

// フォローAPI
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'POST') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { userId } = await req.json()

    if (!userId || typeof userId !== 'string') return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const { currentUser } = await serverAuth(req)

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    const updateFollowingIds = [...(user.followingIds || [])]

    updateFollowingIds.push(userId)

    const updateUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { followingIds: updateFollowingIds },
    })

    return NextResponse.json({ updateUser }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

// フォロー解除API
export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'DELETE') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { userId } = await req.json()

    if (!userId || typeof userId !== 'string') return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const { currentUser } = await serverAuth(req)

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    const updateFollowingIds = [...(user.followingIds || [])]

    const filterUpdateFollowingIds = updateFollowingIds.filter((followingId) => followingId !== userId)

    const updateUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { followingIds: filterUpdateFollowingIds },
    })

    return NextResponse.json({ updateUser }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
