'use client'

import React, { useCallback } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import Button from '@/components/Button'

type ModalProps = {
  type?: 'button' | 'submit' | 'reset'
  isOpen?: boolean
  title?: string
  actionLabel: string
  disabled?: boolean
  body?: React.ReactElement
  footer?: React.ReactElement
  onClose: () => void
  onSubmit: () => void
}

const Modal: React.FC<ModalProps> = ({
  type,
  isOpen,
  title,
  actionLabel,
  disabled,
  body,
  footer,
  onClose,
  onSubmit,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return

    onClose()
  }, [disabled, onClose])

  // クリックイベントがモーダル自体に伝播しないようにする
  const handleModalClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(), [])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (disabled) return

      onSubmit()
    },
    [disabled, onSubmit],
  )

  if (!isOpen) return null

  return (
    <div
      onClick={handleClose}
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70"
    >
      <div onClick={handleModalClick} className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
        <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
          <div className="flex items-center justify-between p-10 rounded-t">
            <h3 className="text-3xl font-semibold text-white">{title}</h3>
            <button className="p-1 ml-auto border-0 text-white hover:opacity-70 transition" onClick={handleClose}>
              <AiOutlineClose size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="relative p-10 flex-auto">{body}</div>
            <div className="flex flex-col gap-2 p-10">
              <Button type={type} disabled={disabled} label={actionLabel} secondary fullWidth large />
              {footer}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Modal
