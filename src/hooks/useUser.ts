import useSWR from 'swr'

import fetcher from '@/libs/fetcher'
import type { UserModel } from '@/types/UserModel'

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<{ user: UserModel; followersCount: number }>(
    userId ? `/api/users/${userId}` : null,
    fetcher,
  )

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useUser
