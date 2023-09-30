import type { PostModel } from '@/types/PostModel'

const useFetchPosts = async (userId?: string) => {
  try {
    const url = userId
      ? `${process.env.API_BASE_URL}/api/posts?userId=${userId}`
      : `${process.env.API_BASE_URL}/api/posts`

    const response = await fetch(url, { cache: 'no-store' })

    if (!response.ok) throw new Error('Something went wrong')

    const posts: PostModel[] = await response.json()

    return posts
  } catch (err) {
    throw new Error('Something went wrong')
  }
}

export default useFetchPosts
