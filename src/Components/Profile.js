import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context.js';
import Article from './Article.js';

const Profile = () => {
    const { loggedIn, activeUserObj, toggleLoggedIn, setActiveUserCountry } = useContext(Context);

    const [inputFirstName, setInputFirstName] = useState(activeUserObj.firstName);
    const [inputLastName, setInputLastName] = useState(activeUserObj.lastName);
    const [inputCountry, setInputCountry] = useState(activeUserObj.country);

    //all country codes on the api (which doesn't provide a way to query all code names)
    const countryCodes = ['ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za'];
    const isCountryCodeValid = countryCodes.find(curr => curr === inputCountry);

    const submitChanges = () => {   
        activeUserObj.firstName = inputFirstName;
        activeUserObj.lastName = inputLastName;
        activeUserObj.country = inputCountry;
        
        //for 'Country.js' component page (since using a useEffect in Context.js, and not wanting to run the specific useEffect everytime activeUserObj is changed)
        setActiveUserCountry(inputCountry);
    }

    const showAlert = () => {
        alert('No existing country code was found');
    }

    return (
        <div className={loggedIn ? 'profile content column' : 'content not-logged-in'}>
            <h1 className='profile__h1'>{activeUserObj.username}</h1>

            <div className='profile__names column'>
                <h2 className='profile__h2'>Name &ndash; {activeUserObj.firstName} {activeUserObj.lastName}</h2>

                <div className='profile__names-row row'>
                    <input placeholder='Edit first name' value={inputFirstName} onChange={(e) => setInputFirstName(e.target.value)}/>

                    <input placeholder='Edit last name' value={inputLastName} onChange={(e) => setInputLastName(e.target.value)}/>
                </div>
            </div>

            <div className='profile__country column'>
                <h2 className='profile__h2'>Country &ndash; {activeUserObj.country}</h2>

                <input placeholder='Edit country using it&#39;s country code' value={inputCountry} onChange={(e) => setInputCountry(e.target.value)}/>

                <a href='https://newsapi.org/sources'>(To see all available country codes, click here)</a>
            </div>

            <div className='profile__fav column'>
                <h2 className='profile__h2' style={{color: 'rgb(32,178,178)', marginBottom: '25px'}}>Your Favourite Articles</h2>

                {
                    activeUserObj.favourites.length === 0 ?
                    <h3>No Favourites Saved</h3> : 
                    activeUserObj.favourites.map((curr, index) => 
                        <Article 
                            key={index}
                            author={curr.auth} 
                            content={curr.cont} 
                            desc={curr.descr} 
                            date={curr.dat}  
                            source={curr.src} 
                            title={curr.title}  
                            url={curr.url}  
                            img={curr.image} 
                        />
                    )
                }
            </div>

            <div className='profile__links-row row'>
                <Link className='link' to={isCountryCodeValid ? '/Home' : '/Profile'} onClick={isCountryCodeValid ? submitChanges : showAlert}>Save Changes</Link>

                <Link className='link' to={'/'} onClick={toggleLoggedIn}>Signout</Link>
            </div>
        </div>
    )
}

export default Profile;