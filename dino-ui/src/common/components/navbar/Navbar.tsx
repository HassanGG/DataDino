import Logo from "common/components/logo"
import Label from "common/components/label"
import { useStyle } from "common/utils/css"
import style from "./Navbar.module.css"
import NavbarItem from "./navbar-item"
import { Link } from "react-router-dom"

export const Navbar = ({ large }: { large?: boolean }) => {
  const leftStyle = useStyle({
    [style.left]: true,
    "d-inline-flex": true,
  })

  const rightStyle = useStyle({
    [style.right]: true,
    "d-inline-flex": true,
  })

  const navStyle = useStyle({
    [style.container]: true,
    [style.containerLg]: large,
    navbar: true,
  })

  return (
    <nav className={navStyle}>
      <div className="container-fluid">
        <div className={style.center}>
          <Link to={"/"}>
            <Logo large={Boolean(large)} />
          </Link>
          {large && (
            <div className="mt-4">
              <Label title fontSize={60} text="DATADINO" />
              <Label h6 text="So much data it will make you rawr" />
            </div>
          )}
        </div>
        <div className={leftStyle}>
          <NavbarItem text="DOCS" link="/docs" />
          <NavbarItem text="DEMO" link="/demo" />
        </div>
        <div className={rightStyle}>
          <NavbarItem text="LOGIN" link="/login" />
          <NavbarItem text="BROWSE" link="/datasets" />
        </div>
      </div>
    </nav>
  )
}
