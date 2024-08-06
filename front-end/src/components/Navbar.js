import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import MoreOptions from "./MoreOptions";

console.log('%c here is the useParams: ', 'color: blue; font-size: 30px', useParams);

const Navbar = () => {
    let useLocationHook = useLocation();
    let path = useLocationHook?.pathname;
    let user = localStorage?.getItem('username');
    let location = path.replace('/users/'+user+'/','').replace('/', '');
    if(location === '') {
        location = 'Login';
    }
    console.log('%c here is the curr location: ', 'color: blue; font-size: 30px', useLocationHook);
    return (
        <span>
            {
                user && (
                    <nav className="navbar">
                        <h1 className="captial-first">{location}</h1>
                        <div className="links">
                            <Link className='navbar-option' to={`/users/${user}/home`}>Home</Link>
                            <Link className='navbar-option' to={`/users/${user}/todo`}>To Do</Link>
                            < MoreOptions />
                        </div>
                    </nav>
                )
            }
        </span>
     );
}
 
export default Navbar;