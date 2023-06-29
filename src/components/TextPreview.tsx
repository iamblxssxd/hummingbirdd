"use client"

import Link from "next/link"
import { type Text } from "@prisma/client"

import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/Icons"

interface TextPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  text: Text
}

function calculateReadTime(text: string) {
  const wordsPerMinute = 200 // Adjust this value as needed
  const words = text.trim().split(/\s+/)
  const wordCount = words.length
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute)

  return readTimeMinutes
}

export function TextPreview({ text }: TextPreviewProps) {
  const readTime = calculateReadTime(text.content)

  return (
    // TODO link to the text
    <div className="flex h-24 max-w-3xl items-center justify-between border-b-[1px] p-4">
      <div className="flex items-center space-x-4">
        <Link
          href={`/read/${text.id}`}
          aria-label="Open Text"
          className="focus:outline-focus block rounded-md ring-offset-1 transition-opacity hover:opacity-80 hover:transition-none"
        >
          <div className="grid h-12 w-12 shrink-0">
            {/* TODO random color */}
            {/* TODO image/cover for the text */}
            <div className="h-full w-full rounded-sm bg-lime-700"></div>
          </div>
        </Link>

        {/* TODO truncate text with dynamic width (flex hack?) */}
        <div className="w-[200px] md:w-[470px]">
          <Link
            aria-hidden
            href={`/read/${text.id}`}
            className="hover:underline"
          >
            <span className="flex-initial overflow-hidden truncate font-irvin">
              {text.title || "Untitled"}
            </span>
          </Link>
          <Link
            aria-hidden
            href={`/read/${text.id}`}
            className="flex-1 truncate hover:underline"
          >
            <p className="truncate ">{text.content}</p>
          </Link>
        </div>
      </div>
      {/* TODO grab the actual 'finished' field */}
      <div className="flex items-center space-x-2">
        {text.title === "Title" && <Icons.checkIcon className="h-4 w-4" />}
        <span className="hidden text-sm text-muted-foreground sm:inline">
          {readTime} {readTime > 1 ? "mins" : "min"} read
        </span>
        {/* TODO dropdown menu */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Icons.moreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
