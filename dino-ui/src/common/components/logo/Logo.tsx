import { ReactComponent as LogoImage } from "static/dino-logo.svg"
import { useStyle } from "common/utils/css"
import style from "./Logo.module.css"

export const Logo = ({
  large = false,
  medium = false,
}: {
  large?: boolean
  medium?: boolean
}) => {
  const _style = useStyle({
    [style.logo]: true,
    [style.large]: large,
    [style.medium]: medium,
  })

  return <LogoImage className={_style} />
}
