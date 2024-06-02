import React from 'react';
import './LaptopDetails.css';

function LaptopDetails() {
  const laptopData = [
    { name: 'Mac Book', versions: 'Versions', models: 'Make over Models', laptops: 46, year: 2024 },
    { name: 'Lenovo', versions: 'Versions', models: 'Make over Models', laptops: 13, year: 2024 },
    { name: 'HP', versions: 'Versions', models: 'Make over Models', laptops: 18, year: 2024 },
    { name: 'Dell', versions: 'Versions', models: 'Make over Models', laptops: 34, year: 2024 },
    { name: 'Asus', versions: 'Versions', models: 'Make over Models', laptops: 64, year: 2024 },
    { name: 'Acer', versions: 'Versions', models: 'Make over Models', laptops: 78, year: 2024 },
    { name: 'Samsung', versions: 'Versions', models: 'Make over Models', laptops: 30, year: 2024 },
    { name: 'LG', versions: 'Versions', models: 'Make over Models', laptops: 32, year: 2024 }
  ];
  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="table-header">
          <input type="text" placeholder="Search" className="search-box" />
          <button className="filter-button">Filters</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Laptop Name</th>
              <th>Versions</th>
              <th>Make over Models</th>
              <th>No. of Laptops</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {laptopData.map((laptop, index) => (
              <tr key={index}>
                <td>{laptop.name}</td>
                <td>{laptop.versions}</td>
                <td>{laptop.models}</td>
                <td>{laptop.laptops}</td>
                <td>{laptop.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>1 - 8 of 15 items</span>
          <div className="pagination-buttons">
            <button className="previous">Previous</button>
            <button className="next">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaptopDetails;