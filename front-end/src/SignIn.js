import { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import usePost from "./usePost";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const signUserIn = usePost('http://localhost:3003/users/isuser')
    const forward = useHistory();
    const reRoute = (route)=> {
        forward.push(route)
    };

    const userValidation = async(e)=>{
        e.preventDefault();
        let userDetails = { emailId : email, password: pass };
        let checkUser = await signUserIn(userDetails);
        console.log('%c valid user: ','color: dark-blue; font-size: 20px', checkUser);
        if(checkUser.isUser && !checkUser.errType) {
            let username = checkUser?.user?.firstname?.toLowerCase();
            sessionStorage.setItem('username', username);
            console.log('%c Session set signing user in: ','color: dark-blue; font-size: 20px');
            let route = 'users/'+username+'/todo'
            console.log('username: ',username,' route: ',route)
            username && reRoute(route);
            console.log('%c Signing in successful: ','color: dark-blue; font-size: 20px');
        } else if (checkUser.isUser && checkUser.errType) {
            alert(`Could not sign in because: ${checkUser.errType}`)
        } else {
            alert(`${checkUser?.message}`);
        }
    }
    return ( 
        <div className="signin-section">
            <section className="app-info">

            </section>
            <section>
                <form onSubmit={ (e)=>{ userValidation(e) } }>
                    <div className="email-address">
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Username  or email" required></input>
                    </div>
                    <div className="password-box">
                        <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Enter your password" required></input>
                    </div>
                    <div className="login-helpers">
                        <span>
                            <a href="/" onClick={ ()=> { console.log('Forgot password clicked!!!') } } >Forgot password?</a>
                        </span>
                        <button>Sign in</button>
                    </div>
                </form>
                <div>
                    <button>
                        <Link to='/signup'>Sign up</Link>
                    </button>
                </div>
            </section>
        </div>
     );
}
 
export default SignIn;