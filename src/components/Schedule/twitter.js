import React, { useContext, useState } from "react";
import { Post } from "../../context/post";
import Notification from "../../utils/notification";
import DateTimePicker from 'react-datetime-picker';
import "./upload.css"

import Local from "../../utils/local"

function TwitterForm(){
    const [tweet, setTweet] = useState("");
    const [comment, setComment] = useState("");
    const [file, setFile] = useState(null);
    const [loadingPostNow, setLoadingPostNow] = useState(false);
    const [loadingSchedule, setLoadingSchedule] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [value, setValue] = useState(new Date());

    const { createMedia, createTweetData } = useContext(Post);    
    const tokens = Local.getToken();

    async function handleSubmit(){

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
        const data = {tweet, comment, mediaId, postOn};
        schedule ? setLoadingSchedule(true) : setLoadingPostNow(true);
        const tweetData = await createTweetData(data, access);
        schedule ? setLoadingSchedule(false) : setLoadingPostNow(false);
        console.log(tweetData);
        if (tweetData?.status === 201){
            Notification("success", "post on twitter successfully", "success", 5000);
        } else if(tweetData?.data?.data?.tweet){
            Notification("fail", "tweet must be unique text ","danger", 5000);
        } else {
            Notification("fail", String(tweetData?.data?.data), "danger", 5000); 
        }
        setTweet(""); setComment(""); setFile(null); setValue(new Date());
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
                    <textarea className="form-control" rows={10} placeholder="Write a tweet"
                        value={tweet} onChange={(e) => setTweet(e?.target?.value)}></textarea>
                </div>
                <div className="form-group files mb-5">                    
                    <input type="file" className="form-control" id="upload-file"
                        onChange={(e) => setFile(e?.target?.files[0])}/>
                </div>
                <div className="form-group">
                    <input type={"text"} className="form-control" placeholder="Add a comment(optional)"
                      value={comment} onChange={(e) => setComment(e?.target?.value)}/>
                </div>
                <div className="mr-5 ml-5">
                <div className="text-center form-group mr-5 ml-5 mt-5" style={{"paddingBottom":"20px"}}>
                    {loadingPostNow ? <div className="spinner-border mb-4" role="status">
                    <span className="sr-only">Loading...</span></div> :
                    <button type="button" className="btn btn-outline-primary mb-4 col-12"
                    disabled={!tweet} onClick={handleSubmit}>Post Now</button>}
                    
                    {schedule ? loadingSchedule ? <div className="spinner-border mb-4" role="status">
                    <span className="sr-only">Loading...</span></div> : <div><DateTimePicker onChange={setValue} value={value} className="mb-3"/>
                    <button type="button" className="btn btn-primary col-12" 
                    onClick={async ()=>{
                        await handleSubmit();
                        setSchedule(false);
                    }} >submit</button></div> :
                    <button type="button" className="btn btn-primary col-12" 
                    onClick={ () => setSchedule(true) } disabled={!tweet} > Schedule Later </button>}
                </div>
                </div>
            </div>
            </div>
        <div className="col-md-2"></div>
    </div>
    </>
    )
}

export default TwitterForm