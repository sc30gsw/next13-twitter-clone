import type { UserModel } from '@/types/UserModel'

export type PostModel = {
  id: string
  body: string
  createdAt: string
  updatedAt: string
  userId: string
  likedIds: string[]
  image?: string
  user: UserModel
}
