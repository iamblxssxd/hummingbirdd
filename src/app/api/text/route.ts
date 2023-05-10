import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { TextValidator } from '@/lib/validators/text'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { text } = TextValidator.parse(body)

    // if text exists on the currently logged in user
    const textExists = await db.user.findFirst({
      where: {
        id: session.user.id,
        texts: {
          some: {
            content: {
              equals: text,
            },
          },
        },
      },
    })

    if (textExists) {
      return new Response('This text has already been saved', { status: 409 })
    }
    // TODO redirect user to the text

    const newText = await db.text.create({
      data: {
        content: text,
        userId: session.user.id,
      },
    })

    return new Response(newText.content)
  } catch (error) {
    console.error('An error occured:', error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not save text', { status: 500 })
  }
}
