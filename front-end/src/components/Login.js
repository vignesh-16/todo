import { useEffect, useState } from "react";
import usePost from "../customhooks/usePost";
import back from '../resources/left-arrow.png';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
    
    const [ userAction, setUserAction ] = useState('email');
    const [ label, setLabel ] = useState('Next')
    const [ userInput, setUserInput ] = useState('');
    const [ notValid, setNotValid ] = useState(false);
    const [ user, setUser ] = useState({});
    const login = useHistory()
    const checkUserCredentials = usePost('http://localhost:3003/users/isuser')

    useEffect(()=>{
        if (userAction === 'email') {
            setLabel('Next');
        } else {
            setLabel('Sign in')
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
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('userId', ValidateUser?.user?._id);
            } else {
                setNotValid(true)
            }
        } else {
            console.log(`%c Hi.. here is the password: ${userInput}\n ${JSON.stringify(user)}`,'color: teal; font-size: 15px');
            if(user?.password === userInput) {
                let toRoute = 'users/'+sessionStorage.getItem('username')+'/todo'
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
                <button type="submit" onClick={ (e)=>{ jumpToNext() } } className="go-next" >{label}</button>
            </div>
        </section>
    );
}
 
export default Login;