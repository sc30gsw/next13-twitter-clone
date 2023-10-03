import React from 'react'

import CommentItem from '@/components/posts/CommentItem'
import type { CommentModel } from '@/types/CommentModel'

type CommentFeedProps = {
  comments: CommentModel[]
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  console.log('🚀 ~ file: CommentFeed.tsx:10 ~ comments:', comments)
  return (
    <div>
      {comments.map((comment: CommentModel) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </div>
  )
}

export default CommentFeed
