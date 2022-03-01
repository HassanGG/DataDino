import { ReactComponent as LogoImage } from "static/dino-logo.svg"
import { useStyle } from "common/utils/css"
import style from "./Logo.module.css"

export const Logo = ({ large }: { large: boolean }) => {
    const _style = useStyle({
        [style.logo]: true,
        [style.large]: large,
    })

    // const _style = style.logo + " " + large && style.large
    return <LogoImage className={_style}/>
}