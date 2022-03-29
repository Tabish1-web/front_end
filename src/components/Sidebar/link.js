import React from "react";
import { Link } from "react-router-dom";

function Anchor(props){
    let {title, path, icon} = props
    return (
        <li className="nav-item">
            <Link to={path} className="nav-link">
                <span className="icon"><i className={icon}></i></span>
                <span className="menu-title">{title}</span>
            </Link>
        </li>
    )
}

export default Anchor;