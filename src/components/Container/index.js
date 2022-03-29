import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Automate from "../Automate"
import Dashboard from "../Dashboard"
import Navbar from "../Navbar";
import Schedule from "../Schedule";
import Index from "../Sidebar";
import AddSocial from "../AddSocial";
import { Context } from "../../context/context";
import Analytics from "../Analytics";

function Container(){
    let { twitterAddSuccess, redditAddSuccess } = useContext(Context);
    return (
        <>
        <Index/>
        <div className="main-content d-flex flex-column">
        <Navbar/>
        <Route exact path={"/"} component={Dashboard}/>
        <Route exact path={"/schedule"} component={Schedule}/>
        <Route exact path={"/automate"} component={Automate}/>
        <Route exact path={"/account"} component={AddSocial} />
        <Route exact path={"/analytics"} component={Analytics} />
        {twitterAddSuccess && <Redirect to="/account" />}
        {redditAddSuccess && <Redirect to="/account" />}
        </div>
        </>
    )
}

export default Container