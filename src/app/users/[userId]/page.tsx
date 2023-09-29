import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import React from 'react'

import Header from '@/components/Header'
import UserBio from '@/components/users/UserBio'
import UserHero from '@/components/users/UserHero'
import useFetchUser from '@/hooks/useFetchUser'
import options from '@/libs/options'
import type { UserModel } from '@/types/UserModel'

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/api/users`)
  const users = await res.json()

  return users.map((user: UserModel) => ({
    userId: user.id,
  }))
}

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const session = await getServerSession(options)
  if (!session) redirect('/')

  const fetchedUser = await useFetchUser(params.userId)

  return (
    <div>
      <Header showBackArrow label={fetchedUser.user.username} />
      <UserHero userId={fetchedUser.user.id} />
      <UserBio userId={fetchedUser.user.id} />
    </div>
  )
}

export default UserPage
