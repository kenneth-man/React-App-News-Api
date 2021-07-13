import React, { useContext } from 'react';
import { Context } from '../Context.js';
import Article from './Article.js';
import spinner from '../Res/spinner.gif';

const Recent = () => {
    const { loggedIn, recentArticles } = useContext(Context);

    return (
        <div className={loggedIn ? 'recent content column' : 'content not-logged-in'}>
            {
                recentArticles.length === 0 ?
                <img src={spinner} alt='loading' className='spinner'/> :
                recentArticles.map((curr, index) => 
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

export default Recent;