// 'use client'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import React from 'react'

import Header from '@/components/Header'
import NotificationsFeed from '@/components/NotificationsFeed'
import options from '@/libs/options'

const NotificationsPage = async () => {
  const session = await getServerSession(options)

  if (!session) return redirect('/')

  return (
    <div>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </div>
  )
}

export default NotificationsPage
