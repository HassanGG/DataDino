import { ReactComponent as LogoImage } from "static/dino-logo.svg"
import style from "./Logo.module.css"

export const Logo = ({ large }: { large: boolean }) => {
    const _style = style.logo + " " + large && style.large
    return <LogoImage className={_style}/>
}