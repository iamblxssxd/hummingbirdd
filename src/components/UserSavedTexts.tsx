import { type FC } from "react"
import { type Text } from "@prisma/client"

import { TextPreview } from "./TextPreview"

interface UserSavedTextsProps {
  texts: Text[]
}

const UserSavedTexts: FC<UserSavedTextsProps> = ({ texts }) => {
  return (
    // TODO quick read button (opens a modal with the text)
    <ul className="col-span-2 flex flex-col">
      {texts.map((text) => (
        <li key={text.id}>
          <TextPreview text={text} />
        </li>
      ))}
    </ul>
  )
}

export default UserSavedTexts
