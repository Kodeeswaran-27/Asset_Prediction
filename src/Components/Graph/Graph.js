import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import data from './data.json';
import './Graph.css'

const ChartComponent = () => {
    const [chartData, setChartData] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('India');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        updateChartData(selectedAssets, selectedLocation, selectedYear);
    }, [selectedAssets, selectedLocation, selectedYear]);

    useEffect(() => {
        // Find the latest year in your data
        const latestYear = data.reduce((maxYear, item) => {
            return item.yearOrPeriod > maxYear ? item.yearOrPeriod : maxYear;
        }, 0);
        setSelectedYear(latestYear.toString()); // Set the latest year as default
    }, []);

    const updateChartData = (selectedAssets, selectedLocation, selectedYear) => {
        let filteredData = data;

        if (selectedAssets.length > 0) {
            filteredData = filteredData.filter(item => selectedAssets.includes(item.nameOfAsset));
        }

        if (selectedLocation !== '') {
            filteredData = filteredData.filter(item => item.location === selectedLocation);
        }

        if (selectedYear !== '') {
            filteredData = filteredData.filter(item => item.yearOrPeriod === selectedYear);
        }

        // Create a template for all months
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const template = months.map(month => ({
            location: selectedLocation,
            month,
            ...selectedAssets.reduce((acc, asset) => ({ ...acc, [asset]: 0 }), {})
        }));

        // Group by location and month, and aggregate assets
        const groupedData = filteredData.reduce((acc, curr) => {
            const { month, nameOfAsset, numberOfAssetsRequired } = curr;
            const key = `${month}`;
            if (!acc[key]) {
                acc[key] = { month, [nameOfAsset]: numberOfAssetsRequired };
            } else {
                acc[key][nameOfAsset] = (acc[key][nameOfAsset] || 0) + numberOfAssetsRequired;
            }
            return acc;
        }, {});

        // Merge the template with the grouped data
        const mergedData = template.map(templateItem => {
            const key = templateItem.month;
            return groupedData[key] ? { ...templateItem, ...groupedData[key] } : templateItem;
        });

        setChartData(mergedData);
    };

    const assetOptions = [...new Set(data.map(item => item.nameOfAsset))].map(asset => ({
        value: asset,
        label: asset
    }));

    const locationOptions = [...new Set(data.map(item => item.location))].map(location => ({
        value: location,
        label: location
    }));

    const yearOptions = [...new Set(data.map(item => item.yearOrPeriod))].map(year => ({
        value: year.toString(),
        label: year.toString()
    }));

    const customColors = [
        "#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845","#0500FF", "#0000A5", "#000055", "#2D00FF", 
        "#000019", "#0000EB", "#00000F", "#6900FF", "#000087", "#000005","#0000FF", "#D700FF", "#00007D", "#00004B",
        "#4B00FF", "#FF009B", "#0000D7", "#2D00FF", "#FF00EB", "#000041", "#EB00FF", "#D700FF", "#8700FF", "#E100FF",
        "#A500FF", "#FF00D7", "#000023", "#00002D", "#AF00FF", "#000069", "#5F00FF", "#000091", "#FF0073", "#0000AF",
        "#B900FF", "#3700FF", "#9100FF", "#0000F5", "#FF005F", "#4B00FF", "#4100FF", "#CD00FF", "#0000B9", "#2300FF",
        "#0000CD", "#7D00FF", "#F500FF", "#9B00FF", "#EB00FF", "#B900FF", "#AF00FF", "#000091", "#000005", "#00007D",
        "#FF002D", "#C300FF", "#A500FF", "#00000F", "#5F00FF", "#6900FF", "#00004B", "#0000A5", "#0000AF", "#0000FF",
        "#FF00EB", "#D700FF", "#2D00FF", "#000037", "#000041", "#0000EB", "#FF0005", "#CD00FF", "#0000C3", "#000023",
        "#000055", "#FF0041", "#3700FF", "#000087", "#FF0037", "#0000B9", "#000073", "#4100FF", "#FF00D7", "#0000CD",
        "#8700FF", "#FF0091", "#7300FF", "#0000D7", "#E100FF", "#000069",
    ];

    return (
        <div>
            <h2>Assets Required</h2>
            <div className="filters" style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
                <Select
                    isMulti
                    name="assets"
                    options={assetOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select assets"
                    onChange={(selectedOptions) => setSelectedAssets(selectedOptions.map(option => option.value))}
                    style={{ flex: '1' }}
                />
                <Select
                    name="locations"
                    options={locationOptions}
                    className="basic-single-select"
                    classNamePrefix="select"
                    value={{ value: selectedLocation, label: selectedLocation }}
                    onChange={(selectedOption) => setSelectedLocation(selectedOption.value)}
                    placeholder="Select location"
                    style={{ flex: '1' }}
                />
                <Select
                    name="years"
                    options={yearOptions}
                    className="basic-single-select"
                    classNamePrefix="select"
                    placeholder="Select year"
                    value={yearOptions.find(option => option.value === selectedYear)}
                    onChange={(selectedOption) => setSelectedYear(selectedOption.value)}
                    style={{ flex: '1' }}
                />
            </div>
            <BarChart
                width={1200} // Increased width
                height={475}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {assetOptions.map((asset, index) => (
                    <Bar
                        key={index}
                        dataKey={asset.label}
                        stackId="a"
                        fill={customColors[index % customColors.length]}
                        barSize={10} // Reduced bar size
                    />
                ))}
            </BarChart>
        </div>
    );
}

export default ChartComponent;