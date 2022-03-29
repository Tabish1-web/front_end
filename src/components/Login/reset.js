import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import Notification from "../../utils/notification";

function PasswordReset(){
    const {passwordReset } = useContext(Context); 
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handlePasswordReset = async () => {
        let data = {email};
        let response = await passwordReset(data);
        let errors = response?.data;
        if (errors){
            setError(errors);
            return;
        }
        Notification("alert!", "reset password link is send", "info", 3000)
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
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" name="email" value={email}
                                placeholder="Email" onChange={(e)=>setEmail(e?.target?.value)}/>
                                {error?.email && <small style={{"color":"red"}}>{error?.email}</small>}
                            <span className="label-title">
                                <i className='bx bx-envelope'></i>
                            </span>
                        </div>
                        {loading ? <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span></div>  :
                        <button type="button" className="register-btn" onClick={async ()=>{
                            setLoading(true);
                            await handlePasswordReset();
                            setLoading(false);
                        }}>Send Email</button>} 
                        <p className="mb-0">Back to <Link to={"login"}>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default PasswordReset