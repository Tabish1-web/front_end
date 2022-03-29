import React from "react";
import "./style.css";

function Twitter (props){
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
                    <h4>{data?.tweet?.length > 45 ? `${data?.tweet.slice(0,45)}...` : data?.tweet}</h4>
                    <div className="media-body mb-2">
                        <div className="text-muted small"> {setDateTime(data?.post_time)}</div>
                    </div>
                    {!data?.media && <img className="ui-rect ui-bg-cover center" width={"100%"} 
                        height={"100%"} src="assets/img/no-media.jpeg" alt="media" style={{"maxHeight":"200px"}}/>}
                    {data?.media?.media_type === "image" && <img className="ui-rect ui-bg-cover center" 
                        width={"100%"} style={{"maxHeight":"200px"}} src={createFullUrl(data?.media?.file)} alt="media" />}
                    {data?.media?.media_type === "video" && <video width={"100%"} style={{"maxHeight":"194px"}}
                        controls src={createFullUrl(data?.media?.file)}></video>}
                </div>
                
                <div className="card-footer mt-2">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th className="d-inline-block text-muted">
                                    <small>Favorites : </small> <strong>{data?.favorite_count}</strong>
                                </th>
                                <th className="d-inline-block text-muted">
                                    <small>Retweet : </small><strong>{data?.retweet_count}</strong>
                                </th>
                            </tr>
                            <tr>
                                <th className="d-inline-block text-muted">
                                    <small>Truncated : </small><strong>{data?.truncated ? "Yes" : "No"}</strong>
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

export default Twitter;