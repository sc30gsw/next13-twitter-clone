import bcrypt from 'bcrypt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

// ユーザー新規登録API
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'POST') return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { email, username, name, password } = await req.json()

    const existingEmail = await prisma.user.findUnique({ where: { email } })

    if (existingEmail) return NextResponse.json({ message: 'Email is taken' }, { status: 422 })

    const existingUsername = await prisma.user.findUnique({ where: { username } })

    if (existingUsername) return NextResponse.json({ message: 'Username is taken' }, { status: 422 })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
