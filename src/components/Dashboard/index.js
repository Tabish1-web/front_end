import React, { useState, useContext, useEffect } from "react";
import Table from "./table";
import { Link } from "react-router-dom";
import {Context} from "../../context/context"

function Dashboard(){
    
    const { getCurrentUser } = useContext(Context);

    const [reddit,setReddit] = useState("reddit-black.png");
    const [twitter,setTwitter] = useState("twitter-black.png");
    const [instagram,setInstagram] = useState("insta-black.png");
    const [showTable, setShowTable] = useState(null);
    const [show, setShow] = useState(false);

    const currentUser = getCurrentUser;
    
    useEffect(() => {
    if (currentUser?.instagram){
        setInstagram("insta-color.png");
        setShowTable("instagram");
        setShow(true);
    }
    else if (currentUser?.reddit){
        setReddit("reddit-color.png");
        setShowTable("reddit");
        setShow(true);
    }
    else if (currentUser?.twitter){
        setTwitter("twitter-color.png")
        setShowTable("twitter");
        setShow(true); 
    }
    }, [currentUser])
    return (
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
                                setShowTable(currentUser?.instagram && "instagram");
                                setShow(currentUser?.instagram ? true : false)
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
                                setShowTable(currentUser?.reddit && "reddit");
                                setShow(currentUser?.reddit ? true : false)
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
                                setShowTable(currentUser?.twitter && "twitter");
                                setShow(currentUser?.twitter ? true : false)
                            }}>
                                <img src={"assets/img/" + twitter} alt="twitter"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-2 col-lg-2 col-md-2"></div>
        </div>
        {show && <Table state={showTable}/>}
        </>
    )
}

export default Dashboard;