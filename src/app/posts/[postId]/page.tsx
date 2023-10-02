import React from 'react'

import Form from '@/components/Form'
import Header from '@/components/Header'
import PostItem from '@/components/posts/PostItem'
import useFetchPost from '@/hooks/useFetchPost'
import type { PostModel } from '@/types/PostModel'

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/api/posts`)
  const posts: PostModel[] = await res.json()

  return posts.map((post: PostModel) => ({
    postId: post.id,
  }))
}

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const post = await useFetchPost(params.postId)

  return (
    <div>
      <Header label="Tweet" showBackArrow />
      <PostItem data={post} />
      <Form postId={post.id} isComment placeholder="Tweet your reply" />
    </div>
  )
}

export default PostPage
