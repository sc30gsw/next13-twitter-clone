import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import usePost from '@/hooks/usePost'
import usePosts from '@/hooks/usePosts'

const useLike = (postId: string, userId?: string) => {
  const { data: currentUser } = useCurrentUser()
  const { data: fetchPost, mutate: mutateFetchPost } = usePost(postId)
  const { mutate: mutateFetchPosts } = usePosts(userId)
  const router = useRouter()

  const loginModal = useLoginModal()

  const hasLiked = useMemo(() => {
    const list = fetchPost?.likedIds || []

    return list.includes(currentUser?.id as string)
  }, [currentUser?.id, fetchPost?.likedIds])

  const toggleLike = useCallback(async () => {
    if (!currentUser || currentUser.message) return loginModal.onOpen()

    try {
      if (hasLiked) {
        await fetch('/api/like', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId }),
        })

        toast.success('UnLike successful')
      } else {
        await fetch('/api/like', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId }),
        })
        toast.success('Like successful')
      }

      mutateFetchPost()
      mutateFetchPosts()
      router.refresh()
    } catch (err) {
      toast.error('Something went wrong')
    }
  }, [currentUser, hasLiked, loginModal, mutateFetchPost, mutateFetchPosts, postId, router])

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike
