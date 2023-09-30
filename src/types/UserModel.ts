import type { CommentModel } from '@/types/CommentModel'
import type { PostModel } from '@/types/PostModel'

export type UserModel = {
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
  posts: PostModel[]
  comments: CommentModel[]
}

export type CurrentUser = UserModel & {
  message?: string
}
