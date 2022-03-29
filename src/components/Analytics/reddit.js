import React from "react";
import "./style.css";

function Reddit(props){
    const {data} = props;

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
            <div className="col-lg-6">
                <div className="card" style={{"maxHeight":"600px"}}>
                <div className="card-body">
                    <h4>{data?.title?.length > 45 ? `${data?.title.slice(0,45)}...` : data?.title}</h4>
                    <div className="media-body mb-2">
                        <div className="text-muted small"> {setDateTime(data?.post_time)}</div>
                    </div>
                    {!data?.media && <img className="ui-rect ui-bg-cover center" style={{"maxHeight":"200px"}}
                        src="assets/img/no-media.jpeg" alt="media" />}
                    {data?.media?.media_type === "image" && <img style={{"maxHeight":"200px"}} className="center ui-rect ui-bg-cover" 
                        width={"100%"}  src={createFullUrl(data?.media?.file)} alt="media" />}
                    {data?.media?.media_type === "video" && <video style={{"maxHeight":"194px"}} width={"100%"} 
                        controls src={createFullUrl(data?.media?.file)}></video>}
                </div>
                
                <div className="card-footer mt-2">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th className="d-inline-block text-muted ml-3">
                                    <small>Approved : </small> <strong>{data?.approved ? "Yes" : "No"}</strong>
                                </th>
                                <th className="d-inline-block text-muted ml-3">
                                    <small>Comments : </small><strong>{data?.comments_count}</strong>
                                </th>
                                <th className="d-inline-block text-muted ml-3">
                                    <small>Spoiler : </small><strong>{data?.spoiler ? "Yes" : "No"}</strong>
                                </th>
                            </tr>
                            <tr>
                                <th className="d-inline-block text-muted ml-3">
                                    <small>Upvote Ratio : </small><strong>{data?.upvote_ratio}</strong>
                                </th>
                                <th className="d-inline-block text-muted ml-3">
                                    <small>Score : </small><strong>{data?.score}</strong>
                                </th>
                                <th className="d-inline-block text-muted ml-3">
                                    <small>Received Awards : </small><strong>{data?.awards_received}</strong>
                                </th>
                            </tr>
                            <tr>
                                <th className="d-inline-block text-muted ml-3">
                                    <small>Views : </small><strong>{data?.view_count}</strong>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </>
    )
}

export default Reddit;