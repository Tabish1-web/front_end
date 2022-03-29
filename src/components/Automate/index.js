import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import InstagramDM from "./instagram";
import RedditDM from "./reddit";
import TwitterDM from "./twitter";

function Automate() {
    const { getCurrentUser } = useContext(Context);    
    
    const [reddit,setReddit] = useState("reddit-black.png");
    const [twitter,setTwitter] = useState("twitter-black.png");
    const [instagram,setInstagram] = useState("insta-black.png");
    const [instagramDM, setInstagramDM] = useState(false);
    const [redditDM, setRedditDM] = useState(false);
    const [twitterDM, setTwitterDM] = useState(false);

    const currentUser = getCurrentUser;
    
    useEffect(() => {
    if (currentUser?.instagram){
        setInstagram("insta-color.png");
        setInstagramDM(true)
    }
    else if (currentUser?.reddit){
        setReddit("reddit-color.png");
        setRedditDM(true);
    }
    else if (currentUser?.twitter){
        setTwitter("twitter-color.png")
        setTwitterDM(true) 
    }
    }, [currentUser])

    return(
        <>
        <div className="row mb-5">
            <div className="col-2 col-lg-4 col-md-4"></div>
            <div className="col-8 col-lg-6 col-md-6">
                <div className="row">
                    <div className="col-4 col-lg-2 col-md-2">
                        <div className="icon-box">
                             <Link to={"#"} onClick={()=>{
                                setReddit("reddit-black.png");
                                setTwitter("twitter-black.png");
                                setInstagram(currentUser?.instagram ? "insta-color.png" : "insta-black.png");
                                setInstagramDM(currentUser?.instagram && true);
                                setRedditDM(false);
                                setTwitterDM(false);
                            }}>
                                <img src={"assets/img/" + instagram} alt="instagram"/>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4 col-lg-2 col-md-2">
                        <div className="icon-box">
                            <Link to={"#"} onClick={()=>{
                                setReddit(currentUser?.reddit ? "reddit-color.png" : "reddit-black.png");
                                setTwitter("twitter-black.png");
                                setInstagram("insta-black.png");
                                setInstagramDM(false);
                                setRedditDM(currentUser?.reddit && true);
                                setTwitterDM(false);
                            }}>
                                <img src={"assets/img/" + reddit} alt="reddit"/>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4 col-lg-2 col-md-2">
                        <div className="icon-box">
                           <Link to={"#"} onClick={()=>{
                                setReddit("reddit-black.png");
                                setTwitter(currentUser?.twitter ? "twitter-color.png" : "twitter-black.png");
                                setInstagram("insta-black.png");
                                setInstagramDM(false);
                                setRedditDM(false);
                                setTwitterDM(currentUser?.twitter && true);
                            }}>
                                <img src={"assets/img/" + twitter} alt="twitter"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2 col-lg-2 col-md-2"></div>
        </div>
        {instagramDM && <InstagramDM/>}
        {redditDM && <RedditDM/>}
        {twitterDM && <TwitterDM/>}
        </>
    );
}

export default Automate;