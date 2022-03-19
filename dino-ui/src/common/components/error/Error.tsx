import { useStyle } from "common/utils/css"
import style from "./Error.module.css"

export const Error = ({ text }: { text: string }) => {
  const _style = useStyle({
    [style.error]: true,
  })

  return (
    <>
      <div className={_style}>Shoot, an error occured: {text}</div>
    </>
  )
}
