// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from '../../Assets/Frame.png';
// import './LoginForm.css';
// import Fileupload from '../FileUpload/FileUpload'
// import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
// import { loginRequest } from '../SSO/authConfig'
// import { callMsGraph } from '../SSO/graph'
// import  {SignInButton}  from "../SSO/SignInButton";


// function LoginForm() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const { instance, accounts } = useMsal();
//     const [graphData, setGraphData] = useState(null);
//     const navigate = useNavigate();
//     // function RequestProfileData() {
//     // Silently acquires an access token which is then attached to a request for MS Graph data
//     instance.acquireTokenSilent({
//         ...loginRequest,
//         account: accounts[0],
//     })
//         .then((response) => {
//             callMsGraph(response.accessToken).then((response) => setGraphData(response));
//         });
//     // }
//     const handleLogin = (event) => {
//         event.preventDefault();
//         if (username === "adarsh@wipro.com" && password === "admin@123") {
//             navigate("/main/home");
//         } else {
//             alert("Invalid creds. Please try again");
//         }
//     };

//     return (
//         <div className="main">
//             <div className="sub">
//                 <div className="header">
//                     <img src={logo} alt="Wipro Technologies Ltd" />
//                 </div>
//                 <div className="login">
//                     <div className="card">
//                         <AuthenticatedTemplate>
//                             <Fileupload />
//                         </AuthenticatedTemplate>

//                         <UnauthenticatedTemplate>
//                         <SignInButton/>
//                         </UnauthenticatedTemplate>
//                         {/* <form onSubmit={handleLogin}>
//                             <p>Login</p>
//                             <div className="input-box">
//                                 <label id="label">User ID:</label><br />
//                                 <input
//                                     type="text"
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                     placeholder="User name"
//                                     required
//                                 />
//                             </div>
//                             <div className="input-box">
//                                 <label id="label">Password:</label><br />
//                                 <input
//                                     type="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     placeholder="Password"
//                                     required
//                                 />
//                             </div>
//                             <div className="login-link">
//                                 <a href="#">Forget password?</a>
//                               <a href="#">New? Create Account</a>
//                             </div>
//                             <button className="button" type="submit">Submit</button>
//                         </form> */}
//                     </div>

//                 </div>
//                 <div className='footer'>
//                     <p>©2024 - Wipro | Privacy Policy</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LoginForm;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../Assets/Frame.png';
import './LoginForm.css';
import Fileupload from '../FileUpload/FileUpload';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../SSO/authConfig';
import { callMsGraph } from '../SSO/graph';
import { SignInButton } from "../SSO/SignInButton";

function LoginForm() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (accounts.length > 0) {
            instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
                .then((response) => {
                    callMsGraph(response.accessToken).then((response) => setGraphData(response));
                    navigate("/main/home"); // Redirect to the desired route after authentication
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [accounts, instance, navigate]);

    return (
        <div className="main">
            <div className="sub">
                <div className="header">
                    <img src={logo} alt="Wipro Technologies Ltd" />
                </div>
                <div className="login">
                <h3>Asset Management</h3>
                    <div className="card">
                        <AuthenticatedTemplate>
                            <Fileupload />
                        </AuthenticatedTemplate>

                        <UnauthenticatedTemplate>
                            <SignInButton />
                        </UnauthenticatedTemplate>
                    </div>
                </div>
                <div className='footer'>
                    <p>©2024 - Wipro | Privacy Policy</p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;