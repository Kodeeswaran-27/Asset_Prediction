import React, { useState } from 'react';
import '../../App.css';
import Wipro from '../../Assets/Wipro.png';
import '../Navbar/Navbar.css';
import { useNavigate } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar({ userName, userRole }) {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="Navbar">
            <div className="leftSide">
                <a href="https://www.wipro.com/">
                    <img className="WiproLogo" alt="Wipro" src={Wipro} />
                </a>
            </div>
            <div className="divider"></div>
            <div className="middle">
                <a href="https://www.wipro.com/infrastructure/live-workspace/" className="liveWorkSpace">
                    Live WorkSpace<sup>TM</sup>
                </a>
            </div>
            <div className="rightSide" onClick={togglePopup}>
                {/* <AccountCircleIcon className="accountIcon" /> */}
                {showPopup && (
                    <div className="profilePopup">
                        <div className="popupContent">
                            <div className="userName">Hi, {userName}!</div>
                            <div className="Role">Role: {userRole}</div>
                            <button className="LogOut" onClick={handleLogout}>Sign out</button>
                        </div>
                    </div>
                )}
                <span className="username">{userName}</span>
            </div>
        </div>
    )
}
export default Navbar;