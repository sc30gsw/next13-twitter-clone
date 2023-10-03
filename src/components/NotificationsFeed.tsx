import { getServerSession } from 'next-auth'
import React from 'react'
import { BsTwitter } from 'react-icons/bs'

import useFetchNotifications from '@/hooks/useFetchNotifications'
import options from '@/libs/options'
import type { NotificationModel } from '@/types/NotificationModel'

const NotificationsFeed = async () => {
  const session = await getServerSession(options)

  const fetchNotifications = await useFetchNotifications(session?.user?.id)

  if (fetchNotifications.length === 0)
    return <div className="text-neutral-600 text-center p-6 text-xl">No notifications</div>

  return (
    <div className="flex flex-col">
      {fetchNotifications.map((notification: NotificationModel) => (
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-neutral-800">
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  )
}

export default NotificationsFeed
