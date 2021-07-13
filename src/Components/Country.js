import React, { useContext } from 'react';
import { Context } from '../Context.js';
import Article from './Article.js';

const Country = () => {
    const { loggedIn, countryArticles } = useContext(Context);

    return (
        <div className={loggedIn ? 'country content column' : 'content not-logged-in'}>
            {
                countryArticles.length === 0 ?
                <h1>To view news from your country, choose a country code via your profile</h1> :
                countryArticles.map((curr,index) => 
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
    )
}

export default Country;