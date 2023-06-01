import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
// import { SubredditSubscriptionValidator } from '@/lib/validators/subreddit'
import { z } from 'zod'

const WordRemoveValidator = z.object({
  wordId: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { wordId } = WordRemoveValidator.parse(body)

    // check if user has already subscribed or not
    const existingWord = await db.word.findFirst({
      where: {
        id: wordId,
        userId: session.user.id,
      },
    })

    if (!existingWord) {
      return new Response('Word not found', { status: 404 })
    }

    await db.word.delete({
      where: {
        id: wordId,
      },
    })

    return new Response(wordId)
  } catch (error) {
    error
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not unsubscribe from subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}
