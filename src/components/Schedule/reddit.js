import React, { useState, useContext } from "react";
import Local from "../../utils/local";
import { Post } from "../../context/post";
import Notification from "../../utils/notification";
import DateTimePicker from 'react-datetime-picker';
import "./upload.css"

function RedditForm(){
    const [title, setTitle] = useState("");
    const [subReddit, setSubReddit] = useState("");
    const [link, setLink] = useState("");
    const [body, setBody] = useState("");
    const [comment, setComment] = useState("");
    const [nsfw, setNsfw] = useState(false);
    const [file, setFile] = useState(null);
    const [loadingPostNow, setLoadingPostNow] = useState(false);
    const [loadingSchedule, setLoadingSchedule] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [value, setValue] = useState(new Date());

    const { createMedia, createRedditData } = useContext(Post);  
    const tokens = Local.getToken();

    const handleSubmit = async () => {
        // media
        const access = tokens?.access;
        const Media = file && await createMedia(file, access);
        let mediaId = Media?.media_id;

        // schedule a post 
        let postOn = null;
        if (schedule) {
            let currentTime = new Date();
            let seconds = Math.ceil(currentTime.getTime() / 1000);
            let valueSeconds = Math.ceil(value.getTime() / 1000);
            postOn = valueSeconds;
            if (seconds > valueSeconds){
                Notification("fail", "select a schedule time upto current time", "danger", 3000);
                return;
            }
        }

        // post
        const sub_reddit = subReddit;        
        const data = {title, sub_reddit, link, body, comment, nsfw, mediaId, postOn};
        schedule ? setLoadingSchedule(true) : setLoadingPostNow(true);
        const redditData = await createRedditData(data, access);
        schedule ? setLoadingSchedule(false) : setLoadingPostNow(false);
        if (redditData?.status === 201){
            Notification("success", "post on reddit successfully", "success", 5000);
        } else {
            Notification("fail", String(redditData?.data?.data), "danger", 5000); 
        }
        setTitle(""); setSubReddit(""); setLink(""); setBody(""); setComment(""); 
        setNsfw(false); setFile(null); setValue(new Date());
        let upload_file = document.querySelector("#upload-file");
        upload_file.value = "";
    }
    return (
    <>
    <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <div className="ecommerce-stats-area">
                <div className="form-group mb-5">
                    <input type={"text"} className="form-control" placeholder="Title"
                    value={title} onChange={(e) => setTitle(e?.target?.value)}/>
                </div>
                <div className="form-group mb-5">
                    <input type={"text"} className="form-control" placeholder="Subreddit(To crosspost format as such: funny, cats, news)"
                    value={subReddit} onChange={(e) => setSubReddit(e?.target?.value)}/>
                </div>
                <div className="form-group mb-5">
                    <input type={"text"} className="form-control" placeholder="Link(optional)"
                    value={link} onChange={(e) => setLink(e?.target?.value)}/>
                </div>
                <div className="form-group mb-5">
                    <textarea className="form-control" rows={7} placeholder="Body Content"
                    value={body} onChange={(e) => setBody(e?.target?.value)}></textarea>
                </div>
                <div className="form-group files mb-5">                    
                    <input type="file" className="form-control" id="upload-file"
                        onChange={(e) => setFile(e?.target?.files[0])}/>
                </div>
                <div className="row">
                <div className="form-group mb-5 col-md-9">
                    <input type={"text"} className="form-control" placeholder="Add a comment(optional)"
                    value={comment} onChange={(e) => setComment(e?.target?.value)}/>
                </div>
                <div className="col-md-3">
                    <input type={"checkbox"} checked={nsfw}
                    onChange={(e) => setNsfw(e?.target?.checked)}/>
                    <small> Mark as NSFW </small>
                </div>
                </div>
                <div className="mr-5 ml-5">
                <div className="text-center form-group mr-5 ml-5" style={{"paddingBottom":"20px"}}>
                    {loadingPostNow ? <div className="spinner-border mb-4" role="status">
                    <span className="sr-only">Loading...</span></div> :
                    <button type="button" className="btn btn-outline-primary mb-4 col-12"
                    disabled={!title || !subReddit || !body} 
                    onClick={handleSubmit}>Post Now</button>}
                    
                    {schedule ? loadingSchedule ? <div className="spinner-border mb-4" role="status">
                    <span className="sr-only">Loading...</span></div> : <div><DateTimePicker onChange={setValue} value={value} className="mb-3"/>
                    <button type="button" className="btn btn-primary col-12" 
                    onClick={async ()=>{
                        await handleSubmit();
                        setSchedule(false);
                    }} >submit</button></div> :
                    <button type="button" className="btn btn-primary col-12" 
                    onClick={ () => setSchedule(true) } disabled={!title || !subReddit || !body} > Schedule Later </button>}
                </div>
                </div>
                <div className="text-center form-group" >
  
                </div>
            </div>
            </div>
        <div className="col-md-2"></div>
    </div>
    </>
    )
}

export default RedditForm