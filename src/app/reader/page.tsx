import { FC } from 'react'
import Reader from '@/components/Reader'
import { getAuthSession } from '@/lib/auth'

interface PageProps {}

const page = async () => {
  // const session = await getAuthSession()

  return (
    <div>
      <Reader />
    </div>
  )
}

export default page
