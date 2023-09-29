import useSWR from 'swr'

import fetcher from '@/libs/fetcher'
import type { UserModel } from '@/types/UserModel'

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<UserModel[]>('/api/users', fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useUsers
