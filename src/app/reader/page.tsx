import { FC } from 'react'
import Reader from '@/components/Reader'
import { getAuthSession } from '@/lib/auth'
import ReaderActions from '@/components/ReaderActions'

interface PageProps {}

const page = async () => {
  // const session = await getAuthSession()

  return (
    <div className='pt-12'>
      <Reader />
    </div>
  )
}

export default page
