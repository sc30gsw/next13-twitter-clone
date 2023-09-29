import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

// ユーザー情報・フォロワー数取得API
export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    if (req.method !== 'GET') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const userId = params.userId

    if (!userId || typeof userId !== 'string') return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    // userIdをフォローしているユーザー（自分をフォローしているユーザー（フォロワー））の件数を取得
    const followersCount = await prisma.user.count({ where: { followingIds: { has: userId } } })

    return NextResponse.json({ user, followersCount }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
