import Label from "common/components/label"
import { NavLink } from "react-router-dom"
import style from "./NavbarItem.module.css"
import { useStyle } from "common/utils/css"

export const NavbarItem = ({ text, link }: { text: string; link: string }) => {
	const _style = useStyle({
		"nav-link": true,
		"text-dark": true,
		[style.link]: true
	})

	return (
		<>
			<NavLink
				to={link}
				className={_style}>
					<Label h6 bold text={text} />
			</NavLink>
		</>
	)
}