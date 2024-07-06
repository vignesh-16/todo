import { useState } from "react";
import { Link } from "react-router-dom";

const MoreOptions = () => {

    let user = sessionStorage.getItem('username');
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = ()=> {
        setIsOpen(!isOpen);
    }

    return ( 
        <span className="navbar-option more-options">
            <span className="icon-name-container">
                <p className="user-name-display">
                    <button className="captial-first" onClick={ ()=>{ toggleDropdown() } }>{user}</button>
                </p>
            </span>
            {
                isOpen && (
                    <ul className="options-menu">
                        <li className="border-bottom" ><Link to={`/users/${user}/profile`}>Profile</Link></li>
                        <li><Link to={`/`} onClick={ ()=>{ sessionStorage.removeItem('username') } } >Sign Out</Link></li>
                    </ul>
                )
            }
        </span>
     );
}
 
export default MoreOptions;