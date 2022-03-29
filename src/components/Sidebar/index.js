import React from "react";
import { Link } from "react-router-dom";

import Anchor from "./link";


function Index(){
    return (
    <div className="sidemenu-area">
        <div className="sidemenu-header">
            <Link to={"/"} className="navbar-brand d-flex align-items-center">
                <img src="assets/img/logo.png" width={"200px"} alt="logo"></img>
            </Link>
            <span></span>

            <div className="burger-menu d-none d-lg-block">
                <span className="top-bar"></span>
                <span className="middle-bar"></span>
                <span className="bottom-bar"></span>
            </div>

            <div className="responsive-burger-menu d-block d-lg-none">
                <span className="top-bar"></span>
                <span className="middle-bar"></span>
                <span className="bottom-bar"></span>
            </div>
        </div>
        <div className="sidemenu-body">
            <ul className="sidemenu-nav metisMenu h-100" id="sidemenu-nav" data-simplebar>
                <Anchor title="Dashboard" path="/" icon="bx bx-home-circle"/>
                <Anchor title="Schedule Posts" path="/schedule" icon="bx bx-calendar"/>
                <Anchor title="Automated DMs" path="/automate" icon="bx bxs-chat"/>
                <Anchor title="Analytics" path="/analytics" icon="bx bx-analyse"/>
                <Anchor title="Add Social Account" path="/account" icon="bx bx-add-to-queue"/>
            </ul>
        </div>
    </div>
    )
}

export default Index;