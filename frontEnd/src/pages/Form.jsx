import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    date: '',
    location: '',
    type: '',
    performedBy: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/inspections', formData)
      .then(() => {
        alert('Inspection created successfully!');
        navigate('/dashboard'); // Redirect to the dashboard
      })
      .catch((error) => {
        console.error('Error creating inspection:', error);
        alert('Failed to create inspection.');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md py-4 px-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">New Inspection</h1>
      </header>

      <main className="container mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Select Type</option>
              <option value="CLASSROOM">Classroom</option>
              <option value="OFFICE">Office</option>
              <option value="SHOP">Shop</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="LABORATORY">Laboratory</option>
              <option value="CULINARY">Culinary</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="performedBy">Performed By</label>
            <input
              type="text"
              id="performedBy"
              name="performedBy"
              value={formData.performedBy}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
          >
            Create Inspection
          </button>
        </form>
      </main>
    </div>
  );
};

export default Form;
