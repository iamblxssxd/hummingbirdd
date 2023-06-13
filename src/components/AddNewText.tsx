import React from 'react'
import { Icons } from './Icons'

export default function AddNewText() {
  return (
    <div className='flex w-full flex-col gap-4 lg:w-min'>
      <div>
        <h2 className='font-semibold text-lg leading-6 tracking-tight'>
          Read something new
        </h2>
        <p className='text-sm text-muted-foreground'>Could be any text.</p>
      </div>
      {/* TODO add animation on hover */}
      <div className='h-36 w-60 lg:h-40 flex border-[1px] rounded-md'>
        <div className='relative flex flex-1 flex-col items-center justify-center rounded-md p-5 text-textBase focus-within:text-textBase hover:text-textBase hover:no-underline'>
          <Icons.addText className='flex items-center justify-center rounded-full p-2 h-8 w-8' />
          <span className='text-xl font-bold text-textBase ng-star-inserted'>
            Add text
          </span>
        </div>
      </div>
    </div>
  )
}
