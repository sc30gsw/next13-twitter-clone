import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

// ログインユーザー取得API
export const PATCH = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'PATCH') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { currentUser } = await serverAuth(req)

    const { name, username, bio, profileImage, coverImage } = await req.json()

    if (!name || !username) return NextResponse.json({ message: 'Missing fields' }, { status: 400 })

    const existingUser = await prisma.user.findFirst({ where: { username, id: { not: currentUser.id } } })

    if (existingUser) return NextResponse.json({ message: 'Username is taken' }, { status: 422 })

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio: bio || '',
        profileImage: profileImage || '',
        coverImage: coverImage || '',
      },
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
