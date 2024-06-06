import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import data1 from '../../Data/data.json'; // Import JSON data
import data from '../../Data/Employee.json';
import './Graph.css';

const Graph = () => {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    useEffect(() => {
        let chartInstance1 = null;
        let chartInstance2 = null;
        const fetchData = async () => {
            try {
                // Assuming data is an array of objects with "Unnamed: 0" and "Employee Forecast" properties
                const labels1 = data.map(item => {
                    const date = new Date(item["Unnamed: 0"]);
                    const year = date.getFullYear();
                    const month = date.toLocaleString('default', { month: 'short' });
                    return `${month} ${year}`;
                });
                const labels2 = data1.map(item => `${item.Year}/${item.Month}`);
                const employeeForecast1 = data.map(item => item["Employee Forecast"]);
                const employees = data1.map(item => item["Number of Employees"])
                const noofWindows = data1.map(item => item["Total Windows Assets"])
                const noofMac = data1.map(item => item["Total MAC Assets"])
                const ctx1 = chartRef1.current.getContext('2d');
                const ctx2 = chartRef2.current.getContext('2d');

                if (!ctx1 || !ctx2) {
                    console.error("Failed to get canvas element");
                    return;
                }

                chartInstance1 = new Chart(ctx1, {
                    type: 'bar',
                    data: {
                        labels: labels1,
                        datasets: [{
                            label: 'Employee Forecast',
                            data: employeeForecast1,
                            backgroundColor: 'white',
                            borderColor: 'black',
                            borderWidth: 1
                        },]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                    }
                });
                chartInstance2 = new Chart(ctx2, {
                    type: 'line', // Adjust chart type as needed
                    data: {
                        labels: labels2,
                        datasets: [{
                            label: 'Number of Employees',
                            data: employees,
                            backgroundColor: 'white',
                            borderColor: 'red', // Adjust color as needed
                            borderWidth: 1
                        },
                        {
                            label: 'Total Windows Assets',
                            data: noofWindows,
                            backgroundColor: 'white',
                            borderColor: 'black',
                            borderWidth: 1
                        },
                        {
                            label: 'Total MAC Assets',
                            data: noofMac,
                            backgroundColor: 'white',
                            borderColor: 'black',
                            borderWidth: 1
                        },
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            zoom: {
                                zoom: {
                                    wheel: {
                                        enabled: true,
                                    },
                                    pinch: {
                                        enabled: true
                                    },
                                    mode: 'xy'
                                },
                                pan: {
                                    enabled: true,
                                    mode: 'xy'
                                }
                            }
                        }
                    }
                });

            } catch (error) {
                console.error("Failed to create chart:", error);
            }
        };
        fetchData();
        return () => {
            if (chartInstance1) {
                chartInstance1.destroy();
            }
            if (chartInstance2) {
                chartInstance2.destroy();
            }
        };
    }, []);

    return (
        <div className="graph">
            <div>
                <canvas ref={chartRef1}></canvas>
            </div>
            <div>
                <canvas ref={chartRef2}></canvas>
            </div>
        </div>
    );
};

export default Graph;