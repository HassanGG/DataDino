import { useStyle } from "common/utils/css"
import style from "./FormCard.module.css"

export const FormCard = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {

  const _cardStyle = useStyle({
    [style.card]: true,
    "d-flex": true,
    "flex-column": true,
    "align-items-center": true,
    "justify-content-around": true,
  })

  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <div className={_cardStyle}>
        { children }
      </div>
    </div>
  )
}
