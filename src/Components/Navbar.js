import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../Context.js';
import logo from '../Res/logo.svg';
import profile from '../Res/user.svg';

const Navbar = () => {
    const { loggedIn, activeUserName } = useContext(Context);

    return (
        <div className={loggedIn ? 'navbar row' : 'navbar not-logged-in'}>
            <NavLink exact to='/Home' className='navbar__logo-link center'>
                <img src={logo} alt='logo' className='navbar__logo'/>
            </NavLink>

            <NavLink exact to='/Home' activeClassName='navbar__link--active' className='navbar__link transition'>Home</NavLink>

            <NavLink exact to='/Country' activeClassName='navbar__link--active' className='navbar__link transition'>Country</NavLink>

            <NavLink exact to='/Recent' activeClassName='navbar__link--active' className='navbar__link transition'>Recent</NavLink>

            <NavLink exact to='/Top' activeClassName='navbar__link--active' className='navbar__link transition'>Top</NavLink>

            <NavLink to={`/${activeUserName}`} activeClassName='navbar__link--active' className='navbar__profile-link row transition'>
                Profile
                <img src={profile} alt='profile-icon' className='navbar__icon'/>
            </NavLink>
        </div>
    )
}

export default Navbar;