import type { PostModel } from '@/types/PostModel'
import type { UserModel } from '@/types/UserModel'

export type CommentModel = {
  id: string
  body: string
  createdAt: string
  updatedAt: string
  user: UserModel
  post: PostModel
}
