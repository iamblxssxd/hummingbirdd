import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userWords = await db.word.findMany({
      where: {
        userId: session.user.id,
      },
    });

    console.log(userWords);
    return new Response(JSON.stringify(userWords));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
