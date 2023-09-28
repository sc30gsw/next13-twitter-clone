'use client'

import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { BiArrowBack } from 'react-icons/bi'

type HeaderProps = {
  showBackArrow?: boolean
  label: string
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, label }) => {
  const router = useRouter()

  const handleBack = useCallback(() => router.back(), [router])

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            color="white"
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  )
}

export default Header
