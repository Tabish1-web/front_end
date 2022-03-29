import React, {useEffect, useState, useContext} from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { Context } from "../../context/context";
import Local from "../../utils/local";
import Notification from "../../utils/notification";

function Login(){
    const { 
        googleOAuth, loginUser, show, getCurrentUser, setRefresh, refresh
    } = useContext(Context);
    const history = useHistory();

    let current_user = getCurrentUser;
    let current_token = Local.getToken();
    
    if (current_token && current_user){
        history.push({pathname : "/"});
    }
    const location = useLocation();
    const [emails, setEmails] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const successWithGoogle = async (res) => {
        let response = await googleOAuth(res);
        let errors = response?.data;
        if (errors){
            setError(errors);
            return;
        }
        let {tokens } = response;
        Local.setToken(tokens);
        setRefresh(!refresh);        
        history.push({pathname:"/"});
    }
    function failWithGoogle(res){
        Notification("Error", `${res.detail}`, "danger", 3000);
    }
    const handleLogin = async () => {
        const data = {email:emails, password};
        let response = await loginUser(data);
        let errors = response?.data;
        if (errors){
            setError(errors);
            return;
        }
        let {tokens} = response;
        if (remember) {
            Local.setToken(tokens);
        }else{
            Local.setToken(tokens, false);
        }
        setRefresh(!refresh); 
        history.push({pathname:"/"});
    }

    useEffect(() => {   
        let data = location?.state?.response?.data;
        show && data && Notification(`Hi! ${data.username}`,
            `You successfully signup with ${data.email}. Please verify your email`,
            "success",3000);
    }, [show, location]);

    return (
    <>
    <div className="login-area">
        <div className="d-table">
            <div className="d-table-cell">
                <div className="login-form">
                    <div className="logo">
                        <Link to={"/"}>
                            <img src="assets/img/logo.png" width={"60%"} alt="logo"/>
                        </Link>
                    </div>
                    {error?.detail && <small style={{"color":"red"}}>{error?.detail}</small>}
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" name="email"
                                placeholder="Email" onChange={(e) => setEmails(e?.target?.value)}/>
                                {error?.email && <small style={{"color":"red"}}>{error?.email}</small>}
                            <span className="label-title">
                                <i className='bx bx-user'></i>
                            </span>
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control" name="password"
                                placeholder="Password" onChange={(e) => setPassword(e?.target?.value)}/>
                                {error?.password && <small style={{"color":"red"}}>{error?.password}</small>}
                            <span className="label-title">
                                <i className='bx bx-lock'></i>
                            </span>
                        </div>

                        <div className="form-group">
                            <div className="remember-forgot">
                                <label className="checkbox-box">Remember me
                                    <input type="checkbox" onChange={(e)=>setRemember(e?.target?.checked)}/>
                                    <span className="checkmark"></span>
                                </label>

                                <Link to={"/reset"} className="forgot-password">Forgot password?</Link>
                            </div>
                        </div>
                        {loading ? <div className="spinner-border mb-4" role="status">
                                <span className="sr-only">Loading...</span>
                        </div> : <button type="button" className="login-btn mb-4" onClick={async () => {
                            setLoading(true);
                            await handleLogin();
                            setLoading(false);
                        }}>
                            Login</button>}
                            <div className="col-md-12 mb-2">
                                <GoogleLogin className="text-uppercase"
                                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                    buttonText="Sign in Google"
                                    onSuccess={successWithGoogle}
                                    onFailure={failWithGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        <p className="mb-0">Don’t have an account? <Link to={"register"}>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default Login;