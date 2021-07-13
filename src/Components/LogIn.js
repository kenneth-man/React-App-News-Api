import React, { useContext, useState } from 'react';
import loginVid from '../Res/login-vid.mp4';
import { Link } from 'react-router-dom';
import { Context } from '../Context.js';

const LogIn = () => { 
    const { allUsers, setActiveUserName, toggleLoggedIn } = useContext(Context);
    const [inputtedEmail, setInputtedEmail] = useState('');
    const [inputtedPassword, setInputtedPassword] = useState('');
    //since input element values are cleared when changing route, storing inputted email in an extra state 'activeEmail' to find a matching user email; to get their username
    const [activeEmail, setActiveEmail] = useState('');
    
    const checkIfMatchingUser = allUsers.find(curr => curr.email === inputtedEmail && curr.password === inputtedPassword);

    const displayNoUserMsg = () => {
        document.querySelector('.login__NoUserMsg').classList.toggle('hiddenWTransition');

        setTimeout(() => { 
            document.querySelector('.login__NoUserMsg').classList.toggle('hiddenWTransition');
        }, 1500);
    }

    const emailOnChange = (eventValue) => {
        setInputtedEmail(eventValue);
        setActiveEmail(eventValue);
    }

    const logInOnClick = () => {
        toggleLoggedIn();

        //searching by matching email because login requires only email and password (and not username)
        const activeUserObj = allUsers.find(curr => curr.email === activeEmail);
        setActiveUserName(activeUserObj.username);
    }

    return (
        <div className='login row'>
            <video src={loginVid} className='login__vid' loop={true} muted={true} autoPlay={true} />

            <div className='login__input-cont column'>
                <h1>News-Api</h1>

                <h2>Global news all in one place</h2>

                <div className='login__input-group column'>
                    <div className='column'>
                        <label htmlFor='email'>Email</label>
                        <input name='email' type='text' placeholder='example-user@email.com' value={inputtedEmail} onChange={(e) => emailOnChange(e.target.value)}/>
                    </div>

                    <div className='column'>
                        <label htmlFor='pass'>Password</label>
                        <input name='pass' type='password' value={inputtedPassword} onChange={(e) => setInputtedPassword(e.target.value)}/>
                    </div>
                </div>

                <h3 className='login-register login__NoUserMsg hiddenWTransition transition'>No user found with matching email and password</h3>

                <Link to={checkIfMatchingUser ? '/Home' : '/'} className='link' onClick={checkIfMatchingUser ?  logInOnClick : displayNoUserMsg}>Log In</Link>

                <Link to='/Register' className='login__link'>Don't have an account? Register Here</Link>
            </div>
        </div>
    )
}

export default LogIn;