'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Input from '@/components/Input'
import Modal from '@/components/Modal'
import useCurrentUser from '@/hooks/useCurrentUser'
import useEditModal from '@/hooks/useEditModal'
import useUser from '@/hooks/useUser'
import type { EditProfileForm } from '@/types/EditProfileInputForm'
import { schema } from '@/types/EditProfileInputForm'

const EditModal = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id as string)
  const editModal = useEditModal()

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      bio: '',
    },
  })

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name,
        username: currentUser.username,
        bio: currentUser.bio,
      })
    }
  }, [currentUser, reset])

  const onSubmit = useCallback(
    async (data: EditProfileForm) => {
      try {
        const response = await fetch('/api/current/edit', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            username: data.username,
            bio: data.bio,
            profileImage: data.profileImage,
            coverImage: data.coverImage,
          }),
        })

        if (!response.ok) {
          const error = await response.json()

          switch (error.message) {
            case 'Missing fields':
              setError('name', {
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

        toast.success('Updated Account')
        mutateFetchedUser()
        mutateCurrentUser()
        editModal.onClose()
        reset()
      } catch (err) {
        toast.error('Something went wrong')
      }
    },
    [mutateFetchedUser, mutateCurrentUser, editModal, reset, setError],
  )

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input name="name" control={control} placeholder="Name" disabled={isSubmitting} />
      <Input name="username" control={control} placeholder="Username" disabled={isSubmitting} />
      <Input name="bio" control={control} placeholder="Bio" disabled={isSubmitting} />
    </div>
  )

  return (
    <Modal
      type="submit"
      disabled={isSubmitting}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  )
}

export default EditModal
