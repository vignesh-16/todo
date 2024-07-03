import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import usePost from "./usePost";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [signedUser, setSignedUser] = useState({});
    const signUserIn = usePost('http://localhost:3003/users/isuser')
    const forward = useHistory();
    const reRoute = (route)=> {
        forward.push(route)
    };

    const userValidation = async(e)=>{
        e.preventDefault();
        let userDetails = { emailId : email, password: pass };
        let validUser = await signUserIn(userDetails);
        console.log('%c valid user: ','color: dark-blue; font-size: 20px', validUser);
        if(validUser !== null && validUser !== undefined) {
            setSignedUser(validUser)
            let username = signedUser?.firstname?.toLowerCase();
            sessionStorage.setItem('username', username);
            let route = 'users/'+username+'/todo'
            username && reRoute(route);
        }
    }
    return ( 
        <div className="signin-section">
            <section className="app-info">

            </section>
            <section>
                <div className="email-address">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Username  or email" required></input>
                </div>
                <div className="password-box">
                    <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Enter your password" required></input>
                </div>
                <span>
                    <a href="#" onClick={ ()=> { console.log('Forgot password clicked!!!') } } >Forgot password?</a>
                </span>
                <div className="login-signup-container">
                    <button onClick={ (e)=>{ userValidation(e) } }>Log in</button>
                    <button onClick={ ()=> {} }>Sign up</button>
                </div>
            </section>
        </div>
     );
}
 
export default SignIn;