import type { UserModel } from '@/types/UserModel'

const useFetchUser = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/users/${userId}`)

    if (!response.ok) throw new Error('Something went wrong')

    const res: { user: UserModel; followersCount: number } = await response.json()

    return res
  } catch (err) {
    throw new Error('Something went wrong')
  }
}

export default useFetchUser
