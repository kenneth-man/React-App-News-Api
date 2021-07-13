import React, { useState, useContext } from 'react';
import { Context } from '../Context.js';

const Article = ({ author, content, desc, date, source, title, url, img }) => {
    const { activeUserObj } = useContext(Context);
    const [contentShown, setContentShown] = useState(false);
    const slicedDate = date.slice(0, 10);
    const slicedContent = content ? content.slice(0, content.length - 14) : 'N/A';
    let isAlreadySaved;

    const toggleContentShown = () => {
        setContentShown(!contentShown);
    }

    const toggleSavedAlert = () => {
        alert('You have already saved this article to favourites');
    }

    const checkIfAlreadySaved = () => {
        isAlreadySaved = activeUserObj.favourites.find(curr => curr.title === title);
    }

    const saveToFavourites = () => {
        activeUserObj.favourites.push(
            {
                auth: author,
                cont: content,
                descr: desc,
                dat: date,
                src: source,
                title: title,
                url: url,
                image: img
            }
        )
    }

    const saveToFavouritesOnClick = () => {
        checkIfAlreadySaved();

        isAlreadySaved ? toggleSavedAlert() : saveToFavourites();
    }

    return (
        <div className='article column'>
            <div className='article__main row' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,1)),url('${img}')`}}>
                <div className='article__titles column'>
                    <h1 className='article__h1'>{title}</h1>

                    <h2>Written by {author} at {source} &ndash; {slicedDate}</h2>

                    <h3>{desc}</h3>

                    <button onClick={toggleContentShown}>{contentShown ? 'View Less' : 'View More'}</button>
                </div> 
            </div> 

            <div className={contentShown ? 'article__content column' : 'hidden'}>
                <p className='article__p'>{slicedContent}</p>

                <button onClick={saveToFavouritesOnClick}>Save to Favourites</button>

                <a href={`${url}`} className='article__a transition'>Read the full article &ndash; {url}</a>
            </div>
        </div>
    )
}

export default Article;