'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import type { IconType } from 'react-icons'

type SidebarItemProps = {
  href?: string
  label: string
  icon: React.ReactElement
  onClick?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, icon, onClick }) => {
  const router = useRouter()

  return (
    <div className="flex flex-row items-center" onClick={onClick}>
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        {React.cloneElement(icon, { size: 28, color: 'white' })}
      </div>
      <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        {React.cloneElement(icon, { size: 24, color: 'white' })}
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  )
}

export default SidebarItem
