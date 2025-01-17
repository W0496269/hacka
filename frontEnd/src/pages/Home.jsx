import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const [inspections, setInspections] = useState([]);
    const [chartData, setChartData] = useState(null);

    // Fetch inspections data
    useEffect(() => {
        axios.get('/api/inspections')
            .then(response => {
                console.log('API Response:', response.data); // Debug API response
                setInspections(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching inspections:', error);
                setInspections([]); // Handle error by setting an empty array
            });
    }, []);

    // Fetch data for the pie chart
    useEffect(() => {
        axios.get('/api/chart-data') // Replace this with your actual API endpoint
            .then(response => {
                const { value1, value2 } = response.data;
                setChartData({
                    labels: ['Value 1', 'Value 2'],
                    datasets: [
                        {
                            label: 'Chart Data',
                            data: [value1, value2],
                            backgroundColor: ['#FF6384', '#36A2EB'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                        },
                    ],
                });
            })
            .catch(error => {
                console.error('Error fetching chart data:', error);
            });
    }, []);

    return (
        <div>
            {Array.isArray(inspections) && inspections.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Type</th>
                            <th>Performed By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inspections.map((inspection) => (
                            <tr key={inspection.id}>
                                <td>{new Date(inspection.date).toLocaleDateString()}</td>
                                <td>{inspection.location}</td>
                                <td>{inspection.type}</td>
                                <td>{inspection.performedBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No inspections available.</p>
            )}

            {chartData ? (
                <div>
                    <h2>Pie Chart</h2>
                    <Pie data={chartData} />
                </div>
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default Home;
