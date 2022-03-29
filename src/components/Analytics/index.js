import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Reddit from "./reddit";
import Twitter from "./twitter";
import { Context } from "../../context/context";
import { Post } from "../../context/post";
import Local from "../../utils/local";

function Analytics() {
    
    const { getCurrentUser } = useContext(Context);

    let { getTweetsData, getRedditsData} = useContext(Post);

    const [reddit,setReddit] = useState("reddit-black.png");
    const [twitter,setTwitter] = useState("twitter-black.png");
    const [instagram,setInstagram] = useState("insta-black.png");
    const [showReddit, setShowReddit] = useState(false);
    const [showTwitter, setShowTwitter] = useState(false);
    const [showInstagram, setShowInstagram] = useState(false);
    const [data, setData] = useState([]);
    const [content, setContent] = useState(false);
    const [previousLoading, setPreviousLoading] = useState(false);
    const [nextLoading, setNextLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    let currentUser = getCurrentUser;

    useEffect(() => {
    if (currentUser?.instagram){
        setInstagram("insta-color.png");
        setShowInstagram(true);
    }
    else if (currentUser?.reddit){
        setReddit("reddit-color.png");
        setShowReddit(true);
    }
    else if (currentUser?.twitter){
        setTwitter("twitter-color.png")
        setShowTwitter(true);
    }
    }, [currentUser])

    let apiUrl = process.env.REACT_APP_DEFAULT_API_URL;
    let tokens = Local.getToken();

    useEffect(() => {
        async function RedditData(access){
            let RedditUrl = apiUrl + `/api/post/get/reddit/posts?analytics=true`;
            setLoading(true);
            let responseData = await getRedditsData(RedditUrl, access);
            setLoading(false);
            setContent(Boolean(responseData?.results?.length));
            setData(responseData);
        }
        async function twitterData(access){
            let TwitterUrl = apiUrl + `/api/post/get/twitter/tweets?analytics=true`
            setLoading(true);
            let responseData = await getTweetsData(TwitterUrl, access);
            setLoading(false);
            setContent(Boolean(responseData?.results?.length));
            setData(responseData);
        }
        function instagramData(){
            setContent(false);
            setData([]);
        }
        let access = tokens?.access

        showReddit && RedditData(access);
        showTwitter && twitterData(access);
        showInstagram && instagramData();
    }, [showReddit, showTwitter, showInstagram])

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
                                setTwitter("twitter-black.png")
                                setInstagram(currentUser?.instagram ? "insta-color.png" : "insta-black.png");
                                setShowInstagram(true);
                                setShowReddit(false);
                                setShowTwitter(false);
                                setContent(false);
                                setData([]);
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
                                setShowReddit(currentUser?.reddit && true);
                                setShowTwitter(false);
                                setShowInstagram(false);
                                setContent(false);
                                setData([]);
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
                                setShowTwitter(currentUser?.twitter && true);
                                setShowReddit(false);
                                setShowInstagram(false);
                                setContent(false);
                                setData([]);
                            }}>
                                <img src={"assets/img/" + twitter} alt="twitter"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2 col-lg-2 col-md-2"></div>
        </div>
        <div className="container posts-content">
            <div className="row">
                {showReddit && data?.results?.map((item, index) => {
                    return item?.status !== "P" && <Reddit key={index} data={item} />
                })}
                {showTwitter && data?.results?.map((item, index) => {
                    return item?.status !== "P" && <Twitter key={index} data={item} />
                })}
            </div>   
        </div> 
        {!content && !loading && <h4 className="mt-4" style={{"textAlign":"center", "opacity" : "0.50"}}
             > No Analytics Data </h4>}
        {loading && <div className="mt-4" style={{"textAlign":"center", "opacity" : "0.50"}}
             > <div className="spinner-border mb-4" role="status">
                <span className="sr-only">Loading...</span></div> </div>}
        {content && <nav className="d-flex justify-content-center mb-5 mt-5">
            <ul className="pagination">
                <li className="page-item">
                    {previousLoading ? <Link className="page-link" to={"#"}><div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div></Link> : <Link className="page-link" to={"#"} onClick={async () => {
                        if(data?.previous){
                            let access = tokens?.access
                            if (showReddit) {
                                setPreviousLoading(true);
                                let responseDataReddit = await getRedditsData(
                                    data?.previous + "&analytics=true", access);
                                setPreviousLoading(false);
                                setData(responseDataReddit);
                            } else if (showTwitter){
                                setPreviousLoading(true);
                                let responseDataTwitter = await getTweetsData(
                                    data?.previous + "&analytics=true", access);
                                setPreviousLoading(false);
                                setData(responseDataTwitter);
                            } else if (showInstagram){
                                setData([]);
                            }
                        }
                    }}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </Link>}
                </li>
                <li className="page-item ml-5 mr-5"></li>
                <li className="page-item">
                    {nextLoading ? <Link className="page-link" to={"#"}><div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div></Link> : <Link className="page-link" to={"#"} onClick={async () => {
                        if(data?.next){
                            let access = tokens?.access
                            if (showReddit) {
                                setNextLoading(true);
                                let responseDataReddit = await getRedditsData(
                                    data?.next + "&analytics=true", access);
                                setNextLoading(false);
                                setData(responseDataReddit);
                                setShowTwitter(false);
                                setShowInstagram(false);
                            } else if (showTwitter) {
                                setNextLoading(true);
                                let responseDataTwitter = await getTweetsData(
                                    data?.next + "&analytics=true", access);
                                setNextLoading(false);
                                setData(responseDataTwitter);
                                setShowReddit(false);
                                setShowInstagram(false);
                            } else if (showInstagram) {
                                setData([]);
                                setShowReddit(false);
                                setShowTwitter(false);
                            }
                        }
                    }}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </Link>}
                </li>
            </ul>
        </nav>}
        </>
    );
}

export default Analytics;