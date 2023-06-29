import { FC } from "react"

import { getAuthSession } from "@/lib/auth"
import Reader from "@/components/Reader"
import ReaderActions from "@/components/ReaderActions"

interface PageProps {}

const page = async () => {
  // const session = await getAuthSession()

  return (
    <div className="pt-12">
      <Reader />
    </div>
  )
}

export default page
