import React, {useContext, useState} from "react";
import { Post } from "../../context/post";
import { Context } from "../../context/context";
import Local from "../../utils/local";
import Notification from "../../utils/notification";

function RedditDM(){
    
    let { addRedditMessage } = useContext(Post);
    let { getCurrentUser } = useContext(Context);
    
    let userMessage = getCurrentUser?.reddit?.direct_message?.message || "";
    let userPause = getCurrentUser?.reddit?.direct_message?.pause;

    let [pause, setPause] = useState(userPause);
    let [message, setMessage] = useState(userMessage);
    let [saveLoading, setSaveLoading] = useState(false);
    let [pauseLoading, setPauseLoading] = useState(false);
   
    let tokens = Local.getToken();

    async function RedditMessageData(pause) {
        let data = {pause, message};
        let access  = tokens?.access;
        let response = await addRedditMessage(data, access);
        response?.message && setMessage(response?.message);
        response?.message && setPause(response?.pause);
        return response;
    }

    return (
    <>
    <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <div className="ecommerce-stats-area">
                <div className="form-group mb-5">
                    <textarea className="form-control" rows={10} placeholder="Write You Message"
                        value={message} onChange={(e) => setMessage(e?.target?.value)}></textarea>
                </div>
                <div className="text-center form-group mr-5 ml-5 mt-5">
                    <div className="row">
                        {pauseLoading ? <div className="col-md-4 mt-2"><div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                        </div></div> :
                        <button type="button" className={(pause ? 
                            "btn-primary" : "btn-outline-primary") + " btn col-md-4"}
                        onClick={async () => {
                            setPauseLoading(true);
                            let response = await RedditMessageData(!pause);
                            setPauseLoading(false);
                            response?.message && Notification("success", `message ${pause ? "resume" : "pause"} successfully`, 
                                "success", 2000);
                        }}>{pause ? "Resume" : "Pause"}</button>}
                        <div className="col-md-4"></div>
                        {saveLoading ? <div className="col-md-4 mt-2"> <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                        </div></div> :
                        <button type="button" className="btn btn-outline-primary col-md-4"
                        onClick={async () => {
                            setSaveLoading(true);
                            let response = await RedditMessageData(pause);
                            setSaveLoading(false);
                            response?.message && Notification("success", "message saved successfully", 
                                "success", 2000);
                        }} >Save</button>}
                    </div>
                </div>
            </div>
            </div>
        <div className="col-md-2"></div>
    </div>
    </>
    )
}

export default RedditDM;