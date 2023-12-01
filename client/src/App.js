import React, { useState, useEffect} from 'react';
import {OutTable,ExcelRenderer} from 'react-excel-renderer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import AnalysisForm from './analy';
import Papa from 'papaparse';
function App() {
  const [data, setData] = useState([]);
const [barChartData, setBarChartData] = useState([]);

const [filteredCols, setFilteredCols] = useState([]);
const [cityFilter, setCityFilter] = useState("");
const [startDateFilter, setStartDateFilter] = useState("");
const [endDateFilter, setEndDateFilter] = useState("");

const applyFilters = () => {
  const filteredData = cols.filter((row) => {
    const cityName = row[0]; // assuming city name is in the first column
    const date = row[3]; // assuming date is in the fourth column

    const cityMatch = cityFilter ? cityName.toLowerCase().includes(cityFilter.toLowerCase()) : true;
    const startDateMatch = startDateFilter ? date >= startDateFilter : true;
    const endDateMatch = endDateFilter ? date <= endDateFilter : true;

    return cityMatch && startDateMatch && endDateMatch;
  });

  setFilteredCols(filteredData);
  const chartData = filteredData.map((row) => ({
  date: row[3], // assuming date is in the fourth column
  temperature: parseInt(row[1], 10), // assuming temperature is in the second column
}));
  setBarChartData(chartData);
};
 

 

  const handleSubmit = (data) => {
    // Handle the form submission data here
    console.log('Form submitted with data:', data);
  };
  const [header , setHeader] = useState([]);
  const [cols , setCols] = useState([]);
  const handlefile =(event) =>{
    const file =event.target.files[0];
    
    ExcelRenderer(file,(err,response) => {
      if (err)
      {
        console.log(err);
      }
      else 
      {
         setHeader(response.rows[0])
         setCols(response.rows)
      }
  })
  }

  return (
    <div className="App">

      <div>
       <input type="file" onChange={handlefile} /> 
        <br/> 
        <table>
          <thead>
            <tr>
              {header.map((h,i)=>(
                <th key={i}>{h}</th>

              ))}
            </tr>
          </thead>
          <tbody>
            {cols.slice(1).map((col,i)=>(
              <tr key={i} >
              {
                col.map((c,i)=>(
                  <td key={i}  align='center'>{c}</td>
                ))
              }
            </tr>
            ))}
          </tbody>
        </table>

       
        
        </div>      
      <div>
        <h1>Weather Data Analyzer</h1>
      <div>
  <input
    type="text"
    placeholder="City"
    value={cityFilter}
    onChange={(e) => setCityFilter(e.target.value)}
  />
  <input
    type="text"
    placeholder="Start Date (YYYYMMDD)"
    value={startDateFilter}
    onChange={(e) => setStartDateFilter(e.target.value)}
  />
  <input
    type="text"
    placeholder="End Date (YYYYMMDD)"
    value={endDateFilter}
    onChange={(e) => setEndDateFilter(e.target.value)}
  />
  <button onClick={applyFilters}>Apply Filters</button>
</div>

      </div>

      <table>
        <tbody>
  {filteredCols.slice(1).map((col, i) => (
    <tr key={i}>
      {col.map((c, j) => (
        <td key={j} align="center">
          {c}
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>

        <div>
  <BarChart
    width={600}
    height={300}
    data={barChartData}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="temperature" fill="#8884d8" />
  </BarChart>
</div>
          </div>
  );
}

export default App;
