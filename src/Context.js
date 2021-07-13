import React, { createContext, useEffect, useState, useRef } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [activeUserName, setActiveUserName] = useState('');
    const [activeUserCountry, setActiveUserCountry] = useState('');
    const [activeUserObj, setActiveUserObj] = useState('');
    const [rdmHomeArticles, setRdmHomeArticles] = useState([]);
    const [rdmHomeArticlesPrevIdx, setRdmHomeArticlesPrevIdx] = useState([]);
    const [countryArticles, setCountryArticles] = useState([]);
    const [recentArticles, setRecentArticles] = useState([]);
    const [topArticles, setTopArticles] = useState([]);
    const [topArticlesCateg, setTopArticlesCateg] = useState('');
    const isCountryArticlesInit = useRef(false);
    const isTopArticlesChosen = useRef(false);
    const key = 'ec4082f1686b4213a550dbb8ccae1a69';

    const toggleLoggedIn = () => {
        setLoggedIn(!loggedIn);
    }

    const addUser = (userObj) => {
        setAllUsers([...allUsers, userObj]);
    }

    //update 'activeUserObj' whenever changes are made to a particular user data obj (without this, components would only have access to outdated activeUserObj before changes)
    const updateActiveUserObj = () => {
        setActiveUserObj(allUsers.find(curr => curr.username === activeUserName));
    }

    const fetchArticleFromRandom = async () => {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=from=2021-01-01&sortBy=popularity&apiKey=${key}`);
            const data = await response.json();
            const rdmNum = Math.round(Math.random() * data.articles.length);

            //preventing repeat articles being displayed; if there would be a duplicate, call this function again and exit the current
            if(rdmHomeArticlesPrevIdx.includes(rdmNum)){
                fetchArticleFromRandom();
                return;
            }

            //add index of article to 'rdmHomeArticlesPrevIdx' and add that article to 'rdmHomeArticles'
            setRdmHomeArticlesPrevIdx([...rdmHomeArticlesPrevIdx, rdmNum]);
            setRdmHomeArticles([...rdmHomeArticles, data.articles[rdmNum]]);
        } catch (error){
            console.log(error);
        }   
    }

    const fetchArticlesFromCountry = async (countryCode) => {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${key}`);
            const data = await response.json();
            setCountryArticles(data.articles);
        } catch(error){
            console.log(error);
        }
    }

    const fetchArticlesFromRecent = async () => {
        try {
            const today = new Date();
            //'getDate()' returns an int; convert to string to be able to use 'padStart()'
            const day = String(today.getDate()).padStart(2, '0');
            //january returns a 0
            const month = String(today.getDate() + 1).padStart(2, '0');
            const year = String(today.getFullYear());

            const response = await fetch(`https://newsapi.org/v2/everything?q=from=${year}-${month}-${day}&sortBy=popularity&apiKey=${key}`);
            const data = await response.json();
            setRecentArticles(data.articles);
        } catch(error){
            console.log(error);
        }
    }

    const fetchArticlesFromTop = async (category) => {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${key}`);
            const data = await response.json();
            setTopArticles(data.articles);
        } catch(error){
            console.log(error);
        }
    }


    //getting 3 random articles to be shown on 'Home' page component
    useEffect(() => {
        if(rdmHomeArticles.length < 3) 
            fetchArticleFromRandom();
    }, [rdmHomeArticles])

    useEffect(() => {
        updateActiveUserObj();
    }, [activeUserName, activeUserObj])

    //cannot put e.g. ...[activeUserObj.country] because 'activeUserObj' does not contain data from the active user before they've created an account
    useEffect(() => {
        if(isCountryArticlesInit.current){
            fetchArticlesFromCountry(activeUserCountry);
        } else {
            isCountryArticlesInit.current = true;
        }
    }, [activeUserCountry])

    useEffect(() => {
        fetchArticlesFromRecent();
    }, [])

    useEffect(() => {
        if(isTopArticlesChosen.current){
            fetchArticlesFromTop(topArticlesCateg);
        } else {
            isTopArticlesChosen.current = true;
        }
    }, [topArticlesCateg])
    
    return (
        <Context.Provider value={{ loggedIn, allUsers, activeUserName, activeUserObj, rdmHomeArticles, countryArticles, recentArticles, topArticles, 
                            setActiveUserName, setActiveUserCountry, toggleLoggedIn, addUser, fetchArticlesFromCountry, setTopArticlesCateg }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;