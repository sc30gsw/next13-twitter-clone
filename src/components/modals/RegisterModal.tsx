'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Input from '@/components/Input'
import Modal from '@/components/Modal'
import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { type RegisterForm, schema } from '@/types/RegisterInputForm'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const { mutate } = useCurrentUser()

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      username: '',
      password: '',
    },
  })

  const onToggle = useCallback(() => {
    if (isSubmitting) return

    registerModal.onClose()
    loginModal.onOpen()
  }, [isSubmitting, loginModal, registerModal])

  const onSubmit = useCallback(
    async (data: RegisterForm) => {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            username: data.username,
            name: data.name,
            password: data.password,
          }),
        })

        if (!response.ok) {
          const error = await response.json()

          switch (error.message) {
            case 'Email is taken':
              setError('email', {
                type: 'manual',
                message: error.message,
              })
              break

            case 'Username is taken':
              setError('username', {
                type: 'manual',
                message: error.message,
              })
              break
          }
          return
        }

        toast.success('Account created.')

        await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
          callbackUrl: '/',
        })

        mutate()
        registerModal.onClose()
        reset()
      } catch (err) {
        toast.error('Something went wrong')
      }
    },
    [mutate, registerModal, reset, setError],
  )

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input name="email" control={control} placeholder="Email" type="email" disabled={isSubmitting} />
      <Input name="name" control={control} placeholder="Name" disabled={isSubmitting} />
      <Input name="username" control={control} placeholder="Username" disabled={isSubmitting} />
      <Input name="password" control={control} placeholder="Password" type="password" disabled={isSubmitting} />
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
      type="submit"
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
