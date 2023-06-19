// TODO create a utility fn to format date to a more readable format (e.g. 2h ago, 3d ago, 4w ago, 5m ago, 6y ago, etc.)

import { FC } from 'react'
import { Text } from '@prisma/client'

interface TextProps {
  text: Text
}

const TextPreview: FC<TextProps> = ({ text }) => {
  return <div>{text.title}</div>
}

export default TextPreview
