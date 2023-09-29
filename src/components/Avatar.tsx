'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

import useUser from '@/hooks/useUser'

type AvatarProps = {
  userId: string
  isLarge?: boolean
  hasBoarder?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBoarder }) => {
  const { data: fetchedUser } = useUser(userId)
  const router = useRouter()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.stopPropagation()

      const url = `/users/${userId}`

      router.push(url)
    },
    [router, userId],
  )

  return (
    <div
      className={`${hasBoarder && 'border-4 border-black'} ${
        isLarge ? 'h-32 w-32' : 'h-12 w-12'
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        className="object-cover rounded-full"
        src={fetchedUser?.user.profileImage || '/images/placeholder.png'}
        alt="Avatar"
        onClick={onClick}
      />
    </div>
  )
}

export default Avatar
