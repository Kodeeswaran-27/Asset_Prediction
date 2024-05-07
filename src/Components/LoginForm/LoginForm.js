import React from "react";
// import {FaUser,FaLock} from "react-icons/fa";
import logo from 'D:/React/asset-prediction-app/src/Assets/Frame.png'
import './LoginForm.css';
function LoginForm(){
    return(
        <div className="main">
            <div className="header"><img src={logo}/></div>
            <div className="login">
                <form action="">
                    <p>Login</p>
                    <div className="input-box">
                        <label>Employee ID:</label>
                        <input type="text" placeholder="Username" required/>
                    </div>
                    <div className="input-box">
                        <label>Password:</label>
                        <input type="password" placeholder="Password" required/>
                    </div>
                        <div className="login-link">
                            <a href="#">Forget password?</a>
                            < a href="#">New? Create Account</a>
                        </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="footer">&copy; 2024 Wipro</div>
        </div>
    )
}
export default LoginForm;