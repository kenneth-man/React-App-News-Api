import React, { useContext } from 'react';
import { Context } from '../Context.js';
import Article from './Article.js';
import homeVid  from '../Res/home-vid.mp4';
import homeVid2  from '../Res/home-vid-2.mp4';
import homeVid3  from '../Res/home-vid-3.mp4';
import spinner from '../Res/spinner.gif';


//navigate user to login page using setimeout and props.history????
const Home = () => {
    const { loggedIn, rdmHomeArticles } = useContext(Context);

    return (
        <div className={loggedIn ? 'home content column' : 'content not-logged-in'}>
            <h1 style={{marginTop: '75px'}}>Read the news from all countries and sources</h1>

            <h2 style={{marginTop: '25px', marginBottom: '100px'}}>(Click on the profile icon to set your preferences)</h2>

            <div className='home__articles column'>
                {
                    rdmHomeArticles.length === 0 ?
                    <img src={spinner} alt='loading spinner' className='spinner'/> :
                    rdmHomeArticles.map((curr,index) => 
                        <Article 
                            key={index}
                            author={curr.author}
                            content={curr.content}
                            desc={curr.description}
                            date={curr.publishedAt}
                            source={curr.source.name}
                            title={curr.title}
                            url={curr.url}
                            img={curr.urlToImage}
                        />
                    )
                }
            </div>

            <div className='home__grid'>
                <video src={homeVid} className='home__vid' loop={true} muted={true} autoPlay={true}/>

                <h3 className='home__h3'>① <br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit...</h3>

                <h3 className='home__h3'>② <br/> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</h3>

                <video src={homeVid2} className='home__vid' loop={true} muted={true} autoPlay={true}/>

                <video src={homeVid3} className='home__vid' loop={true} muted={true} autoPlay={true}/>
                
                <h3 className='home__h3'>③ <br/> Ut enim ad minim veniam, quis nostrud exercitation!</h3>
            </div>

            <div className='home__footer column'>
                <div className='home__footer-row row'>
                    <a href='https://www.google.com/' className='transition'>Privacy</a>

                    <a href='https://www.google.com/' className='transition'>Terms</a>

                    <a href='https://www.google.com/' className='transition'>Contact</a>

                    <a href='https://www.google.com/' className='transition'>Social</a>
                </div>

                <h4>News-Api © 2021. All Rights Reserved.</h4>
            </div>
        </div>
    )
}

export default Home;