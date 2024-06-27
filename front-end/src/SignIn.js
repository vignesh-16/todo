import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [signedUser, setSignedUser] = useState({});
    const forward = useHistory();

    const userValidation = (e)=>{
        e.preventDefault();
        let userDetails = { emailId : email, password: pass };
        fetch('http://localhost:3003/users/isuser',{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(userDetails)
        }).then((res)=>{
            if(!res.ok) {
                console.log('%c Server Error: ','color: red; font-size: 20px',res.json())
                throw Error('Bad response from server')
            }
            return res.json()
       }).then((data)=>{
            console.log('Here is server response','color: blue; font-size: 20px',data)
            setSignedUser(data)
       }).catch(err => {
            console.error('Error while reading from server response:',err.message)
       })
    }
    const reRoute = (route)=> {
        forward.push(route)
    };
    useEffect(()=>{
        let username = signedUser?.firstname?.toLowerCase();
        let route = 'users/'+username+'/todo'
        username && reRoute(route);
    },[signedUser, reRoute])
    return ( 
        <div className="signin-section">
            <form onSubmit={ (e)=>{ userValidation(e) } }>
                <div className="email-address">
                    <p>Username or Email: </p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="eg: john.wayne@gmail.com" required></input>
                </div>
                <div className="password-box">
                    <p>Password: </p>
                    <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Enter a secure password" required></input>
                </div>
                <button>Log in</button>
            </form>
        </div>
     );
}
 
export default SignIn;