import React from 'react';
import '../../App.css';
import Wipro from '../../Assets/Wipro.png';
import '../Navbar/Navbar.css'


function Navbar() {
  return (
    <div className="Navbar">
        <div className="leftSide">
          <a href="https://www.wipro.com/">
          <img className = "WiproLogo" alt=""  src={Wipro}/>
          </a>
        </div>
        <div className="middle">
        <a href="https://www.wipro.com/infrastructure/-live-workspace/" className='liveWorkSpace'>
            Live WorkSpace
          </a>
        </div>
        <div className="rightSide">
        </div>
    </div>
  )
}
export default Navbar;