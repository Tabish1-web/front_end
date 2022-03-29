import React, { useContext, useEffect, useState } from "react";
import { Post } from "../../context/post";
import Local from "../../utils/local";
import Notification from "../../utils/notification";

function EditModel(props){
    const {state, editData, addEditId} = props;
    
    const { editReddit } = useContext(Post);
    
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    // reddit states
    const [redditBodyContent, setRedditBodyContent] = useState("");
    const [comment, setComment] = useState("");

    const tokens = Local.getToken();

    useEffect(() => {
        editData?.id && setEditId(editData?.id);
        editData?.body && setRedditBodyContent(editData?.body);
        editData?.comment && setComment(editData?.comment);
    }, [editData])

    return (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="ModalLabel">{state}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">

                    <form id="ModalForm">
                        <input type="hidden" id="editId" value=""/>
                        {state === "reddit" && 
                        <div className="form-group">
                            <label htmlFor="editTweet">Body Content</label>
                            <textarea className="form-control" id="editContent" value={redditBodyContent}
                                placeholder="Body Content" rows={7} required onChange={(e) => {
                                    setRedditBodyContent(e?.target?.value)
                                }}></textarea>
                        </div>}

                        <div className="form-group">
                            <label htmlFor="editComment">Comment</label>
                            <input type="text" className="form-control" value={comment}
                                id="editComment" placeholder="Write Comment" required onChange={(e) => {
                                    setComment(e?.target?.value);
                                }}/>
                        </div>
                        <div className="modal-footer">
                            <button id="buttonClose" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {loading ? <div className="spinner-border spinner-border-sm ml-5 mr-5" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>:<button type="button"  id="saveModalButton" className="btn btn-primary" 
                                onClick={async (e) => {
                                    let access = tokens?.access
                                    switch (state){
                                        case "reddit":
                                            let updatedRedditData = {redditBodyContent, comment};
                                            setLoading(true);
                                            let response = await editReddit(editId,
                                                updatedRedditData, access);
                                            setLoading(false);
                                            addEditId(null);
                                            response?.status === 201 ? Notification("success",
                                            "reddit post updated successfully","success",3000) :
                                            Notification("fail",`${response?.data?.data}`,"danger",3000);
                                            const modal = document.getElementById("buttonClose");
                                            modal.click()
                                            break;
                                        default:
                                            break;
                                    }
                                }} >Save Edits</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EditModel;
