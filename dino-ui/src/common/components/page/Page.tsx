import Navbar from "common/components/navbar"

import { useStyle } from "common/utils/css"
import { useNavigate } from "react-router-dom"
import style from "./Page.module.css"

type Slot = undefined | JSX.Element | JSX.Element[] | string

export const Page = ({
  children,
  largeNavbar,
  showBar,
}: {
  children: Slot
  largeNavbar?: boolean
  showBar?: boolean
}) => {
  const _style = useStyle({
    [style.page]: true,
    "d-flex flex-column gap-4": true,
  })
  const iconStyle = useStyle({
    [style.icon]: true,
    bi: true,
  })
  const backIconStyle = useStyle({
    [iconStyle]: true,
    "bi-arrow-left": true,
  })
  const cartIconStyle = useStyle({
    [iconStyle]: true,
    "bi-cart": true,
  })

  const navigate = useNavigate()

  const back = () => navigate(-1)
  const toCart = () => navigate("./cart")

  return (
    <>
      <div className={_style}>
        <Navbar large={largeNavbar} />

        {showBar && (
          <div className="d-flex justify-content-between">
            <div className="btn btn-light" onClick={back}>
              <i className={backIconStyle}></i>
            </div>

            <div className="btn btn-light" onClick={toCart}>
              <i className={cartIconStyle}></i>
            </div>
          </div>
        )}

        {children}
      </div>
    </>
  )
}
