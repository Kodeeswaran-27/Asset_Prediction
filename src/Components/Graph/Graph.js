import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import data from '../../sample.json'; // Import JSON data
import './Graph.css';

const Graph = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        let chartInstance = null;

        const fetchData = async () => {
            try {
                // Assuming data is an array of objects with "Unnamed: 0" and "Employee Forecast" properties
                // const labels = data.map(item => item["Unnamed: 0"]);
                const labels = data.map(item => new Date(item["Unnamed: 0"]).getFullYear());
                const employeeForecast = data.map(item => item["Employee Forecast"]);

                const ctx = chartRef.current.getContext('2d');
                if (!ctx) {
                    console.error("Failed to get canvas element");
                    return;
                }

                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Employee Forecast',
                            data: employeeForecast,
                            backgroundColor: 'white',
                            borderColor: 'black',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
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
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    return (
        <div className="parent">
            <canvas ref={chartRef} width="100vw" height="100vh"></canvas>
        </div>
    );
};

export default Graph;