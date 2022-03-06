import { useStyle } from "common/utils/css"
import style from "./Label.module.css"

/**
 * Note: if a h tag is specified,
 * the default styles of that tag will most
 * likely override the bold/italics styles.
 */
export const Label = ({
  text,
  fontSize,
  title,
  bold,
  italic,
  small,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  inline,
}: {
  text: string
  fontSize?: number
  title?: boolean
  bold?: boolean
  italic?: boolean
  small?: boolean
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  inline?: boolean
}) => {
  const _style = useStyle({
    [style.label]: true,
    [style.title]: title,
    [style.bold]: bold,
    [style.italic]: italic,
    [style.inline]: inline,
  })

  const Tag = (() => {
    if (small) return "small"
    if (h1) return "h1"
    if (h2) return "h2"
    if (h3) return "h3"
    if (h4) return "h4"
    if (h5) return "h5"
    if (h6) return "h6"

    return "div"
  })()

  return (
    <Tag className={_style} style={{ fontSize: fontSize }}>
      {" "}
      {text}{" "}
    </Tag>
  )
}
