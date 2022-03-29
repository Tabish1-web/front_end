import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import { Context } from "../../context/context";
import Local from "../../utils/local";

function Register(){
    const { registerUser, setShow, getCurrentUser } = useContext(Context);
    const history = useHistory();
    let current_user = getCurrentUser;
    let current_token = Local.getToken();
    if (current_token && current_user) {
        history.push({pathname : "/"});
    }
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [checked, setChecked] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const handleRegister = async () => {
        const data = {username,email,password}
        let response = await registerUser(data);
        let errors = response?.data?.errors;
        if (errors){
            setError(errors);
            return;
        }
        return response;
    }

    return (
            <div className="register-area">
        <div className="d-table">
            <div className="d-table-cell">
                <div className="register-form">
                    <div className="logo">
                        <Link to={"/"} >
                            <img src="assets/img/logo.png" width={"60%"} alt="logo"/>
                        </Link>
                    </div>
                    <form>

                        <div className="form-group">
                            <input type="text" className={`form-control`} value={username}
                                placeholder="Name" onChange={(e) => setUsername(e.target.value)}/>
                                {error?.username && <small style={{"color":"red"}}>{error?.username}</small>}
                            <span className="label-title">
                                <i className='bx bx-user'></i>
                            </span>
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" name="email" value={email}
                                placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                                {error?.email && <small style={{"color":"red"}}>{error?.email}</small>}
                            <span className="label-title">
                                <i className='bx bx-envelope'></i>
                            </span>
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control" name="password" value={password} 
                                placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                {error?.password && <small style={{"color":"red"}}>{error?.password}</small>}
                            <span className="label-title">
                                <i className='bx bx-lock'></i>
                            </span>
                        </div>

                        <div className="form-group">
                            <div className="terms-conditions">
                                <label className="checkbox-box">I accept <Link to={"/terms"}>Terms and Conditions</Link>
                                    <input type="checkbox" onClick={(e)=>setChecked(e.target.checked)}/>
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>

                        {loadingButton ? 
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> : 
                            <button type="button" className="register-btn" disabled={!checked} onClick={async () => {
                            setLoadingButton(true);
                            let res = checked && await handleRegister();
                            setLoadingButton(false);
                            setShow(true);
                            res && history.push({
                                pathname : '/login',
                                state : {response : res}
                            });
                        }}>Sign Up</button>}
 
                        <p className="mb-0">Already have account? <Link to={"/login"}>Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Register