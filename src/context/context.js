import React, { useEffect, useState } from "react";
import {
    refreshAccessToken,
    googleOAuth,
    loginUser,
    getUserFromToken,
    logoutUser,
    passwordReset,
    setNewPassword,
    registerUser,
    getTwitterUrl,
    saveTwitterUser,
    deleteTwitterUser,
    getRedditUrl,
    saveRedditUser,
    deleteRedditUser
} from "../server/server";

import { checkAccessTokenExpire, checkRefreshTokenExpire } from "../utils/access";
import Local from "../utils/local";
import Notification from "../utils/notification";

const Context = React.createContext();

const ContextProvider = ({children}) => {

    // app states
    const [defaultUrl, setDefaultUrl] = useState(null);
    const [show, setShow] = useState(false);
    const [getCurrentUser, setGetCurrentUser] = useState(false);
    const [refresh, setRefresh] = useState(false);

    // twitter states
    const [twitterLoading, setTwitterLoading] = useState(false);
    const [twitterOAuth ,setTwitterOAuth] = useState(null);
    const [twitterVerifier, setTwitterVerifier] = useState(null);
    const [twitterImage, setTwitterImage] = useState("twitter-black.png");
    const [twitterAddSuccess, setTwitterAddSuccess] = useState(false);

    // reddit states
    const [redditLoading, setRedditLoading] = useState(false);
    const [redditCode, setRedditCode] = useState(null);    
    const [redditImage, setRedditImage] = useState("reddit-black.png");
    const [redditAddSuccess, setRedditAddSuccess] = useState(false);

    // instagram states
    const [instagramImage, setInstagramImage] = useState("insta-black.png");

    useEffect(() => {
        let url = process.env.REACT_APP_DEFAULT_API_URL
        setDefaultUrl(url);
        async function getUser() {
            let tokens = Local.getToken();
            tokens && await getUserFromToken(tokens?.access)
            .then(data => {
                if (data?.status === 401) {
                    Local.logout()
                }
                let {username, email, profile_pic, twitter, reddit} = data;
                profile_pic = url + profile_pic;
                data = {username, email, profile_pic, twitter, reddit};
                setGetCurrentUser(data)
            }).catch(e => {
                Local.logout();
                return e;
            })
        }
        getUser();
    }, [refresh])

    useEffect(()=>{
        let tokens = Local.getToken();
        async function TwitterUser (oauth_token, oauth_verifier){
            let data = { oauth_token, oauth_verifier }
            setTwitterLoading(true);
            let response = await saveTwitterUser(data, tokens?.access);
            setTwitterLoading(false);
            response?.success && setRefresh(!refresh);
            response?.data?.error && Notification("fail",`${response?.data?.error}`,"danger",5000)
            setTwitterAddSuccess(true);
            return response;
        }
        twitterOAuth && twitterVerifier && TwitterUser(twitterOAuth, twitterVerifier);
    }, [twitterOAuth, twitterVerifier]);

    useEffect(()=>{
        let tokens = Local.getToken();
        async function RedditUser (code){
            let data = { code };
            setRedditLoading(true);
            let response = await saveRedditUser(data, tokens?.access);
            setRedditLoading(false);
            response?.success && setRefresh(!refresh);
            response?.data?.error && Notification("fail",`${response?.data?.error}`,"danger",5000);
            setRedditAddSuccess(true);
            return response;
        }
        redditCode && RedditUser(redditCode);
    }, [redditCode]);

    return (
        <Context.Provider value={{
            defaultUrl , refreshAccessToken, googleOAuth, loginUser, passwordReset,
            logoutUser, registerUser, getTwitterUrl, saveTwitterUser, setNewPassword,
            checkRefreshTokenExpire, checkAccessTokenExpire, show, setShow, getCurrentUser,
            refresh, setRefresh, twitterLoading, setTwitterLoading, setTwitterOAuth, setTwitterVerifier,
            twitterImage, setTwitterImage, getRedditUrl, twitterAddSuccess, redditLoading, setRedditCode,
            redditImage, redditAddSuccess, setRedditLoading, setRedditImage, deleteTwitterUser,
            deleteRedditUser, instagramImage, setInstagramImage
        }}>{children}</Context.Provider>
    )
}

export {
    Context,
    ContextProvider
}
