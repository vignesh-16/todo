import { useEffect, useState } from "react";
import usePost from "../customhooks/usePost";
import back from '../resources/left-arrow.png';
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
    
    const [ userAction, setUserAction ] = useState('email');
    const [ label, setLabel ] = useState('Next');
    const [ help, setHelp ] = useState('Create account');
    const [ userInput, setUserInput ] = useState('');
    const [ notValid, setNotValid ] = useState(false);
    const [ user, setUser ] = useState({});
    const login = useHistory()
    const checkUserCredentials = usePost('http://localhost:3003/users/isuser');
    const authUser = usePost('http://localhost:3003/users/login');
    const isSignedIn = localStorage.getItem('userId') && localStorage.getItem('token') && localStorage.getItem('loggedin');
    console.log('%c is signed in user? :: ','color: orange; font-size: 20px', isSignedIn);

    useEffect(() => {
        if (isSignedIn) {
            login.push(`/users/${localStorage.getItem('username')}/todo`);
        }
    }, [isSignedIn, login]);

    useEffect(()=>{
        if (userAction === 'email') {
            setLabel('Next');
            setHelp('Create account');
        } else {
            setLabel('Sign in');
            setHelp('Forgot password?');
        }
    },[userAction])

    const jumpToNext = async()=>{
        if (userAction === 'email') {
            console.log(`%c Hi.. here is the email: ${userInput}`,'color: teal; font-size: 15px');
            let ValidateUser = await checkUserCredentials( { emailId: userInput} );
            if(ValidateUser?.isUser) {
                setUserAction('pass');
                setUser(ValidateUser?.user)
                setUserInput('');
                let username = ValidateUser?.user?.firstname?.toLowerCase();
                localStorage.setItem('username', username);
            } else {
                setNotValid(true)
            }
        } else {
            console.log(`%c Hi.. here is the password: ${userInput}\n ${JSON.stringify(user)}`,'color: teal; font-size: 15px');
            let userAuth = await authUser({email: user?.email, password: userInput})
            if(userAuth?.isAuthenticated) {
                let toRoute = 'users/'+localStorage.getItem('username')+'/todo';
                localStorage.setItem('userId', user?._id);
                localStorage.setItem('token', userAuth?.userToken)
                localStorage.setItem('loggedin',true);
                login.push(toRoute)
            } else {
                setNotValid(true)
            }
        }
    }

    const clearWarnings = async()=> {
        setNotValid(false);
    }

    const jumpBack =()=>{
        setUserAction('email');
        setLabel('Next')
        setHelp('Create account');
    }

    const getPage = ()=>{
        if(help === 'Create account') {
            login.push('/signup');
        } else {
            login.push('/resetPassword')
        }
    }

    const steps = {
        email : <input type="email" 
                    value={userInput} 
                    onChange={ (e)=>{ setUserInput(e?.currentTarget?.value) } } 
                    onFocus={ (e)=> { clearWarnings() } }
                    className={`field-input email-in ${notValid ? 'input-error' : ''}`} 
                    placeholder="Enter your registered email" required>
                </input>,
        pass : <input type="password" 
                    value={userInput} 
                    onChange={ (e)=>{ setUserInput(e?.currentTarget?.value) } } 
                    onFocus={ (e)=> { clearWarnings() } }
                    className={`field-input pass-in ${notValid ? 'input-error' : ''}`} 
                    placeholder="Enter your account password" required>
                </input>
    }

    return (
        <>
            {
                <section className="login-class">
                    <div className="field-input-container">
                        <span className={`back-arrow-holder`} onClick={ (e)=>{ console.log('Click event received!'); jumpBack() } } >
                            <img className={`back-arrow ${userAction === 'email' ? 'hidden': ''}`} src={back} alt="back-arrow"/>
                        </span>
                        <span className="field-input-holder">
                            { steps[userAction] }
                        </span>
                    </div>
                    <div className="user-actions">
                        <span onClick={ (e)=>{ getPage() } } className={`user-help`}>
                            <Link to={''}>
                                {help}
                            </Link>
                        </span>
                        <button type="submit" onClick={ (e)=>{ jumpToNext() } } className="go-next" >{label}</button>
                    </div>
            </section>
            }
        </>
    );
}
 
export default Login;