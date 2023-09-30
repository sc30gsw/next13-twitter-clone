import type { CommentModel } from '@/types/CommentModel'
import type { UserModel } from '@/types/UserModel'

export type PostModel = {
  id: string
  body: string
  createdAt: string
  updatedAt: string
  likedIds: string[]
  image?: string
  user: UserModel
  comments: CommentModel[]
}
