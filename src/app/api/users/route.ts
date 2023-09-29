import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

// ユーザー一覧取得API
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'GET') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })

    return NextResponse.json(users, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
