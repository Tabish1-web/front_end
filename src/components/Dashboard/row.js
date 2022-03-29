import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import { Post } from "../../context/post";
import Local from "../../utils/local";
import Notification from "../../utils/notification";

function Row(props) {
    let {item, state, handleSrc, handleDelete, setEditId} = props;
    
    let { deleteTweet, deleteReddit } = useContext(Post);

    let [deleteLoading, setDeleteLoading] = useState(false);

    let tokens = Local.getToken();

    function setDateTime(date){
        let newDate = Date.parse(date);
        let nD = new Date(newDate);
        let newDateString = nD.toLocaleString("en-US");
        return newDateString;
    }

    function createFullUrl(media){
        let apiUrl = process.env.REACT_APP_DEFAULT_API_URL;
        let newUrl = apiUrl + media;
        return newUrl;
    }

    return (
        <>
        <tr>
            <td className="name">
                {item?.media?.media_type === "video" && 
                    <img src="assets/img/play-button.png" alt="post" title="video" data-toggle="modal" 
                        data-target="#myModal" style={{"cursor":"pointer"}} onClick={()=>{
                            handleSrc(createFullUrl(item?.media?.file));
                        }} />}
                {item?.media?.media_type === "image" && 
                    <img src={createFullUrl(item?.media?.file)} alt="media" title="image" data-toggle="modal"/>}
                {!item?.media && <img src="assets/img/no-media.jpeg" alt="media" title="image" data-toggle="modal"/>}
                {state === "reddit" && item?.title}
                {state === "twitter" && item?.tweet}
            </td>
            <td>{setDateTime(item?.post_time)}</td>
            <td>
                {item?.status === "C" && <span className="badge badge-primary">Complete</span>}
                {item?.status === "P" && <span className="badge badge-danger">Pending</span>}
                </td>
            <td>
                <div className="todo-item-action">
                    {state ==="reddit" && <Link to={""} className="edit" data-toggle="modal" data-target="#editModal"
                        onClick={()=>setEditId(item?.id)}><i className='bx bx-edit-alt mr-3'></i></Link>}
                    {deleteLoading ? <div className="spinner-border spinner-border-sm" role="status"><span 
                        className="sr-only">Loading...</span></div> :
                    <Link to={""} className="delete" onClick={async () => {
                        let access = tokens?.access
                        switch (state){
                            case "twitter":
                                setDeleteLoading(true);
                                let tweetDelete = await deleteTweet(item?.id, access);
                                setDeleteLoading(false);
                                handleDelete();
                                tweetDelete.status === 204 && Notification("success",`${state} post successfully deleted`,"success",3000);
                                break;
                            case "reddit":
                                setDeleteLoading(true);
                                let redditDelete = await deleteReddit(item?.id, access);
                                setDeleteLoading(false)
                                handleDelete();
                                redditDelete.status === 204 && Notification("success",`${state} post successfully deleted`,"success",3000);
                                break;
                            default:
                                break;
                        }
                    }}><i className='bx bx-trash'></i></Link>}
                    </div>
            </td>
        </tr>
        </>
    )
}

export default Row;

