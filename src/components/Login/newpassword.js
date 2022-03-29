import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import useQuery from "../../hooks/query";
import Notification from "../../utils/notification";

function NewPassword(){
    const {setNewPassword} = useContext(Context); 
    const query = useQuery();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleNewPassword = async () => {
        if (password !== confirmPassword){
            setError({detail:"password does not match!"});
            return;
        }
        let uidb64 = query.get("uidb64");
        let token = query.get("token");
        let data = { uidb64, token, password };
        let response = await setNewPassword(data);
        let errors = response?.data;
        if (errors){
            setError(errors);
            return;
        }
        let message = response?.message
        Notification("reset", message, "success", 3000);
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
                    {error?.detail && <small style={{"color":"red"}}>{error?.detail}</small>}
                    {error?.password && <small style={{"color":"red"}}>{error?.password}</small>}
                    <form>
                        <div className="form-group">
                            <input type="password" className="form-control" value={password} 
                                placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            <span className="label-title">
                                <i className='bx bx-lock'></i>
                            </span>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" value={confirmPassword} 
                                placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <span className="label-title">
                                <i className='bx bx-lock'></i>
                            </span>
                        </div>
                        {loading ? <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span></div>  :
                        <button type="button" className="register-btn" onClick={async ()=>{
                            setLoading(true);
                            await handleNewPassword();
                            setLoading(false);
                        }}>Set Password</button>} 
                        <p className="mb-0">Back to <Link to={"login"}>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default NewPassword;