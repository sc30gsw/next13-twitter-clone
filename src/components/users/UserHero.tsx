'use client'

import Image from 'next/image'
import React from 'react'

import Avatar from '@/components/Avatar'
import useUser from '@/hooks/useUser'

type UserHeroProps = {
  userId: string
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId)

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.user.coverImage && (
          <Image src={fetchedUser.user.coverImage} fill alt="Cover Image" className="object-cover" />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBoarder />
        </div>
      </div>
    </div>
  )
}

export default UserHero
