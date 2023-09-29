'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Input from '@/components/Input'
import Modal from '@/components/Modal'
import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import type { LoginForm } from '@/types/LoginInputForm'
import { schema } from '@/types/LoginInputForm'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const { mutate } = useCurrentUser()

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } })

  const onToggle = useCallback(() => {
    if (isSubmitting) return

    loginModal.onClose()
    registerModal.onOpen()
  }, [isSubmitting, loginModal, registerModal])

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      try {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
          callbackUrl: '/',
        })

        if (result?.error) {
          switch (result.error) {
            case 'Email does not exists':
              setError('email', {
                type: 'manual',
                message: 'Email does not exist.',
              })
              break

            case 'User does not exists':
              setError('password', {
                type: 'manual',
                message: 'User does not exists',
              })
              break

            case 'Incorrect password':
              setError('password', {
                type: 'manual',
                message: 'Incorrect password.',
              })
              break
          }
          return
        }

        mutate()
        loginModal.onClose()
        reset()
      } catch (err) {
        toast.error('Something went wrong')
      }
    },
    [loginModal, setError, mutate, reset],
  )

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input name="email" control={control} placeholder="Email" type="email" disabled={isSubmitting} />
      <Input name="password" control={control} placeholder="Password" type="password" disabled={isSubmitting} />
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
      type="submit"
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
