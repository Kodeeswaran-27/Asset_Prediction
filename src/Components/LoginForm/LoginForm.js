import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
// import {FaUser,FaLock} from "react-icons/fa";
import logo from '../../Assets/Frame.png'
import './LoginForm.css';

function LoginForm(){
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const navigate=useNavigate();

    const handleLogin=(event)=>{
        event.preventDefault();
        if(username==="Admin123" && password==="Admin@123"){
            navigate("/main/home");
        }
        else{
            alert("Invalid creds. Please try again");
        }
    };
    return(
        <div className="main">
            <div className="sub">
                <div className="header"><img src={logo} alt="Wipro Technologies Ltd"/></div>
                    <div className="login">
                        <form onSubmit={handleLogin}>
                            <p>Login</p>
                            <div className="input-box">
                                <label id="label">Employee ID:</label><br/>
                                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}placeholder="Username" required/>
                            </div>
                            <div className="input-box">
                                <label id="label">Password:</label><br/>
                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required/>
                            </div>
                                <div className="login-link">
                                    <a href="#">Forget password?</a>
                                    < a href="#">New? Create Account</a>
                                </div>
                            <button className="button" type="submit">Login</button>
                        </form>
                    </div>
                <div className="footer">&copy; 2024 Wipro</div>
            </div>
        </div>
    )
}
export default LoginForm;