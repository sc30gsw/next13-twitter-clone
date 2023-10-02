import type { CommentModel } from '@/types/CommentModel'

type PostUser = {
  id: string
  name: string
  username: string
  bio?: string
  email: string
  image?: string
  coverImage?: string
  profileImage?: string
  createdAt: string
  updatedAt: string
  followingIds: string[]
}

export type PostModel = {
  id: string
  body: string
  createdAt: string
  updatedAt: string
  likedIds: string[]
  image?: string
  user: PostUser
  comments: CommentModel[]
}
