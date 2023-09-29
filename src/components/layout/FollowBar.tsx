'use client'

import React from 'react'

import Avatar from '@/components/Avatar'
import useCurrentUser from '@/hooks/useCurrentUser'
import useUsers from '@/hooks/useUsers'
import type { UserModel } from '@/types/UserModel'

const FollowBar = () => {
  const { data: users = [] } = useUsers()
  const { data: currentUser } = useCurrentUser()

  if (users.length === 0) return null

  const filteredUsers =
    currentUser && !currentUser.message ? users.filter((user: UserModel) => user.id !== currentUser.id) : users

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {filteredUsers.map((user: UserModel) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FollowBar
