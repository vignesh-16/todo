import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";

console.log('%c here is the useParams: ', 'color: blue; font-size: 30px', useParams);

const Navbar = () => {
    let useLocationHook = useLocation();
    let location = useLocationHook?.pathname?.replace('/', '');
    if(location === '') {
        location = 'Home';
    }
    console.log('%c here is the curr location: ', 'color: blue; font-size: 30px', useLocationHook);
    return ( 
        <nav className="navbar">
            <h1 className="captial-first">{location}</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/todo">To Do</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;