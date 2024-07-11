import React, { useState } from 'react';
import './Logs.css';

const Logs = () => {
  const allLogs = [
    { name: 'Sachin', date: '1/2/2024', file: '000184' },
    { name: 'Sourav', date: '2/2/2024', file: '000185' },
    { name: 'Kohli', date: '1/4/2024', file: '000186' },
    { name: 'Gambhir', date: '3/3/2024', file: '000187' },
    { name: 'Yuvraj', date: '3/3/2024', file: '000188' },
    { name: 'Dhoni', date: '4/5/2024', file: '000189' },
    { name: 'Zameer', date: '4/5/2024', file: '000190' },
    { name: 'Kumble', date: '4/5/2024', file: '000191' },
    { name: 'Harbhajan', date: '4/6/2024', file: '000192' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const logsPerPage = 7;

  const filteredLogs = allLogs.filter(log =>
    log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.date.includes(searchTerm) ||
    log.file.includes(searchTerm)
  );

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1); 
  };

  return (
    
    <div className="table-wrapper">
      <div className="logs-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search logs"
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button" onClick={handleSearchSubmit}>Filter</button>
        </div>
        <table className="logs-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Last Activity</th>
              <th>Uploaded File</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.name}</td>
                <td>{log.date}</td>
                <td>{log.file}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <div className="itemsNumber">
            Showing {indexOfFirstLog + 1} to {Math.min(indexOfLastLog, filteredLogs.length)} of {filteredLogs.length} items
          </div>
          <div className="pagination-buttons">
            <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      </div>
      <div className='footer'>
    © 2024 Wipro
    </div>
    </div>
   
  
  
  );
};

export default Logs;
