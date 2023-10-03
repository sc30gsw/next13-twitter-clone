import type { NotificationModel } from '@/types/NotificationModel'
import type { PostModel } from '@/types/PostModel'

const useFetchNotifications = async (userId?: string) => {
  try {
    const url = userId ? `${process.env.API_BASE_URL}/api/notifications/${userId}` : ''

    const response = await fetch(url, { cache: 'no-store' })

    if (!response.ok) throw new Error('Something went wrong')

    const notifications: NotificationModel[] = await response.json()

    return notifications
  } catch (err) {
    throw new Error('Something went wrong')
  }
}

export default useFetchNotifications
