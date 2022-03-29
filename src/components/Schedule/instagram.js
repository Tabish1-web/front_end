import React from "react";
import "./upload.css"

function InstagramForm(){
    return (
    <>
    <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <div className="ecommerce-stats-area">
  
                <div className="form-group mb-5">
                    <textarea className="form-control" rows={10} placeholder="Write a caption"></textarea>
                </div>
                <div className="form-group files mb-5">
                    <input type="file" className="form-control" multiple=""/>
                </div>
                <div className="form-group mb-5">
                    <input type={"text"} className="form-control" placeholder="Add a comment(optional)"/>
                </div>
                <div className="mt-5 text-center" style={{"paddingBottom":"20px"}}>
                    <button type="button" className="btn btn-outline-primary mr-5" >Post Now</button>
                    <button type="button" className="btn btn-primary">Schedule Later</button>
                </div>
            </div>
            </div>
        <div className="col-md-2"></div>
    </div>
    </>
    )
}

export default InstagramForm