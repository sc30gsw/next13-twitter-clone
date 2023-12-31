'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import type { PostOrCommentInputForm } from '@/types/PostOrCommentInputForm'
import { schema } from '@/types/PostOrCommentInputForm'

type FormProps = {
  placeholder: string
  isComment?: boolean
  postId?: string
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const { data: currentUser } = useCurrentUser()

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostOrCommentInputForm>({ resolver: zodResolver(schema), defaultValues: { body: '' } })

  const body = watch('body')

  const onSubmit = useCallback(
    async (data: PostOrCommentInputForm) => {
      try {
        const url = isComment ? `/api/comments/?postId=${postId}` : '/api/posts'
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ body: data.body }),
        })

        toast.success(isComment ? 'Comment Created' : 'Tweet Created')

        reset()
        router.refresh()
      } catch (err) {
        toast.error('Something went wrong')
      }
    },
    [isComment, postId, reset, router],
  )

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser && !currentUser.message ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser.id} />
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register('body')}
              disabled={isSubmitting}
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            {errors.body && <span className="text-red-500">{errors.body.message}</span>}
            <div className="mt-4 flex flex-row justify-end">
              <Button type="submit" label="Tweet" disabled={isSubmitting || !body} />
            </div>
          </form>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to Twitter</h1>
          <div className="flex flex-row justify-center items-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  )
}

export default Form
