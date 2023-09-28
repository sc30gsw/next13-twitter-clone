'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Input from '@/components/Input'
import Modal from '@/components/Modal'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import type { LoginForm } from '@/types/LoginInputForm'
import { schema } from '@/types/LoginInputForm'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) })

  const onToggle = useCallback(() => {
    if (isSubmitting) return

    loginModal.onClose()
    registerModal.onOpen()
  }, [isSubmitting, loginModal, registerModal])

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      try {
        // TODO ADD LOG IN

        loginModal.onClose()
      } catch (err) {
        toast.error('Something went wrong')
      }
    },
    [loginModal],
  )

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input {...register('email')} placeholder="Email" disabled={isSubmitting} error={errors.email?.message} />
      <Input
        {...register('password')}
        placeholder="Password"
        disabled={isSubmitting}
        error={errors.password?.message}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter?
        <span onClick={onToggle} className="text-white cursor-pointer hover:underline ml-2">
          Create an account
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isSubmitting}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
