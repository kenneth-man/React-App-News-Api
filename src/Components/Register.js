import React, { useContext, useState } from 'react';
import { Context } from '../Context.js'
import { Link } from 'react-router-dom';

const Register = () => {
    const { addUser } = useContext(Context);
    const [registeringEmail, setRegisteringEmail] = useState('');
    const [registeringPassword, setRegisteringPassword] = useState('');
    const [registeringPasswordCheck, setRegisteringPasswordCheck] = useState('');
    const checkIfMatchingPass = registeringPassword === registeringPasswordCheck;
    const checkIfValidEmail = registeringEmail.includes('@');
    const checkIfAllValid = checkIfMatchingPass && checkIfValidEmail;

    const addUserOnClick = () => {
        //creating a username for a user by getting the email's text before the '@'
        const user = registeringEmail.split('@');

        addUser({
            username: user[0],
            email: registeringEmail,
            password: registeringPassword,
            firstName: '(Not Specified)',
            lastName: '(Not Specified)',
            country: '(Not Specified)',
            favourites: []
        })
    }

    const displayNotSamePass = () => {
        document.querySelector('.register__NotSamePass').classList.toggle('hiddenWTransition');

        setTimeout(() => { 
            document.querySelector('.register__NotSamePass').classList.toggle('hiddenWTransition');
        }, 1500);
    }

    return (
        <div className='register column'>
            <h1>Register on our site</h1>

            <div className='column'>
                <label htmlFor='email'>Enter an email</label>
                <input name='email' type='text' placeholder='example-user@email.com' value={registeringEmail} onChange={(e) => setRegisteringEmail(e.target.value)}/>
            </div>

            <div className='column'>
                <label htmlFor='pass'>Enter a password</label>
                <input name='pass' type='password' value={registeringPassword} onChange={(e) => setRegisteringPassword(e.target.value)}/>
            </div>

            <div className='column'>
                <label htmlFor='pass'>Re-enter password</label>
                <input name='pass' type='password' value={registeringPasswordCheck} onChange={(e) => setRegisteringPasswordCheck(e.target.value)}/>
            </div>

            <h3 className='login-register register__NotSamePass hiddenWTransition transition'>Invalid email or Non-identical passwords entered</h3>

            <Link to={checkIfAllValid ? '/' : '/Register'} className='link' onClick={checkIfAllValid ? addUserOnClick : displayNotSamePass}>Confirm</Link>
        </div>
    )
}

export default Register;