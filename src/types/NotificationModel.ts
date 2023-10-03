import type { UserModel } from '@/types/UserModel'

export type NotificationModel = {
  id: string
  body: string
  createdAt: string
  user: UserModel
}
