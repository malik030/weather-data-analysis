import React, { useState } from 'react';

const AnalysisForm = ({ onSubmit }) => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ city, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city">City:</label>
      <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />

      <label htmlFor="startDate">Start Date:</label>
      <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <label htmlFor="endDate">End Date:</label>
      <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AnalysisForm;
