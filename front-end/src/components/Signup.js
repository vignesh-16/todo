import { useEffect, useState } from "react";
import back from '../resources/left-arrow.png';

const Signup = () => {
    const [ stage, setStage ] = useState('name_email');
    const stages = ['name_email','verify_email','set_password'];
    const [ stageHeader, setStageHeader ] = useState('Welcome to ToDo App!');
    const stageHeaders = ['Welcome to ToDo App!','Verify email address','Set a password'];
    const [ currIndex, setCurrIndex ] = useState(0);
    const allStage = {
        name_email : [
                        <div className="user-name-division" key={1} >
                            <input type="text" placeholder="Your first name" required></input>,
                            <input type="text" placeholder="Last/Family name" required></input>
                        </div>,
                        <input type="email" placeholder="Your email address" key={2} required></input>,
                        <input type="email" placeholder="Confirm your email address" key={3} required></input>
                    ],
        verify_email: <input type="numbers" placeholder="5-digit OTP"  key={1} required></input>,
        set_password: [
                        <input type="password" placeholder="Pick a strong password" key={1} ></input>,
                        <input type="password" placeholder="Confirm your password" key={2} ></input>
                    ]
    };
    useEffect(()=>{
        let index = stages.indexOf(stage);
        let header = stageHeaders[index];
        setCurrIndex(index);
        setStageHeader(header);
    },[stage]);

    const processForm = (e)=> {
        e.preventDefault();
        console.log('Here are the sign-up form data: ',e);
    }

    const jumpToNext = ()=> {
        if(stage === 'name_email') {
            setStage('verify_email');
        } else if (stage === 'verify_email') {
            setStage('set_password');
        } else {

        }
    }

    const jumpBack = ()=> {
        let targetIndex = currIndex - 1;
        let moveTo = stages[targetIndex];
        setStage(moveTo);
    }

    return ( 
        <form className="sign-up-form" onSubmit={ (e)=> { processForm(e) } }>
            <span className={`arrow-holder ${ currIndex > 0 ? '' : 'hidden'}`} onClick={ (e)=>{ console.log('Click event received!'); jumpBack() } } >
                <img className={`go-back`} src={back} alt="back-arrow"/>
            </span>
            <span className="stage-header">
                <h1>{stageHeader}</h1>
            </span>
            <div className="signup-field-input-container">
                { allStage[stage] }
            </div>
            <div className="signup-user-actions">
                <button type="submit" onClick={ (e)=>{ jumpToNext() } } className="go-next" >Next</button>
            </div>
        </form>
     );
}
 
export default Signup;