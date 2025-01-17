import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [inspections, setInspections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace '/api/inspections' with your actual API URL if needed
    axios
      .get('/api/inspections')
      .then((response) => {
        console.log('API Response:', response.data);
        // Ensure response is an array
        if (Array.isArray(response.data)) {
          setInspections(response.data);
        } else {
          setInspections([]);
          setError('Invalid API response format.');
        }
      })
      .catch((err) => {
        console.error('Error fetching inspections:', err);
        setError('Failed to fetch inspections.');
        setInspections([]); // Default to empty array
      });
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      {Array.isArray(inspections) && inspections.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Location</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Type</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Performed By</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((inspection) => (
              <tr key={inspection.id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {new Date(inspection.date).toLocaleDateString()}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {inspection.location}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {inspection.type}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {inspection.performedBy}
                </td>
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

export default Dashboard;
