import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

const FavoriteValidator = z.object({
  wordId: z.string(),
})

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { wordId } = FavoriteValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Find the word by ID and associated user
    const word = await db.word.findFirst({
      where: {
        id: wordId,
        userId: session.user.id,
      },
    })

    if (!word) {
      return new Response("Word not found", { status: 404 })
    }

    // Update the favorite property of the word and save changes to the database
    const updatedWord = await db.word.update({
      where: { id: word.id },
      data: { favorite: !word.favorite },
    })

    return new Response("OK")
  } catch (error) {
    // console.error('An error occurred:', error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response(
      "Could not add word to favorites, please try again later! :)",
      { status: 500 }
    )
  }
}
