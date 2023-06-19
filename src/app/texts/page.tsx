import UserSavedTexts from '@/components/UserSavedTexts'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

import { notFound } from 'next/navigation'

// TODO create a custom feed and general feed (logged in vs not logged in)
export default async function page() {
  const session = await getAuthSession()

  if (!session?.user) return notFound()

  const texts = await await db.text.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      dateAdded: 'desc',
    },
  })

  // TODO add pagination to the feed
  return (
    <div>
      <UserSavedTexts texts={texts} />
    </div>
  )
}