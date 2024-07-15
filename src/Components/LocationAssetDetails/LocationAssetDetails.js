import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import monthlyData from './monthlyData.json';
import './LocationAssetDetails.css';

function LocationAssetDetails() {
  const navigate = useNavigate();

  const [countryName, setCountryName] = useState("India");
  const [year, setYear] = useState("2024");
  const [currentPage, setCurrentPage] = useState(0);
  const monthsPerPage = 3;

  const filteredData = monthlyData[countryName][year];
  const months = Object.keys(filteredData);
  const numPages = Math.ceil(months.length / monthsPerPage);
  const currentMonths = months.slice(currentPage * monthsPerPage, (currentPage + 1) * monthsPerPage);

  const laptopDetails = () => {
    navigate(`/main/location/${countryName}/laptopdetails`);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % numPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + numPages) % numPages);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [countryName, year]);

  return (
    <div>
      <div className="filter-container">
        <select value={countryName} onChange={(e) => setCountryName(e.target.value)}>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div className='primaryDashboard'>
        <div className="countryDetails">
          <span>Details for the selected Country</span>
        </div>
        <div className="dashboard">
          {currentMonths.map((month, index) => (
            <div className="month-box" key={index}>
              <h2>{month}</h2>
              <div className="data-table">
                <div className="table-header">
                  <span className='asset-row' style={{ marginRight: "50%" }}>Asset</span>
                  <span className='asset-count'>Count</span>
                </div>
                <div className="table-body">
                  {filteredData[month].map((item, idx) => (
                    <div className="table-row" key={idx} onClick={laptopDetails} style={{ cursor: 'pointer' }}>
                      <span>{item.name}</span>
                      <span>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="pagination">
            <button onClick={goToPrevPage} disabled={currentPage === 0}>Previous</button>
            <button onClick={goToNextPage} disabled={currentPage === numPages - 1}>Next</button>
          </div>
        </div>
      </div>
      <div className='footer'>
        © 2024 Wipro
      </div>
    </div>
  );
}

export default LocationAssetDetails;