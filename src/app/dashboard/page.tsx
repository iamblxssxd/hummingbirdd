import { getAuthSession } from '@/lib/auth'
import { WordsTable } from '@/components/WordsTable'
import { db } from '@/lib/db'

import { columns } from '@/components/Columns'
import { notFound } from 'next/navigation'

export default async function page() {
  const session = await getAuthSession()

  if (!session?.user) return notFound()

  const words = await db.word.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your saved words!
          </p>
        </div>
      </div>
      <WordsTable columns={columns} data={words} />
    </div>
  )
}
