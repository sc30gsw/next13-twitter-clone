'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'

import Avatar from '@/components/Avatar'
import useCurrentUser from '@/hooks/useCurrentUser'
import useLike from '@/hooks/useLike'
import useLoginModal from '@/hooks/useLoginModal'
import usePost from '@/hooks/usePost'
import type { PostModel } from '@/types/PostModel'

type PostItemProps = {
  userId?: string
  data: PostModel
}

const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const { data: currentUser } = useCurrentUser()
  const { hasLiked, toggleLike } = useLike(data.id, userId)

  const goToUser = useCallback(
    (e: React.MouseEvent<HTMLParagraphElement>) => {
      e.stopPropagation()

      router.push(`/users/${data.user.id}`)
    },
    [router, data],
  )

  const gotoPost = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      router.push(`/posts/${data.id}`)
    },
    [router, data],
  )

  const onLike = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) return loginModal.onOpen()

      toggleLike()
    },
    [currentUser, loginModal, toggleLike],
  )

  const createdAt = useMemo(() => {
    if (!data.createdAt) return null

    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data.createdAt])

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart

  return (
    <div
      onClick={gotoPost}
      className=" border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline">
              {data.user.name}
            </p>
            <span className="text-neutral-400 cursor-pointer hover:underline hidden md:block">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <LikeIcon size={20} color={hasLiked ? 'red' : ''} />
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
