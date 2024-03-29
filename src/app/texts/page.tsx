import { notFound } from "next/navigation"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import UserSavedTexts from "@/components/UserSavedTexts"

// TODO create a custom feed and general feed (logged in vs not logged in)
export default async function page() {
  const session = await getAuthSession()

  if (!session?.user) return notFound()

  const texts = await db.text.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      dateAdded: "desc",
    },
  })

  // TODO add pagination to the feed
  return (
    <div className="mx-auto max-w-3xl pt-12">
      {/* TODO if no texts show a message */}
      <UserSavedTexts texts={texts} />
    </div>
  )
}
