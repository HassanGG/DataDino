import Navbar from "common/components/navbar"

import { useStyle } from "common/utils/css"
import style from "./Page.module.css"

type Slot = undefined | JSX.Element | JSX.Element[] | string

export const Page = ({
  children,
  largeNavbar,
}: {
  children: Slot
  largeNavbar?: boolean
}) => {
  const _style = useStyle({
    [style.page]: true,
  })

  return (
    <>
      <div className={_style}>
        <Navbar large={largeNavbar} />
        {children}
      </div>
    </>
  )
}
