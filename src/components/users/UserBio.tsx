'use client'

import { format } from 'date-fns'
import React, { useMemo } from 'react'
import { BiCalendar } from 'react-icons/bi'

import useCurrentUser from '@/hooks/useCurrentUser'
import useEditModal from '@/hooks/useEditModal'
import useUser from '@/hooks/useUser'

type UserBioProps = {
  userId: string
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser()
  const { data: fetchedUser } = useUser(userId)

  const editModal = useEditModal()

  const createdAt = useMemo(() => {
    if (!fetchedUser?.user.createdAt) return null

    return format(new Date(fetchedUser.user.createdAt), 'MMMM yyyy')
  }, [fetchedUser?.user.createdAt])

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <button
            onClick={() => editModal.onOpen()}
            className="disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border text-black w-fit bg-white border-black text-md px-4 py-2"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => editModal.onOpen()}
            className="disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border text-black w-fit bg-white border-black text-md px-4 py-2"
          >
            Follow
          </button>
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{fetchedUser?.user.name}</p>
          <p className="text-md text-neutral-500">@{fetchedUser?.user.username}</p>
        </div>
      </div>
      <div className="flex flex-col mt-4 pl-1">
        <p className="text-white">{fetchedUser?.user.bio}</p>
        <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
          <BiCalendar size={24} />
          <p>Joined {createdAt}</p>
        </div>
      </div>
      <div className="flex flex-row items-center mt-4 gap-6 pl-2">
        <div className="flex flex-row items-center gap-1">
          <p className="text-white">{fetchedUser?.user.followingIds.length || 0}</p>
          <p className="text-neutral-500">Following</p>
        </div>
        <div className="flex flex-row items-center gap-1">
          <p className="text-white">{fetchedUser?.followersCount || 0}</p>
          <p className="text-neutral-500">Followers</p>
        </div>
      </div>
    </div>
  )
}

export default UserBio
