import { Text } from '@prisma/client'
import { FC } from 'react'
import TextPreview from './Text'

interface UserSavedTextsProps {
  texts: Text[]
}

const UserSavedTexts: FC<UserSavedTextsProps> = ({ texts }) => {
  return (
    // TODO quick read button (opens a modal with the text)
    <ul>
      {texts.map((text) => (
        <li key={text.id}>
          <TextPreview text={text} />
        </li>
      ))}
    </ul>
  )
}

export default UserSavedTexts
