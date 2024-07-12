import { useEffect, useRef, useState } from "react";

const Login = () => {
    
    const [ userAction, setUserAction ] = useState('email');
    const [ label, setLabel ] = useState('Next')
    const userInput = useRef(null)
    const passInput = useRef(null)
    
    useEffect(()=>{
        if (userAction === 'email') {
            setLabel('Next');
        } else {
            setLabel('Sign in')
        }
    },[userAction])

    const jumpToNext = ()=>{
        if (userAction === 'email') {
            console.log(`%c Hi.. here is the email: ${userInput}`,'color: teal; font-size: 15px');
            setUserAction('pass')
        } else {
            console.log(`%c Hi.. here is the password: ${passInput}`,'color: teal; font-size: 15px');
        }
    }

    const steps = {
        email : <input type="email" ref={userInput} className="field-input" placeholder="Enter your email" required></input>,
        pass : <input type="password" ref={passInput} className="field-input" placeholder="Enter your account password" required></input>
    }

    return ( 
        <section className="login-class">
            <div className="field-input-container">
                <span className={`back-arrow ${userAction === 'email' ? '': ''}`} onClick={ (e)=>{ console.log('Click event received!') } } >
                    <img src="./resources/left-arrow.png" alt="back-arrow"></img>
                </span>
                { steps[userAction] }
            </div>
            <div className="user-actions">
                {/* <button className={`go-back ${userAction === 'email' ? 'hidden': ''}`} onClick={ (e)=> { console.log('Back to email') } }>Back</button> */}
                <button type="submit" onClick={ (e)=>{ jumpToNext() } } className="go-next" >{label}</button>
            </div>
        </section>
    );
}
 
export default Login;