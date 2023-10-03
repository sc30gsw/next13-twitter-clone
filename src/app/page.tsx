import { Suspense } from 'react'

import Form from '@/components/Form'
import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed'
import Spinner from '@/components/Spinner'

const Home = () => {
  return (
    <div>
      <Header label="Home" />
      <Suspense fallback={<Spinner />}>
        <Form placeholder="What's happening?" />
        <PostFeed />
      </Suspense>
    </div>
  )
}

export default Home
