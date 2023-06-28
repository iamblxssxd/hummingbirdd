"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";

const FormSchema = z.object({
  text: z
    .string()
    .min(10, {
      message: "Text must be at least 10 characters.",
    })
    .max(1000, {
      message: "Text must not be longer than 1000 characters.",
    }),
});

export function TextareaForm() {
  const router = useRouter();
  const [userText, setUserText] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setUserText(data.text);
    router.push(`/reader?text=${encodeURIComponent(data.text)}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Paste your text here"
                  className="resize-none"
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
        <Button variant="outline" type="submit">
          Submit
        </Button>
        {/* <Link
          href={{
            pathname: '/reader',
            query: {
              text: userText,
            },
          }}
          className={buttonVariants()}>
          Submit
        </Link> */}
      </form>
    </Form>
  );
}
