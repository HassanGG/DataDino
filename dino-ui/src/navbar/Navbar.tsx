import Logo from "common/components/logo"
import Label from "common/components/label"
import { useStyle } from "common/utils/css"
import style from "./Navbar.module.css"
import { NavbarItem } from "./NavBarItem"

export const Navbar = ({ large }: { large: boolean }) => {
    const TitleDesc = () => {
        return <div className="mt-4">
                        <Label title fontSize={ 50 } text="DATADINO" />
                        <Label h6 text="So much data it will make you rawr" />
                </div>
    }

    const leftStyle = useStyle({
        [style.left]: true,
        "d-inline-flex": true
    })

    const rightStyle = useStyle({
        [style.right]: true,
        "d-inline-flex": true
    })

    const navStyle = useStyle({
        [style.container]: true,
        [style.containerLg]: large,
        "navbar": true
    })

    return (
			<nav className={navStyle}>
				<div className='container-fluid'>
					<div className={style.center}>
						<a className='navbrand' href='/'>
							<Logo large={large} />
						</a>
						{large && <TitleDesc />}
					</div>
					<div className={leftStyle}>
						<NavbarItem text='DOCS' link='#' />
						<NavbarItem text='DEMO' link='#' />
					</div>
					<div className={rightStyle}>
						<NavbarItem text='LOGIN' link='#' />
						<NavbarItem text='BROWSE' link='/datasets' />
					</div>
				</div>
			</nav>
		)
}