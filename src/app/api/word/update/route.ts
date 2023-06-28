import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const WordUpdateValidator = z.object({
  wordId: z.string(),
  word: z.string(),
  definition: z.string(),
  favorite: z.boolean(),
});

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unathorized", { status: 401 });
    }

    const body = await req.json();

    const { word, definition, favorite, wordId } =
      WordUpdateValidator.parse(body);

    const existingWord = await db.word.findFirst({
      where: {
        id: wordId,
        userId: session.user.id,
      },
    });

    if (!existingWord) {
      return new Response("Word not found", { status: 404 });
    }

    const updatedWord = await db.word.update({
      where: { id: wordId },
      data: {
        word: word,
        definition: definition,
        favorite: favorite,
      },
    });

    return new Response("OK");
  } catch (error) {
    // console.error('An error occurred:', error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not update word, please try again later! :)", {
      status: 500,
    });
  }
}
