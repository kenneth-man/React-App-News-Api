import React, { useContext } from 'react';
import { Context } from '../Context.js';
import Article from './Article.js';

const Top = () => {
    const { loggedIn, topArticles, setTopArticlesCateg } = useContext(Context);

    const searchBtnOnClick = () => {
        const selectedCategory = document.querySelector('.top__search').value;
        setTopArticlesCateg(selectedCategory);
    }

    return (
        <div className={loggedIn ? 'top content column' : 'content not-logged-in'}>
            <h1 className='top__title'>Global Top Articles</h1>

            <div className='top__search-row row'>
                <select class="top__search round center transition">
                    <optgroup>
                        <option value="placeholder" selected>Select a category</option>
                        <option disabled value="">__________</option>
                    </optgroup>

                    <optgroup label="Categories">
                        <option value="business">Business</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="general">General</option>
                        <option value="health">Health</option>
                        <option value="science">Science</option>
                        <option value="sports">Sports</option>
                        <option value="technology">Technology</option>
                    </optgroup>
                </select>

                <button onClick={searchBtnOnClick}>Search</button>
            </div>

            {
                topArticles.length === 0 ? 
                <h1>No Articles to be shown</h1> : 
                topArticles.map((curr, index) => 
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

export default Top;