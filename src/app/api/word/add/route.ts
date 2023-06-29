import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { WordValidator } from "@/lib/validators/word"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { word, definition, shortDefinition, favorite } =
      WordValidator.parse(body)

    // if word exists...
    const wordExists = await db.word.findFirst({
      where: {
        word: word,
        userId: session.user.id,
      },
    })

    if (wordExists) {
      return new Response("This word has already been saved", { status: 409 })
    }

    const newWord = await db.word.create({
      data: {
        word: word,
        userId: session.user.id,
        definition: definition,
        shortDefinition: shortDefinition,
        favorite: favorite,
      },
    })

    return new Response(newWord.word)
  } catch (error) {
    console.error("An error occurred:", error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
  }
}
