import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { type Row } from "@tanstack/react-table"
import axios from "axios"

import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Icons } from "@/components/Icons"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Separator } from "./ui/Separator"
import { Switch } from "./ui/Switch"

type Word = {
  id: string
  word: string
  definition: string
  favorite: boolean
}

interface WordsTableRowActionsProps {
  row: Row<Word>
}

export function WordsTableRowActions({ row }: WordsTableRowActionsProps) {
  const [word, setWord] = useState(row.original.word)
  const [definition, setDefinition] = useState(row.original.definition)
  const [favorite, setFavorite] = useState(row.original.favorite)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const router = useRouter()
  const { toast } = useToast()

  // TODO error handling
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async (wordId: string) => {
      const payload = {
        wordId,
      }

      await axios.patch("/api/word/favorite", payload)

      // TODO optimistic updates
      router.refresh()
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Favorite was toggled!",
        variant: "default",
      })
    },
  })

  const { mutate: updateWord } = useMutation({
    mutationFn: async (wordId: string) => {
      const payload = {
        wordId,
        word,
        definition,
        favorite,
      }

      setIsDialogOpen(false)
      await axios.patch("/api/word/update", payload)

      router.refresh()
      // TODO optimistic updates
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Word has been updated!",
        variant: "default",
      })
    },
  })

  const { mutate: deleteWord } = useMutation({
    mutationFn: async (wordId: string) => {
      const payload = {
        wordId,
      }

      setIsDialogOpen(false)
      await axios.post("/api/word/delete", payload)

      router.refresh()
      // TODO optimistic updates
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Word has been deleted!",
        variant: "default",
      })
    },
  })

  console.log(isDialogOpen)
  return (
    // TODO extract to DropdownWidhDialogItems
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Icons.moreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DialogTrigger className="w-full">
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DialogTrigger>
            {/* TODO onClick handlers for edit and delete */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toggleFavorite(row.original.id)}>
              Favorite
            </DropdownMenuItem>
            <AlertDialogTrigger className="w-full">
              <DropdownMenuItem>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Word</DialogTitle>
            <DialogDescription>
              Make changes to the saved word here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="word" className="text-right">
                Word
              </Label>
              <Input
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="definition" className="text-right">
                Definition
              </Label>
              <Input
                id="definition"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                className="col-span-3"
              />
            </div>

            <Separator className="w-auto" />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="favorite" className="text-right">
                Favorite
              </Label>
              <Switch
                className="col-span-1"
                checked={favorite}
                onCheckedChange={() => setFavorite((prev) => !prev)}
              />
              <p className="col-span-2 text-right text-sm text-muted-foreground">
                Favorite can be toggled later.
              </p>
            </div>
          </div>
          <DialogFooter>
            {/* TODO handleSubmit */}
            <Button onClick={() => updateWord(row.original.id)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              word(s).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteWord(row.original.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  )
}
