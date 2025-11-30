import { Link } from "react-router";
import { FaBriefcase } from "react-icons/fa";

import './NavService.css';
const NavService= () => {
    // const [] = useState<boolean>(false);

    return (
        <>
        <div>
           <Link to={'/services/all'} className="service__link c-flex c-flex-items-center gap-1/2"><FaBriefcase/>Servicios</Link>
        </div>
        </>
    )
}

export default NavService;