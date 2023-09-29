import useSWR from 'swr'

import fetcher from '@/libs/fetcher'
import type { CurrentUser } from '@/types/UserModel'

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<CurrentUser>('/api/current', fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useCurrentUser
