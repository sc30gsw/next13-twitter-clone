'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Input from '@/components/Input'
import Modal from '@/components/Modal'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { type RegisterForm, schema } from '@/types/RegisterInputForm'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(schema) })

  const onToggle = useCallback(() => {
    if (isSubmitting) return

    registerModal.onClose()
    loginModal.onOpen()
  }, [isSubmitting, loginModal, registerModal])

  const onSubmit = useCallback(
    async (data: RegisterForm) => {
      try {
        // TODO ADD SIGN UP

        registerModal.onClose()
      } catch (err) {
        toast.error('Something went wrong')
      }
    },
    [registerModal],
  )

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input {...register('email')} placeholder="Email" disabled={isSubmitting} error={errors.email?.message} />
      <Input {...register('name')} placeholder="Name" disabled={isSubmitting} error={errors.name?.message} />
      <Input
        {...register('username')}
        placeholder="Username"
        disabled={isSubmitting}
        error={errors.username?.message}
      />
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
        Already have an account?
        <span onClick={onToggle} className="text-white cursor-pointer hover:underline ml-2">
          Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isSubmitting}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
