import Balancer from "react-wrap-balancer"

import { getAuthSession } from "@/lib/auth"
import FeaturedTexts from "@/components/FeaturedTexts"
import Reader from "@/components/Reader"
import TextareaSubmit from "@/components/TextareaSubmit"
import WordTooltip from "@/components/WordTooltip"

export default async function Home() {
  const session = await getAuthSession()

  return (
    <>
      {session?.user ? (
        <div className="mx-auto flex max-w-5xl flex-col justify-start pt-12">
          <div className="mb-8 flex flex-wrap gap-8">
            <FeaturedTexts />
          </div>
          {/* <Reader /> */}
          {/* <TextareaSubmit /> */}
        </div>
      ) : (
        <div className="container mx-auto max-w-4xl pt-12">
          <h1 className="scroll-m-20 font-irvin text-4xl font-extrabold lg:text-5xl">
            <Balancer>Read any article with confidence</Balancer>
          </h1>
          <p className=" font-acaslonpro text-2xl tracking-normal [&:not(:first-child)]:mt-6">
            <Balancer>
              In a world where information{" "}
              <WordTooltip
                word="overload"
                definition="to give too much work to"
              />{" "}
              is a constant challenge, Hummingbird with its word definition
              feature emerges as a game-changer in enhancing the reading
              experience. By{" "}
              <WordTooltip
                word="broadening"
                definition=" an increase in size"
              />{" "}
              vocabulary, improving comprehension, saving time and effort,
              supporting language learners, and encouraging active reading,
              Hummingbird revolutionizes the way we consume written content.
            </Balancer>
          </p>
        </div>
      )}
    </>
  )
}
