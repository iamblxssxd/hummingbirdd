import { User } from 'next-auth'
// import { FC } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/Avatar'
import { AvatarProps } from '@radix-ui/react-avatar'

import Image from 'next/image'
import { Icons } from './Icons'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'name' | 'image'>
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative w-full h-full aspect-square'>
          <Image
            fill
            src={user.image}
            alt='profile picture'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
