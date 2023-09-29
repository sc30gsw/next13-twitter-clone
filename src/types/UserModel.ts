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
}

export type CurrentUser = UserModel & {
  message?: string
}
