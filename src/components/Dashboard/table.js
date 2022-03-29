import React, {useContext, useEffect, useState} from "react";
import Row from "./row";
import { Post } from "../../context/post";
import Local from "../../utils/local";
import { Link } from "react-router-dom";
import EditModel from "./edit";

function Table(props){
    let {state} = props
    
    let { getTweetsData, getRedditsData,
        getRedditData } = useContext(Post);
        
    const [data, setData] = useState([]);
    const [url, setUrl] = useState("");
    const [previousLoading, setPreviousLoading] = useState(false);
    const [nextLoading, setNextLoading] = useState(false);
    const [content, setContent] = useState(false);
    const [update, setUpdate] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState(null);

    let tokens = Local.getToken();
    
    let apiUrl = process.env.REACT_APP_DEFAULT_API_URL;
    
    function handleDelete(){
        setUpdate(!update);
    }

    useEffect(() => {
        async function RedditData(access){
            let RedditUrl = apiUrl + `/api/post/get/reddit/posts`;
            let responseData = await getRedditsData(RedditUrl, access);
            setContent(Boolean(responseData?.results?.length));
            setData(responseData);
        }
        async function twitterData(access){
            let TwitterUrl = apiUrl + `/api/post/get/twitter/tweets`
            let responseData = await getTweetsData(TwitterUrl, access);
            setContent(Boolean(responseData?.results?.length));
            setData(responseData);
        }
        let access = tokens?.access
        switch (state){
            case "instagram":
                break
            case "reddit":
                RedditData(access);
                break
            case "twitter":
                twitterData(access);
                break;
            default:
                setData([]);
        }
    }, [state, update])
    
    function handleSrc(url){
        setUrl(url);
    }
    
    useEffect(() => {
        let access = tokens?.access;
        async function redditData () {
            let response = await getRedditData(editId, access);
            setEditData(response?.data);
        }
        state === "reddit" && editId && redditData()
    }, [state, editId])

    return(
    <div>
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal" 
                            aria-label="Close" onClick={()=>{
                                setUrl("");
                            }}>
                            <span aria-hidden="true">&times;</span>
                        </button>        
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" title="video" className="embed-responsive-item" src={url} id="video"  allowscriptaccess="always" allow="autoplay"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <EditModel state={state} editData={editData} addEditId={setEditId}/>
        <div className="row">
            <div className="col-lg-12 col-md-12">
                <div className="card recent-orders-box mb-30">
                        <h3 style={{"textAlign" : "center"}}>{state}</h3>
                    <div className="card-header d-flex justify-content-between align-items-center">
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            {state === "instagram" && "Caption"}
                                            {state === "reddit" && "Title"}
                                            {state === "twitter" && "Tweet"}
                                        </th>
                                        <th>Post Time</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.results?.map((item,index) => {
                                        return <Row key={index} item={item} state={state} 
                                            handleSrc={handleSrc} handleDelete={handleDelete}
                                            setEditId={setEditId}
                                            />
                                    })
                                    }
                                </tbody>
                            </table>
                            {!content && <h6 className="mt-4" style={{"textAlign":"center", "opacity" : "0.50"}}
                                    >Stay Connected With OnlyGrow</h6>}
                        </div>
                    </div>
                </div>
                {content && <nav className="d-flex justify-content-center mt-5 mb-5">
                    <ul className="pagination">
                        <li className="page-item">
                            {previousLoading ? <Link className="page-link" to={""}><div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div></Link> : <Link className="page-link" to={""} onClick={async () => {
                                if(data?.previous){
                                    let access = tokens?.access
                                    switch (state){
                                        case "reddit":
                                            setPreviousLoading(true);
                                            let responseDataReddit = await getRedditsData(
                                                data?.previous, access);
                                            setPreviousLoading(false);
                                            setData(responseDataReddit);
                                            break
                                        case "twitter":
                                            setPreviousLoading(true);
                                            let responseDataTwitter = await getTweetsData(
                                                data?.previous, access);
                                            setPreviousLoading(false);
                                            setData(responseDataTwitter);
                                            break
                                        default:
                                            setData([]);
                                    }
                                }
                            }}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </Link>}
                        </li>
                        <li className="page-item ml-5 mr-5 mt-1"><p style={{"fontWeight":"bolder"}}>ALL({data?.count})</p></li>
                        <li className="page-item">
                            {nextLoading ? <Link className="page-link" to={""}><div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div></Link> : <Link className="page-link" to={""} onClick={async () => {
                                if(data?.next){
                                    let access = tokens?.access
                                    switch (state){
                                        case "reddit":
                                            setNextLoading(true);
                                            let responseDataReddit = await getRedditsData(
                                                data?.next, access);
                                            setNextLoading(false);
                                            setData(responseDataReddit);
                                            break
                                        case "twitter":
                                            setNextLoading(true);
                                            let responseDataTwitter = await getTweetsData(
                                                data?.next, access);
                                            setNextLoading(false);
                                            setData(responseDataTwitter);
                                            break
                                        default:
                                            setData([]);
                                    }
                                }
                            }}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </Link>}
                        </li>
                    </ul>
                </nav>}
            </div>
        </div>
    </div>
    )
}

export default Table