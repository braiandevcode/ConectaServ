import { Link } from "react-router";
import { FaBriefcase } from "react-icons/fa";

import './NavService.css';
import scrolledTop from "../../../utils/scrollTop";
const NavService= () => {
    return (
        <>
        <div>
           <Link to={'/client/services'} onClick={() => scrolledTop()} className="service__link c-flex c-flex-items-center gap-1/2"><FaBriefcase/><p>Servicios</p></Link>
        </div>
        </>
    )
}

export default NavService;