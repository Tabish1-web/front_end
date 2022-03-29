import React, { useContext, useEffect } from "react";
import { Context } from "../../context/context";
import Local from "../../utils/local";
import useQuery from "../../hooks/query";
import FacebookLogin from 'react-facebook-login';

function AddSocial(){
    const {
        refresh,
        setRefresh,
        getCurrentUser, 
        getTwitterUrl, 
        twitterLoading, 
        setTwitterLoading,
        setTwitterOAuth, 
        setTwitterVerifier, 
        twitterImage,
        setTwitterImage,
        getRedditUrl, 
        redditLoading, 
        setRedditCode,
        redditImage, 
        setRedditImage,
        setRedditLoading,
        deleteTwitterUser,
        deleteRedditUser,
        instagramImage,
    } = useContext(Context);
    
    let currentToken = Local.getToken();
    let currentUser = getCurrentUser;
    let query = useQuery();

    currentUser?.twitter ? setTwitterImage("twitter-color.png") : 
        setTwitterImage("twitter-black.png");
    currentUser?.reddit ? setRedditImage("reddit-color.png") : 
        setRedditImage("reddit-black.png");
    
    // twitter
    useEffect(() => {
        let oauth_token =  query.get("oauth_token");
        let oauth_verifier = query.get("oauth_verifier");
        oauth_token && setTwitterOAuth(oauth_token);
        oauth_verifier && setTwitterVerifier(oauth_verifier);
    }, [query, setTwitterOAuth, setTwitterVerifier]);
    
    // reddit
    useEffect(() => {
        let code =  query.get("code");
        code && setRedditCode(code);
    }, [query, setRedditCode]);

    // instagram
    function responseFacebook(res){
        console.log(res);
    }

    return (
    <>  
    
    <div className="row mt-5">
        <div className="col-md-1"></div> 
        
        {/* instagram */}
        <div className="new-product-box col-md-2 ml-5 mr-5">
            <FacebookLogin
                appId="457666616014050"
                autoLoad={true}
                scope="instagram_basic,instagram_content_publish,pages_read_engagement,
                    pages_show_list,instagram_manage_insights,instagram_manage_comments"
                callback={responseFacebook}
                cssClass="badge badge-pill badge-outline-green"
                version="13.0"
                textButton="add"
            />
            <p></p>
            <div>
                <img src={"assets/img/" + instagramImage} alt="instagram"/>
            </div>        
        </div>
        {/* end instagram */}

        {/* reddit */}
        <div className="new-product-box col-md-2 ml-5 mr-5">
            {redditLoading ? <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
            </div> : currentUser?.reddit ?
            <button type="button" className="badge badge-pill badge-outline-green" 
                onClick={async () => {
                    setRedditLoading(true);
                    await deleteRedditUser(currentToken?.access);
                    setRedditLoading(false);
                    setRefresh(!refresh);
                }}>remove</button> :
            <button type="button" className="badge badge-pill badge-outline-green" 
                onClick={async () => {
                    setRedditLoading(true);
                    let response = await getRedditUrl(currentToken?.access);
                    setRedditLoading(false);
                    let {url} = response
                    window.location.href = url;
                }
                }>add</button>}
            <p></p>
            <div>
                <img src={"assets/img/" + redditImage} alt="reddit"
                    title={currentUser?.reddit ? currentUser.reddit.user_reddit_name : ""}/>
            </div>        
        </div>
        {/* end reddit */}

        {/* twitter */}
        <div className="new-product-box col-md-2 ml-5 mr-5">
            {twitterLoading ? <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
            </div> : currentUser?.twitter ?
            <button type="button" className="badge badge-pill badge-outline-green" 
                onClick={async () => {
                    setTwitterLoading(true);
                    await deleteTwitterUser(currentToken?.access);
                    setTwitterLoading(false);
                    setRefresh(!refresh);
                }}>remove</button> :
            <button type="button" className="badge badge-pill badge-outline-green" 
                onClick={async () => {
                    setTwitterLoading(true);
                    let response = await getTwitterUrl(currentToken?.access);
                    setTwitterLoading(false);
                    let {url} = response
                    window.location.href = url;
                }
                }>add</button>}
            <p></p>
            <div>
                <img src={"assets/img/" + twitterImage} alt="twitter" 
                    title={currentUser?.twitter ? currentUser.twitter.twitter_name : ""}/>
            </div>        
        </div>
        {/* end twitter */}

        <div className="col-md-5"></div> 
    </div>
    </>  
    )
}

export default AddSocial;