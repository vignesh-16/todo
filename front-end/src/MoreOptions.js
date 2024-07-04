import { useState } from "react";
import { Link } from "react-router-dom";

const MoreOptions = () => {

    let user = sessionStorage.getItem('username') || 'User';
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = ()=> {
        setIsOpen(!isOpen);
    }

    return ( 
        <span className="more-options">
            <span className="icon-name-container">
                <p className="user-name-display">
                    <button onClick={ ()=>{ toggleDropdown() } }>{user}</button>
                </p>
            </span>
            {
                isOpen && (
                    <ul className="options-menu">
                        <Link to={`/users/${user}/profile`}>Profile</Link>
                        <Link to={`/`}>Sign Out</Link>
                    </ul>
                )
            }
        </span>
     );
}
 
export default MoreOptions;