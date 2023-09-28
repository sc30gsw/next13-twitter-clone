'use client'

import { signOut } from 'next-auth/react'
import React, { useCallback } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'

import SidebarItem from '@/components/layout/SidebarItem'
import SidebarLogo from '@/components/layout/SidebarLogo'
import SidebarTweetButton from '@/components/layout/SidebarTweetButton'
import useCurrentUser from '@/hooks/useCurrentUser'

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser()

  const items = [
    { label: 'Home', href: '/', icon: <BsHouseFill /> },
    { label: 'Notifications', href: '/notifications', icon: <BsBellFill />, auth: true },
    { label: 'Profile', href: '/users/123', icon: <FaUser />, auth: true },
  ]

  const logout = useCallback(() => signOut(), [])

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem key={item.href} href={item.href} label={item.label} icon={item.icon} auth={item.auth} />
          ))}
          {currentUser && !currentUser.message && <SidebarItem onClick={logout} icon={<BiLogOut />} label="Logout" />}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
