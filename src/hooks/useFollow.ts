import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import useUser from '@/hooks/useUser'

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
  const { mutate: mutateFetchUser } = useUser(userId)

  const loginModal = useLoginModal()

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || []

    return list.includes(userId)
  }, [currentUser?.followingIds, userId])

  const toggleFollow = useCallback(async () => {
    if (!currentUser || currentUser.message) return loginModal.onOpen()

    try {
      if (isFollowing) {
        await fetch('/api/follow', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        })

        toast.success('UnFollow successful')
      } else {
        await fetch('/api/follow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        })

        toast.success('Following successful')
      }

      mutateCurrentUser()
      mutateFetchUser()
    } catch (err) {
      toast.error('Something went wrong')
    }
  }, [currentUser, isFollowing, loginModal, mutateCurrentUser, mutateFetchUser, userId])

  return {
    isFollowing,
    toggleFollow,
  }
}

export default useFollow
