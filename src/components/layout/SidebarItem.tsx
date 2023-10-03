'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { BsDot } from 'react-icons/bs'

import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'

type SidebarItemProps = {
  href?: string
  label: string
  icon: React.ReactElement
  auth?: boolean
  alert?: boolean
  onClick?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, icon, auth, alert, onClick }) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      if (onClick) return onClick()

      if (auth && (!currentUser || currentUser.message)) {
        loginModal.onOpen()
      } else if (href) {
        router.push(href)
      }
    },
    [onClick, auth, currentUser, href, loginModal, router],
  )

  return (
    <Link href={href || ''} className="flex flex-row items-center" onClick={handleClick}>
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        {React.cloneElement(icon, { size: 28, color: 'white' })}
        {alert && <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />}
      </div>
      <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        {React.cloneElement(icon, { size: 24, color: 'white' })}
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert && <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />}
      </div>
    </Link>
  )
}

export default SidebarItem
