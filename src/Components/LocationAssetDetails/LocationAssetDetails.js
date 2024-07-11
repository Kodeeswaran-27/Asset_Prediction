import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import monthlyData from './monthlyData.json'; 
import './LocationAssetDetails.css';
 
function LocationAssetDetails() {
  const { countryName } = useParams();
  const navigate = useNavigate();
   
  const months = Object.keys(monthlyData);
  const laptopDetails= () =>{
    navigate(`/main/location/${countryName}/laptopdetails`);
  } 
   
  return (
  
    <div>
    <div className='primaryDashboard'>
      <div className="countryDetails">
        <span>Details for the Country {countryName}</span>
      </div>
      <div className="dashboard">
        {months.map((month, index) => (
          <div className="month-box" key={index}>
            <h2>{month}</h2>
            <div className="data-table">
              <div className="table-header">
                <span>Column heading</span>
                <span>Count</span>
              </div>
              {monthlyData[month].map((item, idx) => (
                <div className="table-row" key={idx} onClick={laptopDetails} style={{cursor: 'pointer'}}>
                  <span>{item.name}</span>
                  <span>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
    <div className='footer'>
                © 2024 Wipro
                </div>
   </div>
    
   
  );
}
 
export default LocationAssetDetails;