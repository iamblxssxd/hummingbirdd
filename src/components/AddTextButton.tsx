"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useText } from "@/hooks/useText"
import { Button } from "@/components/ui/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Spotlight, SpotlightCard } from "@/components/ui/Spotlight"
import { Textarea } from "@/components//ui/Textarea"
import { Icons } from "@/components/Icons"

// TODO create an optional author/source field
const textFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .max(100, {
      message: "Title must not be longer than 100 characters.",
    }),
  text: z
    .string()
    .min(10, {
      message: "Text must be at least 10 characters.",
    })
    .max(1000, {
      message: "Text must not be longer than 1000 characters.",
    }),
})

type TextFormValues = z.infer<typeof textFormSchema>

// This can come from the database or API.
const defaultValues: TextFormValues = {
  title: "",
  text: "",
}

const MemoizedTextarea = React.memo(Textarea)

export default function AddTextButton() {
  const { updateText } = useText()
  const router = useRouter()

  const form = useForm<TextFormValues>({
    resolver: zodResolver(textFormSchema),
    defaultValues,
  })

  function onSubmit(data: TextFormValues) {
    updateText(data.text, data.title)
    // TODO Generate a random ID for the text
    // router.push(`/reader?text=${encodeURIComponent(data.text)}`)
    router.push(`/reader`)
  }

  return (
    <>
      <Drawer preventScrollRestoration={true}>
        <div className="flex w-full flex-col gap-4 lg:w-min">
          <div>
            <h2 className="text-lg font-semibold leading-6 tracking-tight">
              Read something new
            </h2>
            <p className="text-sm text-muted-foreground">Could be any text.</p>
          </div>
          <DrawerTrigger>
            <Spotlight className="group flex w-full lg:h-full">
              <SpotlightCard>
                <div className="relative z-10 flex h-36 w-60 overflow-hidden rounded-[inherit] bg-background lg:h-40">
                  {/* Radial gradient */}
                  <div
                    className="pointer-events-none absolute bottom-0 left-1/2 -z-10 aspect-square w-1/2 -translate-x-1/2 translate-y-1/2"
                    aria-hidden="true"
                  >
                    <div className="bg-gradient-conic-tr-tl absolute inset-0 translate-x-0 rounded-full blur-[80px]"></div>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 z-40 flex h-36 w-full -translate-x-1/2 -translate-y-1/2 border-none bg-transparent hover:bg-transparent lg:h-40">
                  <div className="flex flex-1 flex-col items-center justify-center rounded-md p-5 hover:no-underline">
                    <Icons.addText className="flex h-8 w-8 items-center justify-center rounded-full p-2" />
                    <span className="text-xl font-bold">Add text</span>
                  </div>
                </div>
              </SpotlightCard>
            </Spotlight>
          </DrawerTrigger>
        </div>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <DrawerTitle>Your Text</DrawerTitle>
              <DrawerDescription>
                Paste any interesting article or text
              </DrawerDescription>
            </DrawerHeader>

            {/* TODO create a separate component for the form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-4 pb-0"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Title of the text you are adding
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <MemoizedTextarea
                          placeholder="Paste your text here"
                          className="h-full resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can paste snippets from articles, books, and other
                        resources!
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
