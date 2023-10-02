import type { PostModel } from '@/types/PostModel'

const useFetchPost = async (postId: string) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/posts/${postId}`, { cache: 'no-store' })

    if (!response.ok) throw new Error('Something went wrong')

    const res: PostModel = await response.json()
    console.log('🚀 ~ file: useFetchPost.ts:10 ~ useFetchPost ~ res:', res.user.id)

    return res
  } catch (err) {
    throw new Error('Something went wrong')
  }
}

export default useFetchPost
