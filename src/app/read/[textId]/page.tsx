import Reader from "@/components/Reader";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface TextPageProps {
  params: {
    textId: string;
  };
}

// TODO protect this route
export default async function TextPage({ params }: TextPageProps) {
  // TODO number vs string?
  const textId = params.textId;

  const text = await db.text.findUnique({
    where: {
      id: textId,
    },
  });

  if (!text) return notFound();

  console.log("text from page is", text);

  return text ? <Reader userText={text} /> : null;
}
