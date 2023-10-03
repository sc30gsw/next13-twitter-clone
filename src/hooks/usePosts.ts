import useSWR from 'swr'

import fetcher from '@/libs/fetcher'
import type { PostModel } from '@/types/PostModel'

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : '/api/posts'
  const { data, error, isLoading, mutate } = useSWR<PostModel[]>(url, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default usePosts
