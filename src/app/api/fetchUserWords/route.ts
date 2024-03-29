import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const userWords = await db.word.findMany({
      where: {
        userId: session.user.id,
      },
    })

    return new Response(JSON.stringify(userWords))
  } catch (error) {
    return new Response("Internal server error", { status: 500 })
  }
}
