import { useStyle } from "common/utils/css"
import style from "./Loading.module.css"

export const Loading = () => {
  const _style = useStyle({
    [style.spinner]: true,
    "spinner-border": true,
  })

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className={_style} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  )
}
