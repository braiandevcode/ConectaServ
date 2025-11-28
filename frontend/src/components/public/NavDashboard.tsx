import { Link } from "react-router";

// CSS
import './NavDashboard.css';

const NavDashboard = () => {
    return (
        <>
           <Link to={'/dashboard'} className="dashboard__link">DashBoard</Link>
        </>
    )
}

export default NavDashboard;