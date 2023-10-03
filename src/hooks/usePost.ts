import useSWR from 'swr'

import fetcher from '@/libs/fetcher'
import type { PostModel } from '@/types/PostModel'

const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR<PostModel>(postId ? `/api/posts/${postId}` : null, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default usePost
