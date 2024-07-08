import { useState } from "react";

const SignUp = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    const createUser = (e)=> {
        e.preventDefault()
        let userDetails = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: pass
        }
       console.log('%c here is user details: ','color: blue; font-size: 20px',userDetails);
       fetch('http://localhost:3003/users/adduser',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
       }).then(async (res)=>{
            if(!res.ok) {
                console.log('%c Server Error: ','color: red; font-size: 20px',await res.json())
                throw Error('Bad response from server')
            }
            return await res.json()
       }).then((data)=>{
            console.log('Here is server response','color: blue; font-size: 20px',data)
       }).catch(err => {
            console.error('Error while reading from server response:',err.message)
       })
    }
    return ( 
        <div className="signup-section">
            <section>
                <form onSubmit={ (e)=>{ createUser(e) } }>
                    <div className="first-name">
                        <p>Firstname: </p>
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="eg: John" required></input>
                    </div>
                    <div className="last-name">
                        <p>Lastname: </p>
                        <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="eg: Wayne"></input>
                    </div>
                    <div className="email-address">
                        <p>Email: </p>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="eg: john.wayne@gmail.com" required></input>
                    </div>
                    <div className="password-box">
                        <p>Password: </p>
                        <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Enter a secure password" required></input>
                    </div>
                    <button>Sign up</button>
                </form>
            </section>
        </div>
    );
}
 
export default SignUp;