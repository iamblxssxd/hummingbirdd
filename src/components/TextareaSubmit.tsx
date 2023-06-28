"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { Button, buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateTextPayload } from "@/lib/validators/text";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useText } from "@/hooks/useText";
import { Input } from "./ui/Input";

interface TextareaSubmitProps {}

const TextareaSubmit = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const { updateText } = useText();

  // in larger projects:
  // const text = useText((state) => state.text)

  const router = useRouter();
  const { loginToast } = useCustomToast();

  const submitText = () => {
    updateText(text, title);
    router.push("/reader");
  };

  // const { mutate: createText, isLoading } = useMutation({
  //   mutationFn: async () => {
  //     const payload: CreateTextPayload = {
  //       text: input,
  //     }

  //     const { data } = await axios.post('/api/text', payload)
  //     return data as string
  //   },
  //   onError: (err) => {
  //     if (err instanceof AxiosError) {
  //       if (err.response?.status === 409) {
  //         return toast({
  //           title: 'Text has been already added.',
  //           description: 'Please add a differente text.',
  //           variant: 'destructive',
  //         })
  //       }

  //       if (err.response?.status === 422) {
  //         return toast({
  //           title: 'Invalid text length',
  //           description: 'Your text must have at least 3 characters',
  //           variant: 'destructive',
  //         })
  //       }

  //       if (err.response?.status === 401) {
  //         return loginToast()
  //       }
  //     }
  //     toast({
  //       title: 'An error occured',
  //       description: 'Could not save text.',
  //       variant: 'destructive',
  //     })
  //   },
  //   onSuccess: (data) => {
  //     router.push(`/reader`)
  //   },
  // })

  return (
    <div className="container flex flex-col  h-full max-w-3xl mx-auto space-y-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl font-irvin">
        Your text:
      </h1>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Paste your text here"
        className="resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-end space-x-2">
        <Button
          // isLoading={}
          className="h-8"
          disabled={text.length === 0}
          onClick={() => submitText()}
        >
          Submit Text
        </Button>
      </div>
    </div>
  );
};

export default TextareaSubmit;
