import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const TextValidator = z.object({
  text: z.string(),
  title: z.string(),
  wordDefinitions: z.array(
    z.object({
      word: z.string(),
      definition: z.string(),
      shortDefinition: z.string(),
      favorite: z.boolean(),
    })
  ),
})

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { text, title, wordDefinitions } = TextValidator.parse(body)

    const textExists = await db.text.findFirst({
      where: {
        content: text,
        userId: session.user.id,
      },
    })

    // TODO redirect user to the text
    if (textExists) {
      return new Response('This text has already been saved', { status: 409 })
    }

    // Check for existing words and create or associate them
    const existingWords = await Promise.all(
      wordDefinitions.map(async (wordDef) => {
        let existingWord = await db.word.findFirst({
          where: {
            word: wordDef.word,
            userId: session.user.id,
          },
        })

        if (!existingWord) {
          // Create a new Word if it doesn't exist
          existingWord = await db.word.create({
            data: {
              word: wordDef.word,
              definition: wordDef.definition,
              shortDefinition: wordDef.shortDefinition,
              favorite: wordDef.favorite,
              user: { connect: { id: session.user.id } },
            },
          })
        }

        return existingWord
      })
    )

    // Create new Text with associated Word definitions
    const newText = await db.text.create({
      data: {
        title: title,
        content: text,
        user: { connect: { id: session.user.id } },
        wordDefinitions: {
          connect: existingWords.map((word) => ({ id: word.id })),
        },
      },
      include: {
        wordDefinitions: true,
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
