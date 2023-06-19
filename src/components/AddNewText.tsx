'use client'

import { Icons } from './Icons'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/Drawer'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Textarea } from './ui/Textarea'
import { useText } from '@/hooks/useText'
import { Input } from '@/components/ui/Input'

// TODO create an optional author/source field
const textFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters.',
    })
    .max(100, { message: 'Title must not be longer than 100 characters.' }),
  text: z
    .string()
    .min(10, {
      message: 'Text must be at least 10 characters.',
    })
    .max(1000, {
      message: 'Text must not be longer than 1000 characters.',
    }),
})

type TextFormValues = z.infer<typeof textFormSchema>

// This can come from the database or API.
const defaultValues: TextFormValues = {
  title: '',
  text: '',
}

export default function AddNewText() {
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
      <Drawer>
        <div className='flex w-full flex-col gap-4 lg:w-min'>
          <div>
            <h2 className='font-semibold text-lg leading-6 tracking-tight'>
              Read something new
            </h2>
            <p className='text-sm text-muted-foreground'>Could be any text.</p>
          </div>
          <DrawerTrigger asChild className=''>
            {/* TODO add animation on hover */}
            <div>
              <Button
                variant='outline'
                className='h-36 w-60 lg:h-40 flex border-[1px] rounded-md'>
                <div className='relative flex flex-1 flex-col items-center justify-center rounded-md p-5 focus-within:text-textBase hover:text-textBase hover:no-underline'>
                  <Icons.addText className='flex items-center justify-center rounded-full p-2 h-8 w-8' />
                  <span className='text-xl font-bold text-textBase ng-star-inserted'>
                    Add text
                  </span>
                </div>
              </Button>
            </div>
          </DrawerTrigger>
        </div>
        <DrawerContent>
          <div className='mx-auto w-full max-w-lg'>
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
                className='space-y-6 p-4 pb-0'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Title' {...field} />
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
                  name='text'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Paste your text here'
                          className='resize-none h-full'
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
                <Button type='submit' className='w-full'>
                  Submit
                </Button>
              </form>
            </Form>
            <DrawerFooter className='pt-2'>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}