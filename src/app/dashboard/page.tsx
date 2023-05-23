import { getAuthSession } from '@/lib/auth'
import { WordsTable } from '@/components/WordsTable'
import { db } from '@/lib/db'

import { columns } from '@/components/Columns'
import { notFound } from 'next/navigation'

export default async function page() {
  const session = await getAuthSession()

  if (!session) return notFound
  
  const words = await db.word.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <div className='container mx-auto py-10'>
      <WordsTable columns={columns} data={words} />
    </div>
  )
}
