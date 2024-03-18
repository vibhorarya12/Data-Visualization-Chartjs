import React, {  useState, useContext } from "react";
import { PolarArea } from "react-chartjs-2";
import { DataContext } from "../Components/Dashboard";

function PolarareaChart() {
  // Initialize state for the selected country
  const data = useContext(DataContext);
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");

  // Filter data based on the selected country
  const filteredData = data.filter((item) => item.country === selectedCountry && item.pestle !=="");

  // Extract unique pestle values from the filtered data
  const uniquePestles = Array.from(new Set(filteredData.map((item) => item.pestle).filter((pestle) => pestle !== "")));

  // Prepare chart data based on the filtered data
  const chartData = {
    labels: uniquePestles,
    datasets: [{
      label: selectedCountry,
      data: filteredData.map((item) => item.intensity),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
  };

  // Options for the chart
  const options = {
    
    plugins: {
      title: {
          display: true,
          text: "Country's Pestle-wise Intensity"
      }
  },

    scales: {
      x: {
        display: false,
        
      },
      y: {
        display: false,
        
      },
    },
    layout: {
      padding: {
          
          left:20,
          bottom :10
      },
  },
  };

  return (
    <>
      {/* Select input to choose the country */}
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="form-select"
        style={{width:'12vw', border:'1px solid blue' }}
        
      >
        {/* Map over unique country values and create options */}
        {Array.from(new Set(data.map((item) => item.country))).sort().map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      {/* Render the chart */}
      <PolarArea data={chartData} options={options} />
    </>
  );
}

export default PolarareaChart;
