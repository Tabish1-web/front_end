import React, {useContext, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import Local from "../../utils/local";
import { Context } from "../../context/context";

function Navbar(){
    const { logoutUser,
        checkRefreshTokenExpire,
        checkAccessTokenExpire,
        getCurrentUser 
    } = useContext(Context);
    let history = useHistory();
    let currentUser = getCurrentUser;
    let currentToken = Local.getToken();

    if (!currentToken && !currentUser){
        history.push({pathname : "/login"});
    }

    useEffect(()=>{
        checkRefreshTokenExpire(currentToken);
        checkAccessTokenExpire(currentToken);
    });

    async function logout() {
        currentToken = Local.getToken();
        let res = await logoutUser(currentToken?.refresh, currentToken?.access);
        if (res === 204){
            Local.logout();
            history.push({pathname : "/login"});
        }
    };
    return (
        <nav className="navbar top-navbar navbar-expand mb-5">
            <div className="collapse navbar-collapse" id="navbarSupportContent">
                <div className="responsive-burger-menu d-block d-lg-none">
                    <span className="top-bar"></span>
                    <span className="middle-bar"></span>
                    <span className="bottom-bar"></span>
                </div>
                <ul className="navbar-nav left-nav align-items-center"></ul>
                <form className="nav-search-form d-none ml-auto d-md-block"></form>
                <ul className="navbar-nav right-nav align-items-center">
                    <li className="nav-item">
                        <small className="nav-link bx-fullscreen-btn" id="fullscreen-button">
                            <i className="bx bx-fullscreen"></i>
                        </small>
                    </li>
                    <li className="nav-item dropdown profile-nav-item">
                        <Link to={"#"} className="nav-link dropdown-toggle" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <div className="menu-profile">
                                <span className="name">Hi! {currentUser?.username}</span>
                                <img src={currentUser?.profile_pic} className="rounded-circle" alt="profile"></img>
                            </div>
                        </Link>
                        <div className="dropdown-menu">
                            <div className="dropdown-header d-flex flex-column align-items-center">
                                <div className="figure mb-3">
                                    <img src={currentUser?.profile_pic} className="rounded-circle" alt="profile"></img>
                                </div>
                                <div className="info text-center">
                                    <span className="name">{currentUser?.username}</span>
                                    <p className="mb-3 email">{currentUser?.email}</p>
                                </div>
                            </div>
                            <div className="dropdown-footer">
                                <ul className="profile-nav">
                                    <li className="nav-item">
                                        <Link to={"#"} className="nav-link" onClick={logout}>
                                            <i className='bx bx-log-out'></i><span>Logout</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;