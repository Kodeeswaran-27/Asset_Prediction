import React from 'react';
import {Link } from "react-router-dom";
import "./Sidebar.css";
import { FaHome,FaFileInvoice,FaUpload} from "react-icons/fa";

function Sidebar() {
  return (
      <nav>
        <ul className='SidebarList'>
          <li><Link to="/main/home" className='link'><FaHome size={20}/> &nbsp;Home</Link></li>
          {/* <li><Link to="/main/accounts">Account</Link></li> */}
          <li><Link to="/main/logs" className='link'><FaFileInvoice/>&nbsp;Logs</Link></li>
          <li><Link to="/main/fileupload" className='link'><FaUpload/>&nbsp;FileUpload</Link></li>
        </ul>
      </nav>
  )
}
export default Sidebar;