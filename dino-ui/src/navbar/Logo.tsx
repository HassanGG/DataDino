import logo from "../images/logo.png"
import "../css/logo.css"

export const Logo = ({isLanding} : {isLanding : boolean}) => {
    return <img src={logo} alt="DataDino logo" className={`${isLanding ? "large" : "small"}`}/>
}