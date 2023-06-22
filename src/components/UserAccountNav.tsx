'use client'

import { User } from 'next-auth'
import { FC } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu'
import { UserAvatar } from '@/components/UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className='w-8 h-8'
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-medium'>{user.name}</p>}
            {user.email && (
              <p className='text-sm text-muted-foreground'>{user.email}</p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* TODO add icons (words, library, settings) */}
        <DropdownMenuItem asChild>
          <Link href='/dashboard'>Saved Words</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/texts'>My Texts</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/'>Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sing-in`,
            })
          }}
          className='cursor-pointer'>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
