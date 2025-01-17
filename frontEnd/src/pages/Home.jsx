import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [inspections, setInspections] = useState([]);

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
        </div>
    );
};

export default Home;
