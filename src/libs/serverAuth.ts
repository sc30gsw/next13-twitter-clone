import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import options from '@/libs/options'
import prisma from '@/libs/prismadb'

const serverAuth = async (req: NextRequest) => {
  const session = await getServerSession(options)

  if (!session) throw new Error('Not signed in')
  console.log('OK')

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  })

  if (!currentUser) throw new Error('Not signed in')
  console.log('OK SIGE')

  return { currentUser }
}

export default serverAuth
