import React from 'react'

import PostItem from '@/components/posts/PostItem'
import useFetchPosts from '@/hooks/useFetchPosts'
import type { PostModel } from '@/types/PostModel'

type PostFeedProps = {
  userId?: string
}

const PostFeed: React.FC<PostFeedProps> = async ({ userId }) => {
  const posts = await useFetchPosts(userId)

  return (
    <div>
      {posts.map((post: PostModel) => (
        <PostItem key={post.id} userId={userId} data={post} />
      ))}
    </div>
  )
}

export default PostFeed
