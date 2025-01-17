import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [inspections, setInspections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

export default Dashboard;
